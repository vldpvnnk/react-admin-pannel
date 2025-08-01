'use client';

import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { addAuthor } from '@/shared/api/authorsApi';
import AuthorsFormFields from './AuthorsFormFields';
import AuthorFormValues from "@/types"
import axios from 'axios';

export default function AddAuthorForm() {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: AuthorFormValues) => {
    try {
      setLoading(true);
      await addAuthor({
        ...values,
        avatar: avatarFile,
        removeAvatar: avatarFile ? "0" : "1",
      });
      message.success('Автор успешно добавлен');
      router.push('/authors');
    } catch (error) {
      console.error(error);
  
      if (
        axios.isAxiosError(error) && 
        error.response && 
        Array.isArray(error.response.data) &&
        error.response.data.length > 0 &&
        error.response.data[0].message
      ) {
        message.error(error.response.data[0].message);
      } else {
        message.error('Произошла ошибка при добавлении автора');
      }
    }  finally {
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
      <AuthorsFormFields 
        loading={loading} 
        setAvatarFile={setAvatarFile}
      />
    </Form>
  );
}
