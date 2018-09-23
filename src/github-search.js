import axios from 'axios'

const github = 'https://api.github.com/search/repositories'

export default axios.create({
  baseURL: github
})