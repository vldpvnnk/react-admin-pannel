'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { useRouter } from 'next/navigation';
import { addTag } from '@/shared/api/tagApi';
import TagFormValues from "@/types/index"
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
    } catch (err) {
      console.error(err);
      message.error('Ошибка при добавлении тега');
    } finally {
      setLoading(false);
    }
  };

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
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
