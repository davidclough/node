const DataLoader = require("dataloader")
const { util, parsedXml, fetch, apiKey } = require("./my-fetch")

// He initially defined these and the DataLoaders in the schema.js file. However, the default behaviour of the DataLoader
// would then result in data being cached permanently for the duration of the application.
// He then moved them into serve.js so he could cach API calls only if they were repeated again in the same request.

// NOTE: The documentation at https://www.npmjs.com/package/dataloader states that the prime intended use for dataloader is
//       for cahing data PER REQUEST (as we have done here).
//       The documentation emphasises that dataloader is not intended to be used as an application-level caching mechanism.
// OBSERVATION: Before we added the DataLoaders to the graphqlHTTP context the, first time we called a query the data was fetched
//              as normal but calling the same query again returned pretty instantaneous results.

const fetchBook = id =>
  fetch(`https://www.goodreads.com/book/show.xml?id=${id}&key=${apiKey}`)
    .then(response => response.text())
    .then(parsedXml)

const bookLoader = new DataLoader(keys =>
  Promise.all(keys.map(id => fetchBook(id))))
  
// ------------------------------------------------------------------------------------------------------------------------------------
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { translateValue } = require("./my-translate")
const { AuthorType } = require("./authors.js")

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: '...',

  fields: () => ({
    title: {
      type: GraphQLString,
      args: {
        lang: { type: GraphQLString }
      },
      resolve: (xml, args) => translateValue(xml.GoodreadsResponse.book[0].title[0], args)
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0]
    },
    description: {
      type: GraphQLString,
      args: {
        lang: { type: GraphQLString }
      },
      resolve: (xml, args) => translateValue(xml.GoodreadsResponse.book[0].description[0], args)
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (xml, XX, context) => {
        const authorElements = xml.GoodreadsResponse.book[0].authors[0].author
        const ids = authorElements.map(elem => elem.id[0])
        return context.authorLoader.loadMany(ids)
      }
    }
  })
})
// ------------------------------------------------------------------------------------------------------------------------------------


// module.exports = { fetchBook, bookLoader }
// module.exports = { bookLoader }
//module.exports = { bookLoader, BookType }
module.exports.bookLoader = bookLoader
module.exports.BookType = BookType
