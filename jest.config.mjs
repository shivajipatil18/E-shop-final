// jest.config.mjs
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^react-toastify/dist/ReactToastify.css$': '<rootDir>/__mocks__/styleMock.js',
  
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.jsx'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};
