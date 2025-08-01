'use client';

import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import Tag from '@/entities/tag/types';
import AuthorDetail from '@/entities/author/types';
import { fetchAuthors } from '@/shared/api/authorsApi';
import { fetchTags } from '@/shared/api/tagApi';
import { addPost, AddPostPayload } from '@/shared/api/postApi';
import { useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload';
import PostFormFields from './PostFormFields';
import axios from 'axios';

export default function AddPostForm() {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<AuthorDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTags().then(setTags);
    fetchAuthors().then(setAuthors);
  }, []);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };
  const handleSubmit = async (values: AddPostPayload) => {
    const file = fileList[0]?.originFileObj;
    const payload: AddPostPayload = {
      code: values.code,
      title: values.title,
      authorId: values.authorId,
      tagIds: values.tagIds,
      text: values.text,
      previewPicture: file,
    };
  
    try {
      setLoading(true);
      await addPost(payload);
      message.success('Пост успешно добавлен');
      router.push('/posts');
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
        message.error('Произошла ошибка при добавлении поста');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <PostFormFields
        authors={authors}
        tags={tags}
        fileList={fileList}
        handleUploadChange={handleUploadChange}
        loading={loading}
      />
    </Form>
  );
}
