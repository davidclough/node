From this YouTube video: [More GraphQL - Fun Fun Function](https://www.youtube.com/watch?v=RMtq0RCLuzs), contined from [GraphQL Basics - Fun Fun Function](https://www.youtube.com/watch?v=lAJWHHUz8_8)

Me: [https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA)


In this case we now wanted to just ignore the books being returned under each `author` node and pretend that we instead only had a list of `bookId` elements. Now we will have to fetch the books from separate calls to an end point for fetching books.




https://github.com/graphql/graphiql
http://graphql.org/swapi-graphql/

VS Code plugin: [https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode](Quokka.js)

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




