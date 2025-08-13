export interface IProduct {
  _id: string;
  image: string;
  title: string;
  brand: string;
  quantity: number;
  price: number;
  rating: number;
  description: string;
}

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: IProduct;
}

export interface IShippingAddress {
  country: string;
  zipCode: string;
  district: string;
  thana: string;
  address: string;
  phone: string;
}
