import { Button, Form, Input } from "antd";
import { CategoriesType } from "../../../interface/categories";
import { useNavigate } from "react-router";
interface Props {
  insertCategory(data: CategoriesType): void;
}
const AddCategory = ({ insertCategory }: Props) => {

  const navigate = useNavigate();

  const onFinish = (value: any) => {
    insertCategory(value);
    alert("Thêm thành danh mục thành công");
    navigate("/admin/dashboard/categories");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container py-4 mx-auto p-2">
      <Form
        name="form_item_path"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name Categories"
          name="name"
          rules={[
            { required: true, message: "Please input your name categories!" },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "green" }}
          >
            Add New Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
