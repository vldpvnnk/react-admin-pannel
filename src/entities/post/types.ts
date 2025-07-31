export default interface PostDetail {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture?: {
    id: number;
    name: string;
    url: string;
  };
  author?: {
    id: number;
    fullName: string;
    avatar?: {
      id: number;
      name: string;
      url: string;
    };
  };
  tags: {
    id: number;
    name: string;
    code: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
