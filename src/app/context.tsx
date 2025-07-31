import { Post } from "@/shared/api/postApi";
import { Avatar, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export   const columns: ColumnsType<Post> = [
    {
      title: 'Превью',
      dataIndex: ['previewPicture', 'url'],
      key: 'preview',
      render: (url) => <Avatar shape="square" size={64} src={url} />,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Автор',
      dataIndex: 'authorName',
      key: 'authorName',
    },
    {
      title: 'Теги',
      dataIndex: 'tagNames',
      key: 'tagNames',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Обновлён',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '—',
    },
    {
        title: 'Действия',
        key: 'actions',
    }
  ];