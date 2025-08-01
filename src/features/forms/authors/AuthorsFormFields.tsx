import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch, Upload } from "antd";
import { RcFile } from "antd/es/upload";

interface AuthorsFormFieldsProps {
    loading: boolean;
    setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>
}

const AuthorsFormFields = ({loading, setAvatarFile}: AuthorsFormFieldsProps) => {
    return (<>
            <Form.Item 
          label="Имя" 
          name="name" 
          rules={[
              { required: true, message: 'Введите имя' },
              { max: 100, message: 'Не более 100 символов' }
          ]}
          >
          <Input />
        </Form.Item>

        <Form.Item 
          label="Фамилия" 
          name="lastName" 
          rules={[ 
              { required: true, message: 'Введите фамилию' },
              { max: 100, message: 'Не более 100 символов' }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item 
          label="Отчество" 
          name="secondName" 
          rules={[
            { required: true, message: 'Введите отчество' },
            { max: 100, message: 'Не более 100 символов' }
          ]}
          >
          <Input />
        </Form.Item>

        <Form.Item
          label="Краткое описание"
          name="shortDescription"
          rules={[
            { required: true, message: 'Введите краткое описание' },
            { max: 255, message: 'Не более 255 символов' }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Полное описание"
          name="description"
          rules={[
            { required: true, message: 'Введите полное описание' },
            { min: 10, message: 'Минимум 10 символов' },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Аватар">
          <Upload
            beforeUpload={(file: RcFile) => {
              setAvatarFile(file);
              return false;
            }}
            onRemove={() => setAvatarFile(null)}
            maxCount={1}
            showUploadList={true}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Удалить аватар"
          name="removeAvatar"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
    
    </>)
}

export default AuthorsFormFields;