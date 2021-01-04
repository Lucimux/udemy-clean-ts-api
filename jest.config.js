module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
