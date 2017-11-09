# vue-test-2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

<hr />
> After updating to Node 8 I got an error with SASS.

> The error was resolved with a command that was indicated on the console: `npm rebuild node-sass --force`

[https://stackoverflow.com/questions/37986800/node-sass-could-not-find-a-binding-for-your-current-environment](https://stackoverflow.com/questions/37986800/node-sass-could-not-find-a-binding-for-your-current-environment) has advice for a similar problem but does not suggest the above solution. I can imagine deleting the SASS-related packages and running `npm install` will also solve it.
