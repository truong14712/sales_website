import { productType } from "./product";

export interface orderType {
  products: productType[];
  _id?: number | string;
  email: string;
  name: string;
  phoneNumber: number;
  deliveryAddress: string;
  status: string;
  payment: string;
  total: number | string;
}
