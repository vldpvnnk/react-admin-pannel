'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Upload, Switch, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { useRouter } from 'next/navigation';
import { addAuthor } from '@/shared/api/authorsApi';

export default function AddAuthorForm() {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
type FormValues = {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription: string;
  description: string;
  removeAvatar: boolean;
};

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await addAuthor({
        ...values,
        avatar: avatarFile,
        removeAvatar: avatarFile ? "0" : "1",
      });
      message.success('Автор успешно добавлен');
      router.push('/authors');
    } catch (err) {
      console.error(err);
      message.error('Ошибка при добавлении автора');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        removeAvatar: false,
      }}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: 'Введите имя' }]}
        
      >
        <Input autoComplete='off'/>
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: 'Введите фамилию' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Отчество"
        name="secondName"
        rules={[{ required: true, message: 'Введите отчество' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Краткое описание"
        name="shortDescription"
        rules={[{ required: true, message: 'Введите краткое описание' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Полное описание"
        name="description"
        rules={[{ required: true, message: 'Введите описание' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Аватар">
        <Upload
          beforeUpload={(file: RcFile) => {
            setAvatarFile(file);
            return false;
          }}
          onRemove={() => setAvatarFile(null)}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Удалить аватар" name="removeAvatar" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
