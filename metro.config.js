const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// module.exports = (async () => {
//     const defaultConfig = await getDefaultConfig();
//     defaultConfig.resolver.extraNodeModules = {
//         ...defaultConfig.resolver.extraNodeModules,
//         crypto: require.resolve('react-native-crypto'),
//     };
//     return defaultConfig;
// })();
//
// module.exports = (async () => {
//     const defaultConfig = await getDefaultConfig();
//     return {
//         ...defaultConfig,
//         resolver: {
//             ...defaultConfig.resolver,
//             extraNodeModules: {
//                 stream: require.resolve("stream-browserify"),
//             },
//         },
//     };
// })();

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
