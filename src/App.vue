<template>
  <div id="app">
    <app-header />
    <app-search />
    <app-favourites />
    <app-footer />
  </div>
</template>

<script>
import Header from './components/header.vue'
import Search from './components/search.vue'
import Favourites from './components/favourites.vue'
import Footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appSearch: Search,
    appFavourites: Favourites,
    appFooter: Footer
  },
  mounted () {
    document.title = 'GitHub Favourites'
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

@supports not (display: grid) {
  #app {
    max-width: 50em;

  }
}

@supports (display: grid) {
  @media screen and (min-width: 800px) {
    #app {
      display: grid;
      grid-template-columns: 50vw 50vw;
      grid-template-rows: 120px 1fr 80px;
      grid-template-areas:
        "header header"
        "search favourites"
        "footer footer";
    }
  }
}

h1, h2, h3 {
  font-weight: normal;
}

table {
  width: 100%;
  text-align: left;
  padding: 2em;
  border-spacing: 0 1rem;
}

table .name {
  width: 40%;
}

table .lang, table .tag {
  width: 25%;
}

table .add {
  width: 10%;
}

a {
  color: #225560;
  font-weight: bold;
}
</style>
