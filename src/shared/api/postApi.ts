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

export const fetchPosts = async (page = 1): Promise<PaginatedPostsResponse> => {
  const token = Cookies.get('access_token');

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
