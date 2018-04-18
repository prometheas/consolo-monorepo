const path = require('path')

module.exports = {
  extends: ['airbnb'],
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, 'node_modules')
        ]
      }
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 0
  }
}
