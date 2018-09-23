<template>
  <div class="favs">
    <table
      cellspacing="0"
      class="fav-table">
      <tr>
        <th class="name">Name</th>
        <th class="lang">Language</th>
        <th class="tag">Latest Tag</th>
        <th class="add"/>
      </tr>
      <tr v-for="(repo, i) in favRepos" :key="i" class="fav-row">
        <td>
          <a :href="repo.link" target="_blank">{{ repo.name }}</a>
        </td>
        <td>{{ repo.language }}</td>
        <td>{{ repo.tag }}</td>
        <td>
          <a 
            href="#"
            @click="removeFav(i)">Remove
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    favRepos () {
      return this.$store.state.favouriteRepos
    }
  },
  methods: {
    removeFav (i) {
      this.$store.dispatch('removeFav', i)
    }
  }
}
</script>

<style scoped>
.favs {
  grid-area: favourites;
  background-color: #F2F3AE;
}

.fav-row:hover {
  background-color: #9B9B6F;
}
</style>
