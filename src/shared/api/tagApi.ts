import Cookies from 'js-cookie';
import api from './apiClient';
import { endpoints } from '../config/endpoints';
import Tag from '@/entities/tag/types';

const token = Cookies.get('access_token');

export interface TagsResponse {
  data: Tag[];
}

export const fetchTags = async (): Promise<Tag[]> => {
  const response = await api.get(endpoints.listOfTags, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const viewTag = async (id: string) => {
    const response = await api.get(`${endpoints.detailTag}?id=${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  
  });

  const data = response.data;

  return data;
}