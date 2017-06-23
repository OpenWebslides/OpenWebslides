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
