import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'c2530bdf9c104936b92b784035f9981a',
  },
});
