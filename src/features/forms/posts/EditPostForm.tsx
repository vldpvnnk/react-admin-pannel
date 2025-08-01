'use client';

import { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload';
import Tag from '@/entities/tag/types';
import AuthorDetail from '@/entities/author/types';
import { fetchTags } from '@/shared/api/tagApi';
import { fetchAuthors } from '@/shared/api/authorsApi';
import { viewPost, updatePost, AddPostPayload } from '@/shared/api/postApi';
import PostDetail from '@/entities/post/types';
import PostFormFields from './PostFormFields';
import axios from 'axios';

export default function EditPostForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; 
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<AuthorDetail[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [post, setPost] = useState<PostDetail>()

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const postData = await viewPost(id);  
        setPost(postData)
        const [tagsData, authorsData] = await Promise.all([
          fetchTags(),
          fetchAuthors(),
        ]);
        setTags(tagsData);
        setAuthors(authorsData);
        if (postData.previewPicture?.url) {
          setFileList([
            {
              uid: '-1', 
              name: postData.previewPicture.name || 'preview.jpg', 
              status: 'done',
              url: postData.previewPicture?.url,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
        message.error('Ошибка при загрузке поста');
      }
    };
  
    fetchData();
  }, [id]);
  
  useEffect(()=> {
    if (post){
      form.setFieldsValue({
        code: post.code,
        title: post.title,
        authorId: post?.author?.id,
        tagIds: post.tags.map((tag) => Number(tag.id)),
        text: post.text,
      });
      if (post.previewPicture?.url){
        form.setFieldsValue({
          previewPicture: [
            {
              uid: '-1',
              name: post.previewPicture.name || 'preview.jpg',
              status: 'done',
              url: post.previewPicture.url,
            }
          ]
        });
      }
    }
  },[post, form])

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values: AddPostPayload) => {
    if (!id) return;

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
      await updatePost(id, payload);
      message.success('Пост успешно обновлён');
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
        message.error('Произошла ошибка при редактировании поста');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding: 24}}>
      <Button 
        onClick={() => router.push('/posts')} 
        style={{marginBottom: 24}}
      >
        Назад
      </Button>
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
      >
        <PostFormFields 
          authors={authors}
          tags={tags}
          fileList={fileList}
          handleUploadChange={handleUploadChange}
          loading={loading}
        />
      </Form>
    </div>

  );
}
