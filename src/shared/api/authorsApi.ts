import Cookies from 'js-cookie';
import api from './apiClient';
import { endpoints } from '../config/endpoints';
import AuthorDetail from '@/entities/author/types';

const token = Cookies.get('access_token');

export interface AuthorsResponse {
  data: AuthorDetail[];
}

export const fetchAuthors = async (): Promise<AuthorDetail[]> => {
  const response = await api.get(endpoints.listOfAuthors, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
