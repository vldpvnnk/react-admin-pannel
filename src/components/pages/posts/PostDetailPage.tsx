'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  Spin, Descriptions, Button } from 'antd';
import { viewPost } from '@/shared/api/postApi';
import PostDetail from '@/entities/post/types';
import { getPostDescriptionItems } from '@/features/utils/getPostDescriptionItems';
import '@ant-design/v5-patch-for-react-19';

export default function PostDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string; 

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const fetchPost = async () => {
    try {
      const data = await viewPost(id);
      setPost(data);
    } catch (error) {
      console.error('Ошибка при получении поста:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [id]);

  if (loading) return <Spin size="large" />;

  if (!post) return <div>Пост не найден</div>;

const items = getPostDescriptionItems(post);
  return (
    <div style={{ padding: 24 }}>
        <Button onClick={() => router.push('/posts')}>Вернуться назад</Button>
        <h1>Детали поста</h1>
        <Descriptions bordered column={1} items={items} />
    </div>
  );
}