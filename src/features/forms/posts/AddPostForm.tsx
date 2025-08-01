'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Tag from '@/entities/tag/types';
import AuthorDetail from '@/entities/author/types';
import { fetchAuthors } from '@/shared/api/authorsApi';
import { fetchTags } from '@/shared/api/tagApi';
import { addPost, AddPostPayload } from '@/shared/api/postApi';
import { useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload';

const { Option } = Select;

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
    }  catch (error) {
        console.error(error);
      }finally {
      setLoading(false);
    }
  };
  

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="code"
        label="Код"
        rules={[{ required: true, message: 'Введите код' }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true, message: 'Введите заголовок' }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="authorId"
        label="Автор"
        rules={[{ required: true, message: 'Выберите автора' }]}
      >
        <Select placeholder="Выберите автора">
          {authors.map((author) => (
            <Option key={author.id} value={author.id}>
              {author.name} {author.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="tagIds"
        label="Теги"
        rules={[{ required: true, message: 'Выберите хотя бы один тег' }]}
      >
        <Select mode="multiple" placeholder="Выберите теги">
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="text"
        label="Текст"
        rules={[{ required: true, message: 'Введите текст поста' }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item label="Превью картинка">
        <Upload
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleUploadChange}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Выбрать файл</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить пост
        </Button>
      </Form.Item>
    </Form>
  );
}
