import { useEffect, useState } from 'react';
import { fetchPosts, Post } from '../../../shared/api/postApi';
import { Space, Table } from 'antd';
import { postsColumns } from '@/app/context';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  return (
      <Table
        title={() => 
          <div>
            <h2 style={{textAlign: 'left'}}>Список постов</h2>
          </div>
        }
        showHeader={true}
        columns={[...postsColumns,
          {
              title: 'Действия',
              key: 'actions',
              render: (_, record) => (
                <Space size='middle'>
                  <a onClick={() => router.push(`/posts/detail/${record.id}`)}>Посмотреть</a>
                  <a onClick={() => router.push(`/posts/edit/${record.id}`)}>Редактировать</a>
                  <a>Удалить</a>
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
