'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { updateTag, viewTag } from '@/shared/api/tagApi';
import TagDetail from '@/entities/tag/types';
import ApiErrorResponse from '@/types';
import TagFormValues from "@/types/index"

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
            form.setFieldsValue({
                name: data.name,
                code: data.code,
                sort: Number(data.sort)
            })
            } catch (error) {
            console.error('Ошибка при получении тега:', error);
            } finally {
            setLoading(false);
            }
        };
        fetchPost();
    }, [id, form]);

    const handleSubmit = async (values: TagFormValues): Promise<void> => {
        if (!id) return;
      
        const formData = values;
      
        try {
          setSubmitting(true);
          await updateTag(id, formData);
          message.success('Тег обновлён');
          router.push('/tags');
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
            message.error('Произошла ошибка при обновлении тега');
          }
        } finally {
          setSubmitting(false);
        }
      };
      if (loading) {
        return <Spin size="large" />;
      }
    
      if (!tag) return <div>Тег не найден...</div>
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Название"
        name="name"
        rules={[{ required: true, message: 'Введите название' }]}
        
      >
        <Input autoComplete='off'/>
      </Form.Item>
      <Form.Item
        label="Код"
        name="code"
        rules={[{ required: true, message: 'Введите код' }]}
        
      >
        <Input autoComplete='off'/>
      </Form.Item>
      <Form.Item
        label="Сортировка"
        name="sort"
        rules={[{ required: true, message: 'Введите сортировку (число)' }]}
        
      >
        <Input autoComplete='off'/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
