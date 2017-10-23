const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { translateValue } = require("./my-translate")

//
// Tried to put the next two objects below in authors.js and books.js respectively but I think there is a problem using "require" as normal
// because the objects have circular dependencies:
//  http://requirejs.org/docs/api.html#circular
//

// const { BookType } = require("./books")

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

// const { AuthorType } = require("./authors")

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
        // return bookLoader.loadMany(ids)
        return context.bookLoader.loadMany(ids)
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.authorLoader.load(args.id)
      }
    })
  })
})