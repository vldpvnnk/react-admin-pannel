'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, message, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { viewAuthor, updateAuthor } from '@/shared/api/authorsApi';
import AuthorDetail from '@/entities/author/types';
import AuthorsFormFields from './AuthorsFormFields';
import axios from 'axios';
import AuthorFormValues from "@/types"

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
      } catch (error) {
        message.error('Ошибка при загрузке автора');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  useEffect(() => {
    if (author){
      form.setFieldsValue({
        name: author.name,
        lastName: author.lastName,
        secondName: author.secondName,
        shortDescription: author.shortDescription,
        description: author.description,
        removeAvatar: false,
      });
    }
  },[author, form])

  const handleSubmit = async (values: AuthorFormValues): Promise<void> => {
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
        message.error('Произошла ошибка при редактировании автора');
      }
    }  finally {
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
    <div style={{padding: 24}}>
      <Button style={{marginBottom: 24}} onClick={() => router.push("/authors")}>Назад</Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          removeAvatar: false,
        }}
      >
        <AuthorsFormFields 
          loading={submitting} 
          setAvatarFile={setAvatarFile}
        />
      </Form>
    </div>
  );
}
