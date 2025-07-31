'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  Spin, Descriptions, Button } from 'antd';
import { viewAuthor } from '@/shared/api/authorsApi';
import AuthorDetail from '@/entities/author/types';
import { getAuthorDescriptionItems } from '@/features/utils/getAuthorDescriptionItems';

export default function AuthorsDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string; 

  const [author, setAuthor] = useState<AuthorDetail | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const fetchAuthor = async () => {
    try {
      const data = await viewAuthor(id);
      setAuthor(data);
    } catch (error) {
      console.error('Ошибка при получении поста:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchAuthor();
}, [id]);

  if (loading) return <Spin size="large" />;

  if (!author) return <div>Автор не найден</div>;

const items = getAuthorDescriptionItems(author);
  return (
    <div style={{ padding: 24 }}>
        <Button onClick={() => router.push('/authors')}>Вернуться назад</Button>
        <h1>Детали автора</h1>
        <Descriptions bordered column={1} items={items} />
    </div>
  );
}