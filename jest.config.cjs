module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  transform: { "^.+\.js$": "babel-jest", ".*\.(vue)$": "@vue/vue3-jest" },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};