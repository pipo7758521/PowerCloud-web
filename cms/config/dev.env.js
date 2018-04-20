'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/api/"',
  BASE_API: '"http://202.118.26.208:8080/PowerCloud/api/"',
})
