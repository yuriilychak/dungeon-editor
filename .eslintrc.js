module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "settings": {
        "react": {
            "version": "latest"
        }
    },
    "rules": {
        "arrow-parens": ["error", "as-needed"],
        "class-methods-use-this": "off",
        "comma-dangle": ["error", "never"],
        "func-names": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-named-as-default": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "indent": ["error", 4],
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/mouse-events-have-key-events": "off",
        "jsx-a11y/anchor-has-content": "error",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/no-noninteractive-tabindex": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "linebreak-style": "off",
        "max-len": ["error", { "code": 128, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreTemplateLiterals": true }],
        "no-alert": "error",
        "no-console": ["warn", { "allow": ["warn", "error"]}],
        "no-constant-condition": "error",
        "no-else-return": ["error", { "allowElseIf": true }],
        "no-func-assign": "off",
        "no-irregular-whitespace": "error",
        "no-loop-func": "off",
        "no-nested-ternary": "off",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-param-reassign": ["error", { "props": false }],
        "no-shadow": ["error", { "hoist": "functions" }],
        "no-trailing-spaces": "error",
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "prefer-arrow-callback": "off",
        "prefer-destructuring": "off",
        "prefer-promise-reject-errors": "warn",
        "react/button-has-type": "off",
        "react/destructuring-assignment": ["off", "always"],
        "react/forbid-prop-types": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-no-bind": "error",
        "react/jsx-one-expression-per-line": "off",
        "react/no-array-index-key": "error",
        "react/no-danger": "error",
        "react/no-unused-prop-types": "off",
        "react/no-unused-state": "warn",
        "react/prefer-stateless-function": [ "error", { "ignorePureComponents": true }],
        "react/prop-types": "error",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/sort-comp": ["error", { "order": ["static-variables", "everything-else" ] }],
        "space-before-function-paren": "off",
        "global-require": "off",
        "no-template-curly-in-string": "error",
        "react/jsx-fragments": ["off", "syntax"],
        "object-curly-spacing": ["error", "always"],
        "semi": ["error", "always"],
        "no-unreachable": "error",
        "react-hooks/rules-of-hooks": "error"
    }
};
