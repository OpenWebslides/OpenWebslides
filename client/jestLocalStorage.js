/**
 * Allows Jest to emulate a localStorage so that we can test functions interacting with it.
 * @type {{getItem, setItem, clear, removeItem}}
 */
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
