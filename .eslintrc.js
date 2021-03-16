module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
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
        'import/named': 0,
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
