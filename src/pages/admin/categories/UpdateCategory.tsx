import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CategoriesType } from "../../../interface/categories";
import { updateCategories } from "../../../api/categories";
import { toast } from "react-toastify";
interface Props {
  categories: CategoriesType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>;
}
const UpdateCategory = ({ categories, setCategories }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [category, setCategory] = useState<CategoriesType>();
  const [form] = Form.useForm();
  useEffect(() => {
    const currentCategory = categories.find(
      (category: CategoriesType) => category._id === id
    );
    setCategory(currentCategory);
  }, [categories, setCategories]);
  useEffect(() => {
    // khi biến category thay đổi thì sẽ chạy useEffect này
    setFields(); // gọi hàm setFields để set lại giá trị cho các input
  }, [category]);
  const setFields = () => {
    // hàm này để set lại giá trị cho các input
    form.setFieldsValue({
      // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
      _id: category?._id,
      name: category?.name,
    });
  };
  const onFinish = async (data: any) => {
    await updateCategories(data);
    const newData: CategoriesType[] = categories.map((item: CategoriesType) =>
      item._id == id ? data : item
    );
    setCategories(newData);
    toast.success("Cập nhật danh mục thành công");
    navigate("/admin/dashboard/categories");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container mx-auto my-4 p-2">
      <Form
        form={form}
        name="form_item_path"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label=""
          name="_id"
          style={{ display: "none" }} // ẩn input này đi
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name Category"
          rules={[
            { required: true, message: "Please input your name category!" },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ color: "white", background: "green" }}
        >
          Update Category
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategory;
