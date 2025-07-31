import Cookies from 'js-cookie';
import api from './apiClient';
import { endpoints } from '../config/endpoints';
import AuthorDetail from '@/entities/author/types';

const token = Cookies.get('access_token');

export interface AuthorsResponse {
  data: AuthorDetail[];
}

export interface AddAuthorPayload {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription: string;
  description: string;
  avatar?: File | null;
  removeAvatar?: string;
}

export const fetchAuthors = async (): Promise<AuthorDetail[]> => {
  const response = await api.get(endpoints.listOfAuthors, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addAuthor = async (payload: AddAuthorPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('lastName', payload.lastName);
  formData.append('secondName', payload.secondName);
  formData.append('shortDescription', payload.shortDescription);
  formData.append('description', payload.description);

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  formData.append('removeAvatar', String(payload.removeAvatar ?? false));

  const response = await api.post(endpoints.addAuthor, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateAuthor = async (id: string, payload: AddAuthorPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('lastName', payload.lastName);
  formData.append('secondName', payload.secondName);
  formData.append('shortDescription', payload.shortDescription);
  formData.append('description', payload.description);

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  formData.append('removeAvatar', String(payload.removeAvatar ?? false));

  const response = await api.post(`${endpoints.editAuthor}?id=${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const viewAuthor = async (id: string) => {
    const response = await api.get(`${endpoints.detailAuthor}?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = response.data;

    return data;
}

export const deleteAuthor = async (id: string) => {
        const response = await api.delete(`${endpoints.deleteAuthor}?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = response.data;

    return data;
}
