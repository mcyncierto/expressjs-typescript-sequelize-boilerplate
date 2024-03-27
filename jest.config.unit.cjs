module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  testMatch: ["<rootDir>/tests/unit/**/*.ts"]
};