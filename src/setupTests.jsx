// src/setupTests.js
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

// ✅ Set up Enzyme for React 18
Enzyme.configure({ adapter: new Adapter() });

// ✅ Polyfill TextEncoder / TextDecoder for Node
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ✅ Mock localStorage for tests
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};
