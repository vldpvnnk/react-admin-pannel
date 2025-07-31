import AuthorDetail from "@/entities/author/types";
import { DescriptionsProps } from "antd";
import { Image } from "antd";

export const getAuthorDescriptionItems = (
  author: AuthorDetail
): DescriptionsProps["items"] => [
  {
    key: "1",
    label: "ID",
    children: author.id,
  },
  {
    key: "2",
    label: "Имя",
    children: author.name,
  },
  {
    key: "3",
    label: "Фамилия",
    children: author.lastName,
  },
  {
    key: "4",
    label: "Отчество",
    children: author.secondName,
  },
    {
    key: "5",
    label: "Короткое описание",
    children: author.shortDescription,
  },
      {
    key: "6",
    label: "Полное описание",
    children: author.description,
  },
    {
    key: "7",
    label: "Аватар",
    children: author.avatar?.url ? (
      <Image width={200} src={author.avatar.url} alt={author.avatar.name} />
    ) : (
      "Нет изображения"
    ),
  },
  {
    key: "8",
    label: "Создан",
    children: new Date(author.createdAt).toLocaleString(),
  },
  {
    key: "9",
    label: "Обновлён",
    children: new Date(author.updatedAt).toLocaleString(),
  },
];