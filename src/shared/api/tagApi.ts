import Cookies from 'js-cookie';
import api from './apiClient';
import { endpoints } from '../config/endpoints';
import Tag from '@/entities/tag/types';
import TagDetail from '@/entities/tag/types';

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

export const deleteTag = async (id: string) => {
  const response = await api.delete(`${endpoints.deleteTag}?id=${id}`, {
  headers: {
      Authorization: `Bearer ${token}`,
  },
});

const data = response.data;

return data;
}

export interface TagResponse {
  data: TagDetail[];
}

export interface AddTagPayload {
  code: string;
  name: string;
  sort: number;
}

export const addTag = async (payload: AddTagPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('code', payload.code)
  formData.append('sort', String(payload.sort));

  const response = await api.post(endpoints.addTag, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateTag = async (id: string, payload: AddTagPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('code', payload.code);
  formData.append('sort', String(payload.sort));

  const response = await api.post(`${endpoints.editTag}?id=${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};