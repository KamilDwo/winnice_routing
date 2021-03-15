module.exports = {
    env: {
        browser: true,
        es6: true,
        mocha: true,
    },
    extends: [
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'import',
        'react',
    ],
    rules: {
        // ERROR LEVELS from https://eslint.org/docs/user-guide/configuring#configuring-rules
        // "off" or 0
        // "warn" or 1
        // "error" or 2
        'template-curly-spacing': 'off',
        'arrow-parens': [2, 'as-needed'],
        'linebreak-style': 0,
        semi: [2, 'always'],
        'object-curly-newline': ['error', {
            ObjectExpression: 'always',
            ObjectPattern: {
                multiline: true,
            },
            ImportDeclaration: {
                multiline: true, minProperties: 2,
            },
            ExportDeclaration: {
                multiline: true, minProperties: 3,
            },
        }],
        indent: [1, 4, {
            SwitchCase: 1,
            ignoredNodes: ['TemplateLiteral'],
        }],
        'no-multiple-empty-lines': [2, {
            max: 2,
        }],
        'react/prop-types': 0,
        'react/sort-prop-types': 0,
        'max-len': 0,
        'no-case-declarations': 0,
        'no-unused-expressions': 'off',
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'only-multiline',
        }],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        radix: [1, 'as-needed'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, {
            extensions: ['.js', '.jsx'],
        }],
        'import/named': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-props-no-spreading': [0],
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/order': [2, {
            groups: [
                ['builtin', 'external'],
                'internal',
                ['parent', 'sibling', 'index'],
            ],
            'newlines-between': 'always',
        }],
        'import/newline-after-import': [2, {
            count: 2,
        }],
        'react/forbid-prop-types': 0,
        'no-plusplus': ['error', {
            allowForLoopAfterthoughts: true,
        }],
        curly: ['error', 'all'],
        'brace-style': ['error', 'stroustrup', {
            allowSingleLine: false,
        }],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: [
                    'src',
                ],
            },
        },
    },
};
