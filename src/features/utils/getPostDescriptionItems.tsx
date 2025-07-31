import PostDetail from "@/entities/post/types";
import { DescriptionsProps } from "antd";
import { Image, Tag } from "antd";

export const getPostDescriptionItems = (
  post: PostDetail
): DescriptionsProps["items"] => [
  {
    key: "1",
    label: "ID",
    children: post.id,
  },
  {
    key: "2",
    label: "Заголовок",
    children: post.title,
  },
  {
    key: "3",
    label: "Код",
    children: post.code,
  },
  {
    key: "4",
    label: "Текст",
    children: post.text,
  },
  {
    key: "5",
    label: "Теги",
    children: post.tags.map((tag) => (
      <Tag key={tag.id} color="blue">
        {tag.name}
      </Tag>
    )),
  },
  {
    key: "6",
    label: "Изображение",
    children: post.previewPicture?.url ? (
      <Image width={200} src={post.previewPicture.url} alt={post.previewPicture.name} />
    ) : (
      "Нет изображения"
    ),
  },
  {
    key: "7",
    label: "Автор",
    children: post.author?.fullName || "Неизвестен",
  },
  {
    key: "8",
    label: "Аватар автора",
    children: post.author?.avatar?.url ? (
      <Image width={100} src={post.author.avatar.url} alt={post.author.avatar.name} />
    ) : (
      "Нет аватара"
    ),
  },
  {
    key: "9",
    label: "Создан",
    children: new Date(post.createdAt).toLocaleString(),
  },
  {
    key: "10",
    label: "Обновлён",
    children: new Date(post.updatedAt).toLocaleString(),
  },
];