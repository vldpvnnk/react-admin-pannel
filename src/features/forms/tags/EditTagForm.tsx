'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, message, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { updateTag, viewTag } from '@/shared/api/tagApi';
import TagDetail from '@/entities/tag/types';
import TagFormValues from "@/types/index"
import TagsFormFields from './TagsFormFileds';
import axios from 'axios';

export default function EditTagForm() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<TagDetail | null>(null);
  const params = useParams();
  const id = params.id as string; 

  const router = useRouter();
    useEffect(() => {
        const fetchPost = async () => {
            try {
            const data = await viewTag(id);
            setTag(data);
            } catch (error) {
            console.error('Ошибка при получении тега:', error);
            } finally {
            setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
      if (tag) {
        form.setFieldsValue({
          name: tag.name,
          code: tag.code,
          sort: Number(tag.sort)
        });
      }
    }, [tag, form]);

    const handleSubmit = async (values: TagFormValues): Promise<void> => {
        if (!id) return;
      
        const formData = values;
      
        try {
          setSubmitting(true);
          await updateTag(id, formData);
          message.success('Тег обновлён');
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
            message.error('Произошла ошибка при редактировании тега');
          }
        }  finally {
          setSubmitting(false);
        }
      };
      if (loading) {
        return <Spin size="large" />;
      }
    
      if (!tag) return <div>Тег не найден...</div>
  return (
    <div style={{padding: 24}}>
      <Button style={{marginBottom: 24}} onClick={() => router.push("/tags")}>Назад</Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <TagsFormFields loading={submitting}/>
      </Form>
    </div>
  );
}
