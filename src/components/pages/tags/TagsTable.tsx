'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space, message, Button } from 'antd';
import Tag from '@/entities/tag/types';
import { deleteTag, fetchTags } from '@/shared/api/tagApi';
import { tagsColumns } from '@/app/context';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';

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
  const handleDelete = (id: string) => {
    const request = async () => {
      try {
        await deleteTag(id);
        message.success('Тег удалён!');
        setTags(prev => prev.filter(tag => String(tag.id) !== id));
      } catch (error) {
        console.error(error);
        message.error('Не удалось удалить тег');
      }
    };
    request();
  };
  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Table
    title={() => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>Список тегов</h2>
      <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/tags/add')}
      >
          Добавить тег
      </Button>
      </div>
  )}
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
                  <a onClick={() => handleDelete(String(record.id))}>Удалить</a>
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
