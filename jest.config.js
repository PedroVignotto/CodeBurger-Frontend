module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**',
    '<rootDir>/src/main/adapters/**',
    '!<rootDir>/src/application/components/header/**',
    '!<rootDir>/src/application/components/footer/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/styles.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|svg|png|css)$': 'jest-transform-stub'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/cypress'
  ],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  transform: { '.+\\.(ts|tsx)$': 'ts-jest' },
  testEnvironment: 'jsdom',
  clearMocks: true
}
