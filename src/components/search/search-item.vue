<template>
  <tr class="search-row">
    <td>
      <a :href="repo.link" target="_blank">{{ trimmedName }}</a>
    </td>
    <td>{{ repo.language }}</td>
    <td>{{ tag }}</td>
    <td>
      <a 
        href="#"
        v-if="!isFav"
        @click="addFav">Add
      </a>
    </td>
  </tr>
</template>

<script>
import axios from 'axios'

export default {
  props: ['repo'],
  data () {
    return {
      tag: ''
    }
  },
  computed: {
    isFav () {
      return this.$store.getters.isFav(this.repo.name)
    },
    trimmedName () {
      if (this.repo.name.length > 40) {
        return this.repo.name.slice(0, 37) + '...'
      } else {
        return this.repo.name
      }
    }
  },
  mounted () {
    this.getTag()
  },
  watch: {
    repo () {
      this.getTag()
    }
  },
  methods: {
    getTag () {
      axios.get(`${this.repo.tagsUrl}`, { auth: this.$store.state.auth })
        .then(res => {
          if (res.data.length === 0) {
            this.setTag('-')
          } else {
            this.setTag(res.data[0].name)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTag (name) {
      this.tag = (name === '' ? '-' : name)
    },
    addFav () {
      const repo = {
        name: this.repo.name,
        language: this.repo.language,
        link: this.repo.link,
        tag: this.tag
      }
      this.$store.dispatch('addFav', repo)
    }
  }
}
</script>

<style scoped>
.search-row {
  text-align: left;
}

.search-row:hover {
  background-color: #DDD;
}
</style>
