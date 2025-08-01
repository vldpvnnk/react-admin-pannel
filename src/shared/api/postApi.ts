import { endpoints } from '../config/endpoints';
import api from './apiClient';
import Cookies from 'js-cookie';

export interface Post {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture: {
    id: number;
    name: string;
    url: string;
};
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
}

export interface PaginatedPostsResponse {
  data: Post[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface AddPostPayload {
  code: string;
  title: string;
  authorId: number;
  tagIds: number[];
  text: string;
  previewPicture?: File;
}

const token = Cookies.get('access_token');

export const fetchPosts = async (page = 1): Promise<PaginatedPostsResponse> => {
  const response = await api.get(endpoints.listOfPosts, {
    params: { page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  const totalPages = parseInt(response.headers['x-pagination-page-count'] || '1', 10);
  const currentPage = parseInt(response.headers['x-pagination-current-page'] || '1', 10);
  const totalItems = parseInt(response.headers['x-pagination-total-count'] || '0', 10);

  return {
    data,
    totalPages,
    currentPage,
    totalItems,
  };
};

export const addPost = async (payload: AddPostPayload) => {
  const formData = new FormData();

  formData.append('code', payload.code);
  formData.append('title', payload.title);
  formData.append('authorId', payload.authorId.toString());
  formData.append('text', payload.text);

  payload.tagIds.forEach((tagId) => {
    formData.append('tagIds[]', tagId.toString()); // массив
  });

  if (payload.previewPicture) {
    formData.append('previewPicture', payload.previewPicture);
  }

  const response = await api.post(endpoints.addPost, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updatePost = async (id: string, formData: FormData) => {
  const response = await api.post(`${endpoints.editPost}?id=${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


export const viewPost = async (id: string) => {
    const response = await api.get(`${endpoints.viewPost}?id=${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  
  });

  const data = response.data;

  return data;
}

export const deletePost = async (id: string) => {
  const response = await api.delete(`${endpoints.deletePost}?id=${id}`, {
  headers: {
      Authorization: `Bearer ${token}`,
  },
});

const data = response.data;

return data;
}