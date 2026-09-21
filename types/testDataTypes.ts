export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SearchData {
  keyword: string;
  productName: string;
  quantity: string;
}

export interface AddressData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  zip: string;
  phone: string;
  fax: string;
}

export interface CardData {
  type: string;
  holderName: string;
  number: string;
  expireMonth: string;
  expireYear: string;
  code: string;
}

export interface E2E01Data {
  register: UserData;
  search: SearchData;
  billingAddress: AddressData;
  shippingMethod: string;
  paymentMethod: string;
  card: CardData;
}