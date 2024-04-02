import { RoleType } from "../../../src/helpers/types/roleType";

export type AuthType = {
  user: {
    id: string;
    username: string;
    fullName: string;
  };
  token: string;
  role: RoleType;
};
