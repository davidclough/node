<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>
        Vue.js and FireBase Sample Application
      </h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add Book</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" @submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Title:</label>
            <input type="text" name="bookTitle" id="bookTitle" class="form-control" v-model="newBook.title" />
          </div>
          <div class="form-group">
            <label for="bookAuthor">Author:</label>
            <input type="text" name="bookAuthor" id="bookAuthor" class="form-control" v-model="newBook.author" />
          </div>
          <div class="form-group">
            <label for="bookUrl">URL:</label>
            <input type="text" name="bookUrl" id="bookUrl" class="form-control" v-model="newBook.url" />
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Book Lists</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.url">
              <td><a :href="book.url" target="_blank">{{book.title}}</a></td>
              <td>{{book.author}}</td>
              <td>
                <span class="glyphicon glyphicon-trash" @click.self="removeBook(book)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import Firebase from "firebase"
import toastr from "toastr"

// My experiment.
import "toastr/build/toastr.min.css"

// Firebase project overview: Add Firebase to your web app.
const config = {
  apiKey: "AIzaSyD8Djk8HfF4IX-hoUiHM0c2jAqWQKh4t7A",
  authDomain: "vue-firebase-1-c7545.firebaseapp.com",
  databaseURL: "https://vue-firebase-1-c7545.firebaseio.com",
  projectId: "vue-firebase-1-c7545",
  storageBucket: "vue-firebase-1-c7545.appspot.com",
  messagingSenderId: "684403327364"
}

const app = Firebase.initializeApp(config)
const db = app.database();

const booksRef = db.ref("books")

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      newBook: {
        title: "",
        author: "",
        url: ""
      }
    }
  },
  methods: {
    addBook() {
      booksRef.push(this.newBook)
      this.newBook = {
        title: "",
        author: "",
        url: ""
      }
    },
    removeBook(book) {
      booksRef.child(book[".key"]).remove()
      toastr.success("Book removed")
    }
  },

  // New property allowed via VueFire: https://github.com/vuejs/vuefire
  firebase: {
    books: booksRef
  }}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
