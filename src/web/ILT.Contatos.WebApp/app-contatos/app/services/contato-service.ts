import axios from "axios";
import https from 'https';
import { IAddContato, IUpdContato, IViewContato } from "../models/contato";

const api = axios.create({
  baseURL: 'https://localhost:7149/api',
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
const ContatoService = () => {
  const headers = {'Content-Type': 'application/json'}
  const getAllContatos = async (): Promise<IViewContato[]> => {
    try {
      const res = await api.get(`/contatos`);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch contatos:', error);
      throw new Error('Failed to fetch contatos');
    }
  };
  const getContatosBySearch = async (busca: string): Promise<IViewContato[]> => {
    try {
      const res = await api.get(`/contatos/search?${busca}`);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch contatos:', error);
      throw new Error('Failed to fetch contatos');
    }
  };

  const addContato = async (contato: IAddContato): Promise<void> => {
    try {
      await api.post(`/contatos`, contato, { headers: headers });
    } catch (error) {
      console.error('Failed to add contato:', error);
      throw new Error('Failed to add contato');
    }
  };

  const updContato = async (id: string, contato: IUpdContato): Promise<void> => {
    try {
      await api.put(`/contatos/${id}`, contato, { headers: headers });
    } catch (error) {
      console.error('Failed to update contato:', error);
      throw new Error('Failed to update contato');
    }
  };

  const deleteContato = async (id: string): Promise<void> => {
    try {
      await api.delete(`/contatos/${id}`);
    } catch (error) {
      console.error('Failed to delete contato:', error);
      throw new Error('Failed to delete contato');
    }
  };

  return {
    getAllContatos,
    getContatosBySearch,
    addContato,
    updContato,
    deleteContato
  }
}
export default ContatoService;