import { useEffect, useState } from 'react';
import { deletePost, fetchPosts, Post } from '../../../shared/api/postApi';
import { Button, message, Space, Table } from 'antd';
import { postsColumns } from '@/app/context';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';

const PostsTable = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPosts = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetchPosts(pageNumber);
      setPosts(res.data);
      setPage(res.currentPage);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.error('Ошибка загрузки постов:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const request = async () => {
      try {
        await deletePost(id);
        message.success('Пост удалён!');
        setPosts(prev => prev.filter(post => String(post.id) !== id));
      } catch (error) {
        console.error(error);
        message.error('Не удалось удалить пост');
      }
    };
    request();
  };
  useEffect(() => {
    loadPosts(page);
  }, [page]);

  return (
      <Table
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Список постов</h2>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/posts/add')}
          >
              Добавить пост
          </Button>
          </div>
        )}
        showHeader={true}
        columns={[...postsColumns,
          {
              title: 'Действия',
              key: 'actions',
              render: (_, record) => (
                <Space size='middle'>
                  <a onClick={() => router.push(`/posts/detail/${record.id}`)}>Посмотреть</a>
                  <a onClick={() => router.push(`/posts/edit/${record.id}`)}>Редактировать</a>
                  <a onClick={() => handleDelete(String(record.id))}>Удалить</a>
                </Space>
              )
          }
        ]}
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          total: totalPages * 10,
          onChange: (newPage) => setPage(newPage),
          position: ['bottomCenter']
        }}
      />
  );
};

export default PostsTable;
