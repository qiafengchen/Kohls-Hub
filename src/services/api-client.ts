import axios from 'axios';

export default axios.create({
  baseURL: 'https://kohls.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'f612429eccmsh11768d3a395f8fep1f9bbajsn49a589b63780',
    'X-RapidAPI-Host': 'kohls.p.rapidapi.com',
  },
});
