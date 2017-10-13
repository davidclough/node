// const fetch = require('node-fetch')

// const x = fetch('https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA')
//   .then(response => response.text())

// x 




const fetch = require('node-fetch')

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

// const x = fetch('https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA')
//   .then(response => response.text())
//   .then(parsedXml)

// quokka inspection (see around 17 minutes):
//x

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: '...',

  fields: () => ({
      // Original.
    //   title: {
    //   type: GraphQLString,
    //   resolve: xml => xml.title[0]
    //   //resolve: xml => console.log('BOOK: ', JSON.stringify(xml, null, 2))
    //   //resolve: xml => console.log('BOOK: ', xml)
    // },
    // isbn: {
    //   type: GraphQLString,
    //   resolve: xml => xml.isbn[0]
    // },
    // description: {
    //   type: GraphQLString,
    //   resolve: xml => xml.description[0]
    // }

    title: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].title[0]
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0]
    },
    description: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].description[0]
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

      // Original.
      // resolve: xml => xml.GoodreadsResponse.author[0].books[0].book

      // Books now lazily fetched from separate end point.
      resolve: xml => {
        const ids = xml.GoodreadsResponse.author[0].books[0].book.map(elem => elem.id[0]._)
        return Promise.all(ids.map(id =>
          fetch(`https://www.goodreads.com/book/show.xml?id=${id}&key=T3VkNIzRe7KaNgic5PfDVA`)
            .then(response => response.text())
            .then(parsedXml)
        ))
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
        resolve: (root, args) =>
          fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=T3VkNIzRe7KaNgic5PfDVA`)
            .then(response => response.text())
            .then(parsedXml)
      }
    })
  })
})

