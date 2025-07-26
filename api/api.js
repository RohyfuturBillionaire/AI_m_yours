import axios from 'axios';

// Fonction qui crée une instance Axios à partir de baseURL passée en argument
export function createApi(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
