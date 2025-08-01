'use client';

import './globals.css';
import { Providers } from './providers';
import { Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  UserOutlined,
  TagsOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import '@ant-design/v5-patch-for-react-19';
const { Sider, Content } = Layout;
import Cookies from 'js-cookie';
import { endpoints } from '@/shared/config/endpoints';
const menuItems = [
  { key: endpoints.postsPage, icon: <FileTextOutlined />, label: 'Посты' },
  { key: endpoints.authorsPage, icon: <UserOutlined />, label: 'Авторы' },
  { key: endpoints.tagsPage, icon: <TagsOutlined />, label: 'Теги' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const onMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      handleLogout();
    } else {
      router.push(e.key);
    }
  };
  
  const [isAuth, setIsAuth] = React.useState(false);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'GET' });
    Cookies.remove('access_token');
    setIsAuth(false);
    router.push('/login');
  };
  
  React.useEffect(() => {
    const token = Cookies.get('access_token');
    setIsAuth(!!token);
  }, [pathname]);
  

  return (
    <html lang="ru">
      <body>
        <Providers>
          <Layout style={{ minHeight: '100vh' }}>
          {isAuth && (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      style={{ height: '100%', borderRight: 0 }}
      onClick={onMenuClick}
      items={[
        ...menuItems,
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Выйти',
          onClick: handleLogout,
        },
      ]}
    />
  </Sider>
)}


            <Layout style={{ padding: '24px' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                {children}
              </Content>
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
