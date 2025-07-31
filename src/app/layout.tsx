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

const menuItems = [
  { key: '/posts', icon: <FileTextOutlined />, label: 'Посты' },
  { key: '/authors', icon: <UserOutlined />, label: 'Авторы' },
  { key: '/tags', icon: <TagsOutlined />, label: 'Теги' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const onMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

const handleLogout = async () => {
  await fetch('/api/logout', { method: 'GET' });
  router.push('/login'); 
};

  return (
    <html lang="ru">
      <body>
        <Providers>
          <Layout style={{ minHeight: '100vh' }}>
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
