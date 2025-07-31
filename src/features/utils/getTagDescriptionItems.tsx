import TagDetail from "@/entities/tag/types";
import { DescriptionsProps } from "antd";

export const getTagDescriptionItems = (
  tag: TagDetail
): DescriptionsProps["items"] => [
  {
    key: "1",
    label: "ID",
    children: tag.id,
  },
  {
    key: "2",
    label: "Название",
    children: tag.name,
  },
  {
    key: "3",
    label: "Код",
    children: tag.code,
  },
    {
    key: "4",
    label: "Обновлен",
    children: tag.updatedAt
  },
  {
    key: "5",
    label: "Создан",
    children: tag.createdAt
  },
];