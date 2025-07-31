import AuthorDetail from "@/entities/author/types";
import { Post } from "@/shared/api/postApi";
import { Avatar, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export const postsColumns: ColumnsType<Post> = [
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
    }
];

export const tagsColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Сортировка',
      dataIndex: 'sort',
      key: 'sort',
      width: 100,
    },
    {
      title: 'Дата обновления',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
];

export const authorsColumns: ColumnsType<AuthorDetail> = [
      {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
        {
      title: 'Аватар',
      dataIndex: ['avatar', 'url'],
      key: 'avatar',
      render: (url) => <Avatar shape="square" size={64} src={url} />,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Отчество',
      dataIndex: 'secondName',
      key: 'lastName',
    },
    {
      title: 'Дата обновления',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
]