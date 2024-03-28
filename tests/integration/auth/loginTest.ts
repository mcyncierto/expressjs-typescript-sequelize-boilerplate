import request from "supertest";
import Server from "../../../src/server";
import model from "../../../src/database/models";
import { UserRepository } from "../../../src/repositories/userRepository";
import { createUser } from "../../factory";
import jwt from "jsonwebtoken";

const apiServer = new Server();
const app = apiServer.app;
const { User } = model;
const userRepository = new UserRepository(User);

describe("POST /aut/login", () => {
  it("should login using username and password", async () => {
    // Arrange
    const user = await createUser({
      username: "test-user",
      password: "test-password",
      fullName: "Test User",
    });

    const requestBody = {
      username: "test-user",
      password: "test-password",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(requestBody);

    // Assert
    expect(response.status).toBe(200);

    // Assert token expiration duration
    // Convert Unix timestamps to JavaScript Date objects
    const date1: any = new Date(response.body.issuedAt * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const date2: any = new Date(response.body.expiresAt * 1000);

    // Calculate the time difference in milliseconds
    const timeDifferenceInMilliseconds = date2 - date1;

    // Convert the time difference to hours
    const timeDifferenceInHours =
      timeDifferenceInMilliseconds / (1000 * 60 * 60);
    expect(timeDifferenceInHours).toBe(12);

    // Assert values of decoded token
    const decodedToken: any = jwt.decode(response.body.token);
    expect(decodedToken.id).toBe(user.id);
    expect(decodedToken.username).toBe(user.username);
    expect(decodedToken.employeeId).toBe(user.employeeId);
    expect(decodedToken.fullName).toBe(user.fullName);
  });

  it("should return unauthorized error if username or password is incorrect", async () => {
    // Arrange
    const requestBody = {
      username: "invalid-user",
      password: "invalid-password",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(requestBody);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.status).toEqual(401);
    expect(response.body.message).toEqual("Invalid username or password");
  });

  it("should return errors if required fields are empty or invalid", async () => {
    // Arrange
    const requestBody = {
      username: " ",
      password: "",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(requestBody);

    // Assert
    const expectedErrors = [
      {
        type: "field",
        value: "",
        msg: "Username is required",
        path: "username",
        location: "body",
      },
      {
        type: "field",
        value: "",
        msg: "Password is required",
        path: "password",
        location: "body",
      },
    ];

    expect(response.status).toBe(400);
    expect(new Set(expectedErrors)).toEqual(new Set(response.body.errors));
  });
});
