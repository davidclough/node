From this YouTube video: [GraphQL Basics - Fun Fun Function](https://www.youtube.com/watch?v=lAJWHHUz8_8)

Me: [https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA)



https://github.com/graphql/graphiql
http://graphql.org/swapi-graphql/

VS Code plugin: [https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode](Quokka.js)

<hr />

Install packages with `npm install`

To run server type `npm start`

In browser go to [http://localhost:4000/graphql](http://localhost:4000/graphql)

<hr />

### Queries

query {
  author(id: 4432) {
    name
  }
}


query {
  author(id: 21559) {
    name,
    books {
      title,
      isbn,
      description
    }
  }
}

<hr />

Next video: [More GraphQL - Fun Fun Function](https://www.youtube.com/watch?v=RMtq0RCLuzs)



