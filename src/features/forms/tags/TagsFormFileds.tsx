import { Button, Form, Input, InputNumber } from "antd"

interface TagsFormFieldsProps{
    loading: boolean
}

const TagsFormFields = ({loading}: TagsFormFieldsProps) => {
    return (<>
            <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
          
        >
          <Input autoComplete='off'/>
        </Form.Item>
        <Form.Item
          label="Код"
          name="code"
          rules={[{ required: true, message: 'Введите код' }]}
          
        >
          <Input autoComplete='off'/>
        </Form.Item>
        <Form.Item
          label="Сортировка"
          name="sort"
          rules={[{ required: true, message: 'Введите сортировку (число)' }]}
          
        >
          <InputNumber style={{width: '100%'}} autoComplete='off'/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
    </>)
}

export default TagsFormFields;