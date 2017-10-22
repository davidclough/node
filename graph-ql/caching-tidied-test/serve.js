const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()

const schema = require('./schema')

app.use('/graphql', graphqlHTTP(req => {
  const { authorLoader } = require("./authors")
  const { bookLoader } = require("./books")

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
