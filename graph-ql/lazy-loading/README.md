From this YouTube video: [More GraphQL - Fun Fun Function](https://www.youtube.com/watch?v=RMtq0RCLuzs), continued from [GraphQL Basics - Fun Fun Function](https://www.youtube.com/watch?v=lAJWHHUz8_8)

Me: <br />
[https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA)
[https://www.goodreads.com/book/show.xml?id=27003&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/book/show.xml?id=27003&key=T3VkNIzRe7KaNgic5PfDVA)


In this case we now wanted to just ignore the books being returned under each `author` node and pretend that we instead only had a list of `bookId` elements. Now we will have to fetch the books from separate calls to an end point for fetching books.




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

Multiple fields and fields of child objects:

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

> Note that the fields that can be queried and the way in which they can be queried, e.g. with parameters, have to have been defined within the GraphQL schema.

The last 8 minutes was to translate books titles using Google Translate API. However, this doe not appear to be free (although it is cheap). However, I later found that I was able to use the free and easy-to-use package called `google-translate-api` to do the translations.

	query {
	  author(id: 21559) {
	    name,
	    books {
	      title(lang: "pt")
	    }
	  }
	}


Multiple translations of the same field:

	query {
	  author(id: 21564) {
	    name,
	    books {
	      title: title,
	      frenchTitle: title(lang: "fr"),
	      germanTitle: title(lang: "de")
	    }
	  }
	}

	query {
	  author(id: 4432) {
	    name,
	    books {
	      title: title,
	      frenchTitle: title(lang: "fr"),
	      russianTitle: title(lang: "ru"),
	      chineseTitle: title(lang: "zh-cn")
	    }
	  }
	}

After making the book description translatable:

	query {
	  author(id: 4432) {
	    name,
	    books {
	      title: title,
	      spanishTitle: title(lang: "es"),
	      germanTitle: title(lang: "de"),
	      chineseTitle: title(lang: "zh-cn"),
	      description: description,
	      frenchDescription: description(lang: "fr")
	    }
	  }
	}

