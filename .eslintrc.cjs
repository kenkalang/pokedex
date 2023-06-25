module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    plugins: ['react', 'prettier', 'css'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'linebreak-style': 'off',
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'no-console': 'off',
        'no-trailing-spaces': 'error',
        'no-unused-vars': 'error',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
