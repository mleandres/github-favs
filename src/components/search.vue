<template>
  <div class="app-search">
    <form @submit.prevent="submit">
      <div class="input">
        <input 
          type="text"
          autofocus
          id="search"
          v-model="term"
          placeholder="Search Term"
          @input="clear">
        <button
          class="search-btn"
          type="submit"
          :disabled="term === ''">Search
        </button>
      </div>
    </form>
    <div class="search-list">
      <table 
        class="search-table"
        cellspacing="0">
        <tr>
          <th class="name">Name</th>
          <th class="lang">Language</th>
          <th class="tag">Latest Tag</th>
          <th class="add"/>
        </tr>
        <app-search-item 
          v-for="(repo, index) in repos"
          :key="index"
          :repo="repo" />
      </table>
    </div>
  </div>
</template>

<script>
import SearchItem from './search/search-item.vue'

export default {
  components: {
    appSearchItem: SearchItem
  },
  data () {
    return {
      term: ''
    }
  },
  computed: {
    repos () {
      return this.$store.state.searchRepos
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('search', this.term)
    },
    clear () {
      if (this.term === '') {
        this.$store.dispatch('clear')
      }
    }
  }
}
</script>

<style scoped>
.input {
  height: 2em;
  margin: 2em;
}

.input .search-btn,
.input input {
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  font-size: 1em;
  height: 100%;
  margin: 0 1em;
  border-radius: 7px;
  padding: 10px;
}

.input input {
  width: 50%;
  border: 1px black solid;
}

.input .search-btn {
  width: 15%;
  background-color: #020122;
  border: 1px black solid;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
}

.search-btn:disabled {
  background-color: #777;
  border-color: #777;
  color: #CCC;
  cursor: not-allowed;
}
</style>
