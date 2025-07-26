
// import axios from 'axios';

// // Créer une instance Axios avec la configuration de base
// const api = axios.create({
//   baseURL: 'http://192.168.1.162:5000', // L'adresse de ton backend Flask
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

import { createApi } from './api';

const baseURL = 'http://192.168.1.162:5000'; 

const api = createApi(baseURL);

// ✅ Appel GET vers /test
export async function getTestMessage() {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du GET /test :', error);
    throw error;
  }
}

// ✅ Appel POST vers /test (si tu actives la route POST plus tard)
export async function postTestMessage(payload) {
  try {
    const response = await api.post('/testPost', payload);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du POST /test :', error);
    throw error;
  }
}



export async function postPhoto(photoUri) {
  console.log('Photo URI:', photoUri);
  const formData = new FormData();

  formData.append('photo', {
    uri: photoUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await api.post(`${baseURL}/upload-photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’envoi de la photo :', error.message);
    throw error;
  }
}
