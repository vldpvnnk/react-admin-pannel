'use client';

import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { addTag } from '@/shared/api/tagApi';
import TagFormValues from "@/types/index"
import TagsFormFields from './TagsFormFileds';
import axios from 'axios';
export default function AddTagForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: TagFormValues) => {
    try {
      setLoading(true);
      await addTag(values);
      message.success('Тег успешно добавлен');
      router.push('/tags');
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
        message.error('Произошла ошибка при добавлении тега');
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
    >
      <TagsFormFields loading={loading}/>
    </Form>
  );
}
