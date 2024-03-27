module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  testEnvironment: "<rootDir>/tests/config/integrationTestEnvironment.ts",
  testMatch: ["<rootDir>/tests/integration/**/*.ts"],
  // testMatch: [
  // "<rootDir>/tests/integration/absenteeRecord/listWithoutCertificateReceived.ts",
  // ],
  setupFilesAfterEnv: ["<rootDir>/tests/config/setup.ts"],
  testPathIgnorePatterns: [],
  workerIdleMemoryLimit: "1028MB",
};
