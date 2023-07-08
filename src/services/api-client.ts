import axios from 'axios';

export default axios.create({
  baseURL: 'https://kohls.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '731e179662mshf81f7e3ef00701ap1af09ajsnf96aca230cd8',
    'X-RapidAPI-Host': 'kohls.p.rapidapi.com',
  },
});
