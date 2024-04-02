import request from "supertest";
import Server from "../../../src/server";
import model from "../../../src/database/models";
import { PostRepository } from "../../../src/repositories/postRepository";
import { AuthType } from "../../helpers/types/authType";
import { UserType } from "../../../src/helpers/types/userType";
import { login } from "../../helpers/utils/authUtil";
import { createUser } from "../../factory";

const apiServer = new Server();
const app = apiServer.app;
const { Post } = model;
const postRepository = new PostRepository(Post);

let auth: AuthType;
let user1: UserType;

beforeAll(async () => {
  const role = { name: "test-role" };
  auth = await login(app, {}, role);
  user1 = await createUser({
    username: "User1",
    employeeId: "User1",
    fullName: "User1",
  });
});

describe("POST /posts", () => {
  it("should create a post", async () => {
    // Arrange
    const requestBody = {
      title: "Lorem Ipsum",
      content: "Lorem Ipsum Dolor",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/posts")
      .send(requestBody)
      .set("Authorization", `Bearer ${auth.token}`);

    // Assert
    const createdPost = await postRepository.findById(response.body.data.id);

    expect(response.status).toBe(201);
    expect(createdPost.id).toBe(response.body.data.id);
    expect(createdPost.title).toBe(requestBody.title);
    expect(createdPost.content).toBe(requestBody.content);
  });

  it("should return errors if required fields are empty or invalid", async () => {
    // Arrange
    const requestBody = {
      title: "  ",
      content: "",
    };

    // Act
    const response = await request(app)
      .post("/api/v1/posts")
      .send(requestBody)
      .set("Authorization", `Bearer ${auth.token}`);

    // Assert
    const expectedErrors = [
      {
        location: "body",
        msg: "Title is required",
        path: "title",
        type: "field",
        value: "",
      },
    ];

    expect(response.status).toBe(400);
    expect(new Set(expectedErrors)).toEqual(new Set(response.body.errors));
  });

  it("should return error if unauthenticated", async () => {
    // Arrange
    const requestBody = {
      title: "Lorem Ipsum",
      content: "Lorem Ipsum Dolor",
    };

    // Act
    const response = await request(app).post("/api/v1/posts").send(requestBody);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthenticated");
  });
});
