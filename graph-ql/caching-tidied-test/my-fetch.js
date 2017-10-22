// In Node.js 8 this was added to enable libraries which use callbacks to now use promises. It is a BUILT-IN node module.
const util = require('util')
const parsedXml = util.promisify(require('xml2js').parseString)
const fetch = require('node-fetch')
const apiKey = require("./api-key")

module.exports = { util, parsedXml, fetch, apiKey }
