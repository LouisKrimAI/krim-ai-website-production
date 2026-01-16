module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint","jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-case-declarations": "off",
    "no-useless-escape": "off",
    "prefer-spread": "off",
    "no-extra-semi": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",

    // Mobile responsiveness regression prevention
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value='text-right'], Literal[value='text-end'], Literal[value='justify-end']",
        "message": "Avoid right/end text alignment without explicit mobile considerations. Use intentional classes like text-center or ensure mobile-specific handling."
      },
      {
        "selector": "Literal[value*='direction: ltr !important']",
        "message": "Global direction overrides can break text alignment. Use surgical fixes with specific selectors."
      },
      {
        "selector": "Literal[value*='text-align: initial !important']",
        "message": "Global text-align overrides can break intentional alignment. Use specific selectors for mobile fixes."
      },
      {
        "selector": "TemplateLiteral[quasis.0.value.raw*='rounded-full'][quasis.0.value.raw*='px-']",
        "message": "Use Button component with shape='standard' instead of hardcoding rounded-full with custom padding"
      }
    ]
  },
  ignorePatterns: ["dist","build",".next",".turbo","node_modules","artifacts",".lighthouse","playwright-report","test-results","api/**","*.js","tests/**","*.spec.ts","*.spec.js","debug-*.cjs","test-*.js","huly-*.js","runtime-error-*.cjs","*.config.ts","mcps/**"],
  overrides: [
    {
      files: ['scripts/**/*.cjs', '*.cjs'],
      env: { node: true }
    }
  ]
};