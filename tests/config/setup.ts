import supertest from "supertest";
import Server from "../../src/server";
import model from "../../src/database/models";

const server = new Server();

beforeAll(async () => {
  await model.sequelize.sync({ force: true, cascade: true });
});

afterAll(async () => {
  await model.sequelize.close();
});

export default supertest(server.app);
