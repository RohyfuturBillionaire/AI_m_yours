import { createApi } from './api';

const baseURL = 'http://192.168.1.162:6000'; 

const api = createApi(baseURL);

export async function getNodeMessage() {
  try {
    const response = await api.get('/api/message');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du GET /test :', error);
    throw error;
  }
}

export async function getNodeData() {
  try {
    const response = await api.get('/api/test');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du GET /test :', error);
    throw error;
  }
}

// // ✅ Appel POST vers /test (si tu actives la route POST plus tard)
// export async function postTestMessage(payload) {
//   try {
//     const response = await api.post('/test', payload);
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors du POST /test :', error);
//     throw error;
//   }
// }