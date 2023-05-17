const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
    const {
        resolver: { assetExts },
    } = await getDefaultConfig(__dirname);

    return {
        resolver: {
            assetExts: [...assetExts, 'db', 'ttf', 'png', 'jpg', 'car'],
        },
    };
})();