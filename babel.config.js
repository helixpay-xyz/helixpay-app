module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    [
      "module-resolver",
      {
        "root": [
          "./app"
        ],
        "extensions": [
          ".js",
          ".ios.js",
          ".android.js"
        ],
        "alias": {
          "app": "./app",
          "abilities": "./app/abilities",
          "assets": "./app/assets",
          "caches": "./app/caches",
          "commons": "./app/commons",
          "components": "./app/components",
          "configs": "./app/configs",
          "constants": "./app/constants",
          "controls": "./app/controls",
          "databases": "./app/databases",
          "globals": "./app/globals",
          "handlers": "./app/handlers",
          "helpers": "./app/helpers",
          "hooks": "./app/hooks",
          "modules": "./app/modules",
          "requests": "./app/requests",
          "screens": "./app/screens",
          "services": "./app/services",
          "stores": "./app/stores",
          "utils": "./app/utils"
        }
      }
    ],
    'react-native-reanimated/plugin'
  ],
  env: {
    "production": {
      "plugins": [
        "transform-remove-console"
      ]
    }
  }
};
