# vue-firebase-test

> A Vue.js project

## DC Notes
Created when watching [Vue.js 2 & Firebase - Building Real Time Single Page Web Applications](https://www.youtube.com/watch?v=we4zuQIXmnw).

Also see [Firebase](https://console.firebase.google.com/).
<br />7ar

After creating the vue.js project and installing:
npm install --save firebase vuefire

[VueFire](https://github.com/vuejs/vuefire)

toastr was included by first running `npm install toastr` and then including a link to a CDN for the CSS.<br />
Changed it to use the CSS included within the package just for experimentation.< br />
However, his correct reasoning is that the CSS will be delivered more quickly if fetched from a CDN.

> Note: toastr required jquery package to be installed when I tried it, even though there is also a link to the jquery CDN (required by BootStrap).

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
