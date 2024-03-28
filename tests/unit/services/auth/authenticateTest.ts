const mockDecodedToken = {
  id: "27f477b6-b845-45cb-a9aa-c0fd1921a126",
  username: "test-user",
  fullName: "Test User",
  createdBy: null,
  lastUpdatedBy: null,
  createdAt: "2023-09-29T03:05:23.000Z",
  updatedAt: "2023-09-29T05:56:57.000Z",
  deletedAt: null,
  iat: 1696217638,
  exp: 1696260838,
};
const mockToken = "mock-token";

import { AuthService } from "../../../../src/services/authService";
import model from "../../../../src/database/models";
import bcrpyt from "bcrypt";

const { User } = model;

jest.mock("../../../../src/database/models", () => ({
  User: {
    findOne: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"), // import and retain the original functionalities
  sign: jest.fn().mockReturnValue(mockToken),
  decode: jest.fn().mockReturnValue(mockDecodedToken),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("AuthService", () => {
  describe("authenticate", () => {
    it("should authenticate with username and password", async () => {
      // Arrange
      let mockUser = {
        id: "27f477b6-b845-45cb-a9aa-c0fd1921a126",
        username: "test-user",
        password: bcrpyt.hashSync("password", 10),
        fullName: "Test User",
        role: [
          {
            id: "27f477b6-b845-45cb-a9aa-c0fd1921a127",
            name: "super-admin",
            label: "Super Administrator",
            permissions: [
              {
                id: "bd8b7c1a-c4be-4560-b83d-1fc30817a6b6",
                resource: "all",
                action: "all:any",
                name: "all.all:any",
              },
            ],
          },
        ],
        createdBy: null,
        lastUpdatedBy: null,
        dataValues: {},
      };

      mockUser.dataValues = mockUser;
      jest.spyOn(User, "findOne").mockResolvedValue(mockUser);

      // Act
      const result = await AuthService.authenticate("test-user", "password");

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({
        attributes: {},
        include: {
          as: "role",
          include: {
            as: "permissions",
            model: undefined,
            through: {
              attributes: [],
            },
          },
          model: undefined,
        },
        where: { username: "test-user" },
      });
      expect(result).toEqual({
        issuedAt: mockDecodedToken.iat,
        expiresAt: mockDecodedToken.exp,
        token: mockToken,
      });
    });
  });
});
