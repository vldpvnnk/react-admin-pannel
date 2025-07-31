'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/shared/store';
import { loginRequest } from '@/entities/user/model/authSlice';
import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
type FieldType = {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = useForm();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/posts');
    }
  }, [isAuthenticated]);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginRequest(values));
  };

  return (
    <div style={{maxWidth: 400, margin: '0 auto', paddingTop: '25vh'}}>
        <h2>Авторизация</h2>
        {error && (
          <Alert
            message="Ошибка входа"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          form={form}
          layout='vertical'
          name='login'
          autoComplete="off"
          initialValues={{ email: 'test@test.ru', password: 'khro2ij3n2730' }}
          onFinish={handleSubmit}
        >
          <Form.Item<FieldType>
            label="Почта"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите свою почту!' },
              {required: true, type: 'email', message: 'Введите корректный email!'}
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Почта'/>
          </Form.Item>
          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите свой пароль!' },
              { 
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
                message: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры' 
              }
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Пароль"/>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType='submit' loading={loading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
}
