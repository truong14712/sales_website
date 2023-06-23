import { Space, Table, Button } from "antd";
import { CategoriesType } from "../../../interface/categories";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
interface Props {
  categories: CategoriesType[];
  deleteCategory(id: number): void;
}
interface DataType {
  key: string | number;
  name: string;
}
const CategoryManagement = ({ categories, deleteCategory }: Props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name Categories",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => deleteCategory(record._id)}
          >
            Remove
          </Button>
          <Link to={`/admin/dashboard/categories/update/${record._id}`}>
            <Button type="primary" style={{ backgroundColor: "blue" }}>
              Update
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const dataSource = categories.map((value) => {
    return {
      key: value._id,
      ...value,
    };
  });

  return (
    <div className="container mx-auto py-2">
      <div className="font-normal text-[32px] my-2 ">Quản lý categories</div>
      <Link to={"/admin/dashboard/categories/add"}>
        <Button
          className="my-2"
          type="primary"
          style={{ color: "white", background: "green" }}
        >
          Add Categories
        </Button>
      </Link>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CategoryManagement;
