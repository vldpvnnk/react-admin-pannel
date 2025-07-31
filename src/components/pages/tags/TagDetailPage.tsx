'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  Spin, Descriptions, Button } from 'antd';
import TagDetail from '@/entities/tag/types';
import '@ant-design/v5-patch-for-react-19';
import { viewTag } from '@/shared/api/tagApi';
import { getTagDescriptionItems } from '@/features/utils/getTagDescriptionItems';

export default function TagDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string; 

  const [tag, setTag] = useState<TagDetail | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {

    const fetchPost = async () => {
        try {
        const data = await viewTag(id);
        setTag(data);
        } catch (error) {
        console.error('Ошибка при получении поста:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchPost();
    }, [id]);

  if (loading) return <Spin size="large" />;

  if (!tag) return <div>Пост не найден</div>;

    const items = getTagDescriptionItems(tag)
  return (
    <div style={{ padding: 24 }}>
        <Button 
            onClick={() => router.push('/tags')}
        >
            Вернуться назад
        </Button>
        <h1>Детали тега</h1>
        <Descriptions 
            bordered 
            column={1} 
            items={items} 
        />
    </div>
  );
}