const apiKey = 'T3VkNIzRe7KaNgic5PfDVA'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()

const schema = require('./schema')

const DataLoader = require("dataloader")
const fetch = require('node-fetch')

// In Node.js 8 this was added to enable libraries which use callbacks to now use promises. It is a BUILT-IN node module.
const util = require('util')
const parsedXml = util.promisify(require('xml2js').parseString)

// -----------------------------------------------------------------------------------------------------------------------------
// He initially defined these and the DataLoaders in the schema.js file. However, the default behaviour of the DataLoader
// would then result in data being cached permanently for the duration of the application.
// He then moved them into serve.js so he could cach API calls only if they were repeated again in the same request.

// NOTE: The documentation at https://www.npmjs.com/package/dataloader states that the prime intended use for dataloader is
//       for cahing data PER REQUEST (as we have done here).
//       The documentation emphasises that dataloader is not intended to be used as an application-level caching mechanism.
// OBSERVATION: Before we added the DataLoaders to the graphqlHTTP context the, first time we called a query the data was fetched
//              as normal but calling the same query again returned pretty instantaneous results.

const fetchAuthor = (id) =>
fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=${apiKey}`)
  .then(response => response.text())
  .then(parsedXml)

const fetchBook = (id) =>
fetch(`https://www.goodreads.com/book/show.xml?id=${id}&key=${apiKey}`)
  .then(response => response.text())
  .then(parsedXml)
// -----------------------------------------------------------------------------------------------------------------------------

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true
// }))

app.use('/graphql', graphqlHTTP(req => {
  const authorLoader = new DataLoader(keys =>
  Promise.all(keys.map(id => fetchAuthor(id))))

  const bookLoader = new DataLoader(keys =>
  Promise.all(keys.map(id => fetchBook(id))))

  return {
    schema,
    graphiql: true,

    context: {
      authorLoader,
      bookLoader
    }
  }
}))

app.listen(4000)
console.log('Listening...')
