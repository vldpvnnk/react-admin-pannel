'use client';

import dynamic from 'next/dynamic';

const PostsPage = dynamic(() => import('@/components/pages/PostsPage'), {
  ssr: false,
});

export default PostsPage;