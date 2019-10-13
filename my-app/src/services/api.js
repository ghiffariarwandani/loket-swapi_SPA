import axios from 'axios'

const ax = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/swapi.co/api/'
})

export default ax