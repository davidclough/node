const DataLoader = require("dataloader")
const { util, parsedXml, fetch, apiKey } = require("./my-fetch")

const fetchAuthor = id =>
  fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=${apiKey}`)
    .then(response => response.text())
    .then(parsedXml)

const authorLoader = new DataLoader(keys =>
  Promise.all(keys.map(id => fetchAuthor(id))))

// ------------------------------------------------------------------------------------------------------------------------------------
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { translateValue } = require("./my-translate")
const { BookType } = require("./books.js")

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (xml, XX, context) => {
        const ids = xml.GoodreadsResponse.author[0].books[0].book.map(elem => elem.id[0]._)
        return context.bookLoader.loadMany(ids)
      }
    }
  })
})
// ------------------------------------------------------------------------------------------------------------------------------------


module.exports = { authorLoader, AuthorType }
