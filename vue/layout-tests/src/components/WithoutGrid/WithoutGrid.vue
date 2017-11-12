<template>
  <div class="without-grid">

    <h1>{{ msg }}</h1>
    <!-- <h1>{{ $route.name }}</h1> -->

    <!-- https://www.youtube.com/watch?v=HKcTOJxZ2Ts -->
    <div class="grid-container">

      <div class="row">
        <div class="col twelve"></div>
      </div>

      <div class="row">
        <div class="col eleven"></div>
        <div class="col one"></div>
      </div>

      <div class="row">
        <div class="col ten"></div>
        <div class="col two"></div>
      </div>

      <div class="row">
        <div class="col nine"></div>
        <div class="col three"></div>
      </div>

      <div class="row">
        <div class="col eight"></div>
        <div class="col four"></div>
      </div>

      <div class="row">
        <div class="col seven"></div>
        <div class="col three"></div>
        <div class="col two"></div>
      </div>

      <div class="row">
        <div class="col five"></div>
        <div class="col seven"></div>
      </div>

      <div class="row">
        <div class="col four"></div>
        <div class="col four"></div>
        <div class="col four"></div>
      </div>

      <div class="row">
        <div class="col three"></div>
        <div class="col three"></div>
        <div class="col three"></div>
        <div class="col three"></div>
      </div>

      <div class="row">
        <div class="col two"></div>
        <div class="col two"></div>
        <div class="col two"></div>
        <div class="col two"></div>
        <div class="col two"></div>
        <div class="col two"></div>
      </div>

      <div class="row">
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
        <div class="col one"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithoutGrid',
  data () {
    return {
      msg: 'Without Grid'
    }
  }
}
</script>

<style src="./WithoutGrid.less" lang="less" scoped></style>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
*/
</style>
