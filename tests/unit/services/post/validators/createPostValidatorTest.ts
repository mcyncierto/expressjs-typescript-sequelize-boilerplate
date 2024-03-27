import {
  validationResult,
  ValidationChain,
  ValidationError,
  Result,
} from "express-validator";
import CreatePostValidator from "../../../../../src/helpers/validators/post/createPostValidator";
import model from "../../../../../src/database/models";

const { Post } = model;
jest.mock("../../../../../src/database/models", () => ({
  Post: {
    create: jest.fn(),
  },
}));

describe("create post validator", () => {
  it("should pass if all fields are valid", async () => {
    // Arrange
    const requestBody: object = {
      body: {
        title: "Lorem Ipsum",
        content: "Lorem Ipsum Dolor",
      },
    };

    // Act
    const validationRules: ValidationChain[] =
      CreatePostValidator.getValidationRules();
    await Promise.all(validationRules.map((rule) => rule.run(requestBody))); // maps over the validationRules array and applies the run() method of each rule to the requestBody object.
    const errors: Result<ValidationError> = validationResult(requestBody);

    // Assert
    expect(errors.isEmpty()).toBe(true);
  });

  it("should return errors if required fields are empty or invalid", async () => {
    // Arrange
    const requestBody: object = {
      body: {
        title: "",
        content: "Lorem Ipsum Dolor",
      },
    };

    // Act
    const validationRules: ValidationChain[] =
      CreatePostValidator.getValidationRules();
    await Promise.all(validationRules.map((rule) => rule.run(requestBody))); // maps over the validationRules array and applies the run() method of each rule to the requestBody object.
    const errors: Result<ValidationError> = validationResult(requestBody);

    // Assert
    const expectedErrors: object[] = [
      {
        type: "field",
        value: "",
        msg: "Title is required",
        path: "title",
        location: "body",
      },
    ];
    expect(errors.isEmpty()).toBe(false);
    expect(new Set(expectedErrors)).toEqual(new Set(errors.array()));
  });

  it("should return an error if title has more than 250 characters", async () => {
    // Arrange
    const requestBody: object = {
      body: {
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        content: "Lorem Ipsum Dolor",
      },
    };

    // Act
    const validationRules: ValidationChain[] =
      CreatePostValidator.getValidationRules();
    await Promise.all(validationRules.map((rule) => rule.run(requestBody))); // maps over the validationRules array and applies the run() method of each rule to the requestBody object.
    const errors: Result<ValidationError> = validationResult(requestBody);

    // Assert
    const expectedErrors: object[] = [
      {
        type: "field",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        msg: "Title exceeds the maximum character limit of 250",
        path: "title",
        location: "body",
      },
    ];
    expect(errors.isEmpty()).toBe(false);
    expect(new Set(expectedErrors)).toEqual(new Set(errors.array()));
  });
});
