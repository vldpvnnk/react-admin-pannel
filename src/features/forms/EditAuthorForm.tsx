'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Switch, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { useParams, useRouter } from 'next/navigation';
import { viewAuthor, updateAuthor } from '@/shared/api/authorsApi';
import AuthorDetail from '@/entities/author/types';

export default function EditAuthorForm() {
  const [form] = Form.useForm();
  const [author, setAuthor] = useState<AuthorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const params = useParams();
    const id = params.id as string; 
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      message.error('ID автора не найден');
      return;
    }

    const fetchAuthor = async () => {
      try {
        const data = await viewAuthor(id);
        setAuthor(data);
        form.setFieldsValue({
          name: data.name,
          lastName: data.lastName,
          secondName: data.secondName,
          shortDescription: data.shortDescription,
          description: data.description,
          removeAvatar: false,
        });
      } catch (error) {
        message.error('Ошибка при загрузке автора');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id, form]);

type FormValues = {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription: string;
  description: string;
  removeAvatar: boolean;
};

type ApiErrorResponse = {
  response?: {
    data?: {
      errors?: Record<string, string[] | string>;
    };
  };
};

const handleSubmit = async (values: FormValues): Promise<void> => {
  if (!id) return;

  const formData = {
    ...values,
    avatar: avatarFile,
    removeAvatar: values.removeAvatar ? '1' : '0',
  };

  try {
    setSubmitting(true);
    await updateAuthor(id, formData);
    message.success('Автор обновлён');
    router.push('/authors');
  } catch (err: unknown) {
    const error = err as ApiErrorResponse;
    console.error(error);
    if (error?.response?.data?.errors) {
      const apiErrors = error.response.data.errors;
      form.setFields(
        Object.entries(apiErrors).map(([field, messages]) => ({
          name: field,
          errors: Array.isArray(messages) ? messages : [String(messages)],
        }))
      );
    } else {
      message.error('Произошла ошибка при обновлении автора');
    }
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return <Spin size="large" />;
  }

  if (!author) {
    return <div>Автор не найден</div>;
  }

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
        rules={[
            { required: true, message: 'Введите имя' },
            { max: 100, message: 'Не более 100 символов' }
        ]}
        >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Фамилия" 
        name="lastName" 
        rules={[
            { required: true, message: 'Введите фамилию' },
            { max: 100, message: 'Не более 100 символов' }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item 
        label="Отчество" 
        name="secondName" 
        rules={[
          { required: true, message: 'Введите отчество' },
          { max: 100, message: 'Не более 100 символов' }
        ]}
        >
        <Input />
      </Form.Item>

      <Form.Item
        label="Краткое описание"
        name="shortDescription"
        rules={[
          { required: true, message: 'Введите краткое описание' },
          { max: 255, message: 'Не более 255 символов' }
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Полное описание"
        name="description"
        rules={[
          { required: true, message: 'Введите полное описание' },
          { min: 10, message: 'Минимум 10 символов' },
        ]}
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
          showUploadList={true}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Удалить аватар"
        name="removeAvatar"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
