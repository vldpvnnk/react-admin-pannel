'use client';

import dynamic from 'next/dynamic';

const PostsPage = dynamic(() => import('@/components/pages/posts/PostTable'), {
  ssr: false,
});

export default PostsPage;