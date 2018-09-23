import axios from 'axios'

const BASE_URL_REPO = 'https://api.github.com/search/repositories'
const GITHUB_API_KEY = '91f02d084d1275e1016047584209564521ca82b3'
const PER_PAGE = 10

export default {
  state: {
    searchRepos: [],
    favouriteRepos: [],
    auth: {
      username: 'mleandres',
      password: GITHUB_API_KEY
    }
  },
  getters: {
    isFav (state) {
      return name => {
        const i = state.favouriteRepos.findIndex(repo => {
          return name === repo.name
        })
        if (i > -1) {
          return true
        } else {
          return false
        }
      }
    },
    favLength (state) {
      return state.favouriteRepos.length
    }
  },
  mutations: {
    SET_SEARCH (state, rawRepos) {
      const repos = rawRepos.map(repo => {
        return {
          name: repo.full_name,
          language: repo.language,
          link: repo.html_url,
          tagsUrl: repo.tags_url
        }
      })
      state.searchRepos = repos
    },
    ADD_FAV (state, repo) {
      state.favouriteRepos.push(repo)
    },
    REMOVE_FAV (state, i) {
      state.favouriteRepos.splice(i, 1)
    },
    CLEAR_SEARCH_REPOS (state) {
      state.searchRepos = []
    }
  },
  actions: {
    search ({ state, commit }, term) {
      axios.get(`${BASE_URL_REPO}?q=${term}&per_page=${PER_PAGE}`, { auth: state.auth })
        .then(res => {
          commit('SET_SEARCH', res.data.items)
        })
        .catch(err => {
          console.log('There was an error retrieving the data', err)
        })
    },
    addFav ({ commit }, repo) {
      commit('ADD_FAV', repo)
    },
    removeFav ({ commit }, i) {
      commit('REMOVE_FAV', i)
    },
    clear ({ commit }) {
      commit('CLEAR_SEARCH_REPOS')
    }
  }
}
