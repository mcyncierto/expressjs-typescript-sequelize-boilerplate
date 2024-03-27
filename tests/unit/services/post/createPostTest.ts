import { PostService } from "../../../../src/services/postService";
import model from "../../../../src/database/models";

const { Post } = model;

jest.mock("../../../../src/database/models", () => ({
  Post: {
    create: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("PostService", () => {
  describe("create", () => {
    it("should create a post", async () => {
      // Arrange
      const mockPost: object = {
        title: "Lorem Ipsum",
        content: "Lorem Ipsum Dolor",
      };

      jest.spyOn(Post, "create").mockResolvedValue(mockPost);

      const mockAttributes: object = {
        body: {
          title: "Lorem Ipsum",
          content: "Lorem Ipsum Dolor",
        },
      };

      // Act
      const result = await PostService.create(mockAttributes);

      // Assert
      expect(result).toEqual(mockPost);
      expect(Post.create).toHaveBeenCalledWith(mockPost, {});
    });
  });
});
