module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/styles.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|svg|png)$': 'jest-transform-stub'
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: { '.+\\.(ts|tsx)$': 'ts-jest' },
  testEnvironment: 'jsdom',
  clearMocks: true
}
