module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/web-client', '<rootDir>/dist'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
