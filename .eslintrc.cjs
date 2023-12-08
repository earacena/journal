const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        require.resolve('@vercel/style-guide/eslint/browser'),
        require.resolve('@vercel/style-guide/eslint/typescript'),
        require.resolve('@vercel/style-guide/eslint/react'),
        // "standard-with-typescript",
        // "plugin:react/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        project,
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    },
    "settings": {
      'import/resolver': {
        typescript: {
          project,
        }
      },
      "import/no-extraneous-dependencies": ["error", { "optionalDependencies": false }]
    }
}
