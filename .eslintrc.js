/**
 * ESLint Configuration
 * 研发代码质量检查规范
 *
 * 适用目录：根目录 JS 文件（不含 Hugo 生成的 public/、layouts/）
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 排除 Hugo 生成的目录、外部 skills 和旧版 JS
  ignorePatterns: [
    'public/',
    'layouts/',
    'static/',
    'node_modules/',
    'skills/',
    'assets/js/',
    'projects/aitoolreviewr/public/',
    '**/*.min.js'
  ],
  rules: {
    // 禁止 console
    'no-console': 'off',
    // 禁止 debugger
    'no-debugger': 'warn',
    // 强制使用 ===
    eqeqeq: ['error', 'always'],
    // 强制使用 const
    'prefer-const': 'error',
    // 禁止未使用的变量
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 强制缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 强制单引号
    quotes: ['error', 'single', { avoidEscape: true }],
    // 强制分号
    semi: ['error', 'always'],
    // 强制一空行
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    // 禁止行尾空格
    'no-trailing-spaces': 'error',
    // 禁止 with
    'no-with': 'error'
  },
  overrides: [
    {
      // Jest 测试文件
      files: ['__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off'
      }
    }
  ]
};
