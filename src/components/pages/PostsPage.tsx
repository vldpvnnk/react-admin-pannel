import { useEffect, useState } from 'react';
import { fetchPosts, Post } from '../../shared/api/postApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button, Table } from 'antd';
import { columns } from '@/app/context';

const PostsPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.replace("/");
  }

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
        title={() => <div>
                    <h2 style={{textAlign: 'center'}}>Список постов</h2>
                    <Button onClick={handleLogout}>Выйти</Button>
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
