From this YouTube video: [GraphQL caching using Dataloader - Fun Fun Function](https://www.youtube.com/watch?v=--AguZ20lLA), continued from [More GraphQL - Fun Fun Function](https://www.youtube.com/watch?v=RMtq0RCLuzs)

He creates a deliberately inefficient situation and uses the `dataloader` package to add a caching mechanism.

Me: <br />
[https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/author/show.xml?id=4432&key=T3VkNIzRe7KaNgic5PfDVA)
[https://www.goodreads.com/book/show.xml?id=27003&key=T3VkNIzRe7KaNgic5PfDVA](https://www.goodreads.com/book/show.xml?id=27003&key=T3VkNIzRe7KaNgic5PfDVA)


In this case we now wanted to just ignore the books being returned under each `author` node and pretend that we instead only had a list of `bookId` elements. Now we will have to fetch the books from separate calls to an end point for fetching books.

In the API, the `<book>` returned from the second link above has a list of `<author>` tags but they will not map directly to the `AuthorType` we previously defined as the `<author` tags do NOT contain a list of books.



https://github.com/graphql/graphiql
http://graphql.org/swapi-graphql/

VS Code plugin: [https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode](Quokka.js)

<hr />

Install packages with `npm install`

To run server type `npm start`
You can also type `nodemon` instead if you want to be able to make changes to the files and have the server auto-load them without you having to stop the server and start it up again.
You need to have installed it (globally in this case): `npm install -g nodemon`

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
	    name
	    books {
	      title
	      isbn
	      description
	    }
	  }
	}

> Note that the fields that can be queried and the way in which they can be queried, e.g. with parameters, have to have been defined within the GraphQL schema.

The last 8 minutes was to translate books titles using Google Translate API. However, this doe not appear to be free (although it is cheap). However, I later found that I was able to use the free and easy-to-use package called `google-translate-api` to do the translations.

	query {
	  author(id: 21559) {
	    name
	    books {
	      title(lang: "pt")
	    }
	  }
	}


Multiple translations of the same field:

	query {
	  author(id: 21564) {
	    name
	    books {
	      title: title,
	      frenchTitle: title(lang: "fr")
	      germanTitle: title(lang: "de")
	    }
	  }
	}

	query {
	  author(id: 4432) {
	    name
	    books {
	      title: title
	      frenchTitle: title(lang: "fr")
	      russianTitle: title(lang: "ru")
	      chineseTitle: title(lang: "zh-cn")
	    }
	  }
	}

After making the book description translatable:

	query {
	  author(id: 4432) {
	    name
	    books {
	      title: title
	      spanishTitle: title(lang: "es")
	      germanTitle: title(lang: "de")
	      chineseTitle: title(lang: "zh-cn")
	      description: description
	      frenchDescription: description(lang: "fr")
	    }
	  }
	}


	# Charles Dickens.
	query {
	  author(id: 239579) {
	    name,
	    books {
	      title: title,
	      frenchTitle: title(lang: "fr"),
	      germanTitle: title(lang: "es")
	    }
	  }
	}


This would have been an exceptionally slow query before per-request caching via `dataloader` was added.

	query {
	  author(id: 21559) {
	    name
	    books {
	      title
	      isbn
	      authors {
	        name
	        books {
	          title
	          authors {
	            name
	            books {
	              isbn
	            }
	          }
	        }
	      }
	    }
	  }
	}

> The mentalist query above was designed to show how slow the query was before we added request-level caching but the person writing the query is in control here and, if they wanted, could add many more nested levels just for the fun of it.

> It looks pretty obvious that this "out-of-our-hands" situation, means that use of `dataloader` is a **must** if there are any circular dependencies within our query schema.

## Relay
This is another Facebook library and wa not covered in the videos. Amongst other things it looks after pagination. It also enforces some standards, e.g. situations where an error needs to be returned and how to do it.

