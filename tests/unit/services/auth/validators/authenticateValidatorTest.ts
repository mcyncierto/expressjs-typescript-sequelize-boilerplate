import {
  validationResult,
  ValidationChain,
  ValidationError,
  Result,
} from "express-validator";
import AuthenticateValidator from "../../../../../src/helpers/validators/auth/authenticateValidator";

describe("authenticate validator", () => {
  it("should pass if all fields are valid", async () => {
    // Arrange
    const requestBody: object = {
      body: {
        username: "test-user",
        password: "test-password",
      },
    };

    // Act
    const validationRules: ValidationChain[] =
      AuthenticateValidator.getValidationRules();
    await Promise.all(validationRules.map((rule) => rule.run(requestBody))); // maps over the validationRules array and applies the run() method of each rule to the requestBody object.
    const errors: Result<ValidationError> = validationResult(requestBody);

    // Assert
    expect(errors.isEmpty()).toBe(true);
  });

  it("should return errors if required fields are empty or invalid", async () => {
    // Arrange
    const requestBody: object = {
      body: {
        username: " ",
        password: "",
      },
    };

    // Act
    const validationRules: ValidationChain[] =
      AuthenticateValidator.getValidationRules();
    await Promise.all(validationRules.map((rule) => rule.run(requestBody))); // maps over the validationRules array and applies the run() method of each rule to the requestBody object.
    const errors: Result<ValidationError> = validationResult(requestBody);

    // Assert
    const expectedErrors: object[] = [
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
    expect(errors.isEmpty()).toBe(false);
    expect(new Set(expectedErrors)).toEqual(new Set(errors.array()));
  });
});
