import { useEffect, useState } from 'react';
import { fetchPosts, Post } from '../../shared/api/postApi';

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
    <div>
      <h2>Список постов</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong> — автор: {post.authorName}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Назад</button>
        <span style={{ margin: '0 10px' }}>Страница {page} из {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Вперёд</button>
      </div>
    </div>
  );
};

export default PostsPage;
