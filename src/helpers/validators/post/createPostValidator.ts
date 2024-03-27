import { body } from "express-validator";

class CreatePostValidator {
  static getValidationRules() {
    return [
      body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 250 })
        .withMessage("Title exceeds the maximum character limit of 250"),
    ];
  }
}

export default CreatePostValidator;
