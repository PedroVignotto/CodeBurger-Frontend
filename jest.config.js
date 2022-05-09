module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**',
    '<rootDir>/src/main/adapters/**',
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
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  transform: { '.+\\.(ts|tsx)$': 'ts-jest' },
  testEnvironment: 'jsdom',
  clearMocks: true
}
