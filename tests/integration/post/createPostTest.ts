import request from "supertest";
import Server from "../../../src/server";
import model from "../../../src/database/models";
import { PostRepository } from "../../../src/repositories/postRepository";

const apiServer = new Server();
const app = apiServer.app;
const { Post } = model;
const postRepository = new PostRepository(Post);

beforeAll(async () => {});

describe("POST /posts", () => {
  it("should create a post", async () => {
    // Arrange
    const requestBody = {
      title: "Lorem Ipsum",
      content: "Lorem Ipsum Dolor",
    };

    // Act
    const response = await request(app).post("/api/v1/posts").send(requestBody);

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
    const response = await request(app).post("/api/v1/posts").send(requestBody);

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
});
