'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space, Button, message } from 'antd';
import { authorsColumns } from '@/app/context';
import { useRouter } from 'next/navigation';
import AuthorDetail from '@/entities/author/types';
import { deleteAuthor, fetchAuthors } from '@/shared/api/authorsApi';
import { PlusOutlined } from '@ant-design/icons';

const AuthorsTable = () => {
  const router = useRouter();
  const [authors, setAuthors] = useState<AuthorDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAuthors()
      .then(setAuthors)
      .catch(() => setError('Ошибка при загрузке авторов'))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;
const handleDelete = (id: string) => {
  const request = async () => {
    try {
      await deleteAuthor(id);
      message.success('Автор удалён!');
      setAuthors(prev => prev.filter(author => String(author.id) !== id));
    } catch (error) {
      console.error(error);
      message.error('Не удалось удалить автора');
    }
  };
  request();
};

  return (
    <Table
        title={() => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Список авторов</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => router.push('/authors/add')}
            >
                Добавить автора
            </Button>
            </div>
        )}
      showHeader
      rowKey="id" 
      columns={[...authorsColumns, 
        {
          title: 'Действия',
          key: 'actions',
          render: (_, record) => (
                <Space size='small'>
                  <a onClick={() => router.push(`/authors/detail/${record.id}`)}>Посмотреть</a>
                  <a onClick={() => router.push(`/authors/edit/${record.id}`)}>Редактировать</a>
                  <a onClick={() => handleDelete(String(record.id))}>Удалить</a>
                </Space>
          )
        }
      ]} 
      dataSource={authors}
      loading={loading}
      pagination={{
          position: ['bottomCenter']
      }} 
    />);
};

export default AuthorsTable;
