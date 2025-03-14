/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig  } */
const config = {
  printWidth: 80,
  // tabWidth: 4,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)',
    '<BUILT_IN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^[.|..|@]',
    '^@/',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSortSpecifiers: true,
};

export default config;
