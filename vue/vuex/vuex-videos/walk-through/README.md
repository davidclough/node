# vuex-basics

> A Vue.js project

## DC Notes

Downloaded from his source code and modified whilst watching his [STATE & STORE | VueJS 2 & Vuex | Learning the Basics](https://www.youtube.com/watch?v=2CSr2vBApSI&list=PL55RiY5tL51pT0DNJraU93FhMzhXxtDAo) videos, starting with:

- [Video 1](https://www.youtube.com/watch?v=2CSr2vBApSI) - Here he sets up the store and stores users and registered users within it. The only problem is he directly manipulates all the data from within the `App.vue` file and also in a rather manual way.
- [Video 2](https://www.youtube.com/watch?v=iw1eajzWQAM)
- [Video 3](https://www.youtube.com/watch?v=dkFWOsKrPAI) - Introduces mutations
- [Video 4](https://www.youtube.com/watch?v=kRI4YLMjgHQ&index=4&list=PL55RiY5tL51pT0DNJraU93FhMzhXxtDAo) - Introduces actions
- [Video 5](https://www.youtube.com/watch?v=5z8joUGkGKE&list=PL55RiY5tL51pT0DNJraU93FhMzhXxtDAo&index=5) - Splits the store up into separate modules.

The first thing he added was the `store.js` file.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
