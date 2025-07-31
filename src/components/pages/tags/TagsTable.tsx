'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space } from 'antd';
import Tag from '@/entities/tag/types';
import { fetchTags } from '@/shared/api/tagApi';
import { tagsColumns } from '@/app/context';
import { useRouter } from 'next/navigation';

const TagsTable = () => {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTags()
      .then(setTags)
      .catch(() => setError('Ошибка при загрузке тегов'))
      .finally(() => setLoading(false));
  }, []);
  console.log("tags", tags)

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Table
      title={() => 
        <div>
          <h2 style={{textAlign: 'left'}}>Список тегов</h2>
        </div>
      } 
      showHeader
      rowKey="id" 
      columns={[...tagsColumns, 
        {
          title: 'Действия',
          key: 'actions',
          render: (_, record) => (
                <Space size='small'>
                  <a onClick={() => router.push(`/tags/detail/${record.id}`)}>Посмотреть</a>
                  <a onClick={() => router.push(`/tags/edit/${record.id}`)}>Редактировать</a>
                  <a>Удалить</a>
                </Space>
          )
        }
      ]} 
      dataSource={tags}
      loading={loading}
      pagination={{
          position: ['bottomCenter']
      }} 
    />);
};

export default TagsTable;
