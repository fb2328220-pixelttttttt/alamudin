const fs = require('fs');
const path = require('path');

// 1. Disable eslint-webpack-plugin completely
const pluginPath = path.join(__dirname, 'node_modules', 'eslint-webpack-plugin', 'dist', 'index.js');
fs.writeFileSync(pluginPath,
  '// DISABLED BY PATCH\nmodule.exports = function() { return { apply: function() {} }; };\nmodule.exports.default = module.exports;\n'
);
console.log('eslint-webpack-plugin -> disabled');

// 2. Fix eslint-config-react-app/jest.js
const jestConfigPath = path.join(__dirname, 'node_modules', 'eslint-config-react-app', 'jest.js');
fs.writeFileSync(jestConfigPath, 'module.exports = {};\n');
console.log('eslint-config-react-app/jest.js -> patched');

// 3. Patch react-scripts webpack config to remove ESLint plugin usage
const webpackConfigPath = path.join(__dirname, 'node_modules', 'react-scripts', 'config', 'webpack.config.js');
let webpackContent = fs.readFileSync(webpackConfigPath, 'utf8');

// Remove ESLintPlugin instantiation from plugins array
if (webpackContent.includes('new ESLintPlugin(') && !webpackContent.includes('// ESLINT_DISABLED')) {
  webpackContent = webpackContent.replace(
    /new ESLintPlugin\(\{[\s\S]*?\}\),?/g,
    '/* ESLINT_DISABLED */'
  );
  fs.writeFileSync(webpackConfigPath, webpackContent);
  console.log('webpack.config.js ESLintPlugin -> removed');
} else {
  console.log('webpack.config.js -> already patched or pattern not found');
}

// 4. Clear cache
const cachePath = path.join(__dirname, 'node_modules', '.cache');
if (fs.existsSync(cachePath)) {
  fs.rmSync(cachePath, { recursive: true, force: true });
  console.log('.cache -> cleared');
}

console.log('\nDone! Now run: npm start');
