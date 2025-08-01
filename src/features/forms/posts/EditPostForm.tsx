'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload';

import Tag from '@/entities/tag/types';
import AuthorDetail from '@/entities/author/types';

import { fetchTags } from '@/shared/api/tagApi';
import { fetchAuthors } from '@/shared/api/authorsApi';
import { viewPost, updatePost, AddPostPayload } from '@/shared/api/postApi';

const { Option } = Select;

export default function EditPostForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; 
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<AuthorDetail[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const postData = await viewPost(id);
        // setPost(postData);
  
        const [tagsData, authorsData] = await Promise.all([
          fetchTags(),
          fetchAuthors(),
        ]);
        setTags(tagsData);
        setAuthors(authorsData);
  
        form.setFieldsValue({
          code: postData.code,
          title: postData.title,
          authorId: postData.author.id,
          tagIds: postData.tags.map((tag: Tag) => tag.id),
          text: postData.text,
        });
  
        if (postData.previewPictureUrl) {
          setFileList([
            {
              uid: '-1', 
              name: 'preview.jpg', 
              status: 'done',
              url: postData.previewPictureUrl,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
        message.error('Ошибка при загрузке поста');
      }
    };
  
    fetchData();
  }, [id, form]);
  
  

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values: AddPostPayload) => {
    if (!id) return;

    const file = fileList[0]?.originFileObj;
    const formData = new FormData();

    formData.append('code', values.code);
    formData.append('title', values.title);
    formData.append('authorId', values.authorId.toString());
    formData.append('text', values.text);

    values.tagIds.forEach((tagId: number) => {
      formData.append('tagIds[]', tagId.toString());
    });

    if (file) {
      formData.append('previewPicture', file);
    }

    try {
      setLoading(true);
      await updatePost(id, formData);
      message.success('Пост успешно обновлён');
      router.push('/posts');
    } catch (error) {
      console.error(error);
    } finally {
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
          listType="picture"
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
