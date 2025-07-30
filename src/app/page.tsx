'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (token) {
      router.replace('/posts');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null;
}
