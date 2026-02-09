export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
