import { useEffect, useState } from 'react';
import { fetchPosts, Post } from '../../shared/api/postApi';
import { Table } from 'antd';
import { columns } from '@/app/context';
import '@ant-design/v5-patch-for-react-19';

const PostsPage = () => {
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
            <h2 style={{textAlign: 'center'}}>Список постов</h2>
          </div>
        }
        showHeader={true}
        columns={columns}
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

export default PostsPage;
