import AuthorDetail from "@/entities/author/types"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Upload, UploadFile } from "antd"
import Tag from '@/entities/tag/types';
import { RcFile } from "antd/es/upload";

interface PostFormFieldsProps{
    authors: AuthorDetail[];
    tags: Tag[];
    fileList: UploadFile<RcFile>[];
    handleUploadChange: ({ fileList }: {
        fileList: UploadFile[];
    }) => void;
    loading: boolean;
}

const PostFormFields = ({
    authors, 
    tags, 
    fileList, 
    handleUploadChange,
    loading,
}: PostFormFieldsProps) => {
    return (<>
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
                <Select.Option key={author.id} value={author.id}>
                {author.name} {author.lastName}
                </Select.Option>
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
                    <Select.Option key={tag.id} value={tag.id}>
                    {tag.name}
                    </Select.Option>
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
            <Form.Item 
                name="previewPicture"
                label="Превью картинка"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                rules={[{ required: true, message: 'Выберите файл' }]}
            >
                <Upload
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleUploadChange}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                </Upload>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" loading={loading}>
                Сохранить
              </Button>
            </Form.Item>
    </>)
}

export default PostFormFields;