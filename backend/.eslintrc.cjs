module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': [
      'error',
      {
        // グローバルorローカルのどの範囲の変数をチェックするかを指定(デフォルトはall)
        vars: 'all',
        // 名前付き引数をどこまでチェックするかを指定(デフォルトはafter-used)
        args: 'all',
        // チェックしない例外パターンを指定（ここではアンダースコアで書けば無視)
        argsIgnorePattern: '^_',
      },
    ],
  },
};
