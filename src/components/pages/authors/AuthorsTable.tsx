'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space } from 'antd';
import { authorsColumns } from '@/app/context';
import { useRouter } from 'next/navigation';
import AuthorDetail from '@/entities/author/types';
import { fetchAuthors } from '@/shared/api/authorsApi';

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

  return (
    <Table
      title={() => 
        <div>
          <h2 style={{textAlign: 'left'}}>Список авторов</h2>
        </div>
      } 
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
                  <a>Удалить</a>
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
