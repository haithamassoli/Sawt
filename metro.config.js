// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("cjs");

config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_conditionNames = ["browser"];

// config.resolver.unstable_conditionNames = ["require", "default", "browser"];

module.exports = config;
