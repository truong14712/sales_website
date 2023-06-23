export interface productType {
  _id: number | string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity?: number | null;
  __v: number;
  categoryId: string;
}
