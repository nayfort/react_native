//const { getDefaultConfig } = require('@expo/metro-config');
//
//module.exports = (async () => {
//    const {
//        resolver: { assetExts },
//    } = await getDefaultConfig(__dirname);
//
//    return {
//        resolver: {
//            assetExts: [...assetExts, 'db', 'ttf', 'png', 'jpg', 'car'],
//        },
//    };
//})();

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: [...defaultConfig.resolver.assetExts, 'db', 'mp3', 'ttf', 'obj', 'png', 'jpg'],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };
})();