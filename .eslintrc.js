module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    /**
     * Linting with Type
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
     *
     * For monorepo
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/MONOREPO.md
     */
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    // -- https://github.com/benmosher/eslint-plugin-import/issues/1558#issuecomment-563222416
    // should enable the "import/extensions": ["error", "ignorePackages"] at settings
    // -- eslint-plugin-react - https://github.com/yannickcr/eslint-plugin-react
    "react/prop-types": [0],
    "react/react-in-jsx-scope": [0],
    "react/jsx-props-no-spreading": [0],
    // -- @typescript-eslint - https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        ignoreParameters: true,
        ignoreProperties: true
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      {
        allowArgumentsExplicitlyTypedAsAny: true
      }
    ],
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true
      }
    ]
  }
};
