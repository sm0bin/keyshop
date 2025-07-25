export interface IProduct {
  _id: string;
  image: string;
  title: string;
  brand: string;
  quantity: number;
  price: number;
  rating: number;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: IProduct;
}
