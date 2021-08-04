const config = {
  screens: {
    store: {
      path: 'store/:itemId/:storeName',
      parse: {
        itemId: id => id,
        storeName: name => name.replace(/[+]/g, ' '),
      },
    },
  },
};

const linking = {
  prefixes: ['demo://app'],
  config,
};

export default linking;
