/**
 * Jest Configuration
 * 单元测试配置
 */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/vendor/**', '!**/public/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  verbose: true,
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true,
  // 监视文件变化
  watchPathIgnorePatterns: ['node_modules', '\\.git', 'public']
};
