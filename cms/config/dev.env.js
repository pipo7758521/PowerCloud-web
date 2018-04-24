'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/api/"',
  BASE_API: '"http://202.118.26.9:8080/PowerCloud/api/"',
  UPLOAD_URL: '"http://202.118.26.74:8080/upload/"'
})
