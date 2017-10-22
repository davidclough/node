// Unlike the one in his video, this package offer free (rather than very cheap) and unlimited translations:
//    https://github.com/matheuss/google-translate-api
// It is also even easier to use.
const translate = require('google-translate-api');
translate('Ik spreek Engels', {to: 'en'}).then(res => {
   console.log(res.text);
   console.log(res.from.language.iso);    // I speak English
}).catch(err => {                         // nl 
   console.error(err);
});

// In Node.js 8 this was added to enable libraries which use callbacks to now use promises. It is a BUILT-IN node module.
const util = require('util')

const parsedXml = util.promisify(require('xml2js').parseString)

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const translateValue = (fieldValue, args) => {
  return args.lang 
          ? translate(fieldValue, {to: args.lang})
            .then(res => res.text)
            .catch(err => `${args.lang} TRANSLATION NOT AVAILABLE`)
          : fieldValue
}



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
      // He wanted to create an artificial situation which demonstrated inefficiency:
      // Fetching authors is easy to do and we can infinitely nest book/authors/books/authors in our query. However,
      // this will be exceptionally inefficient as it will fetch every inividual item from the API.

      // NOTE: In this case the <author> tags contained in <book> do not themselves contain a list of <book> tags.
      resolve: (xml, XX, context) => {
        const authorElements = xml.GoodreadsResponse.book[0].authors[0].author
        const ids = authorElements.map(elem => elem.id[0])
        // return Promise.all(ids.map(id => fetchAuthor(id)))
        // return authorLoader.loadMany(ids)
        return context.authorLoader.loadMany(ids)
      }
    }
  })
})

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
        // resolve: (root, args) => fetchAuthor(args.id)
        // resolve: (root, args) => authorLoader.load(args.id)
        resolve: (root, args, context) => context.authorLoader.load(args.id)
      }
    })
  })
})

