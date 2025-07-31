'use client';

import React from 'react';
import { Button, Typography, Card } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f0f2f5',
    }}>
      <Card style={{ maxWidth: 600, padding: 24 }}>
        <Title level={2}>Добро пожаловать в панель управления!</Title>
        <Paragraph>
          Это административное приложение позволяет управлять авторами, постами и тегами. 
          Вы можете добавлять, редактировать и удалять данные через удобный интерфейс.
        </Paragraph>
        <Paragraph>
          Для продолжения работы необходимо пройти авторизацию.
        </Paragraph>
        <Button type="primary" onClick={handleLoginRedirect}>
          Перейти к авторизации
        </Button>
      </Card>
    </div>
  );
}
