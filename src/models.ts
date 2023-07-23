export interface Product {
  id: string;
  brand: string;
  name: string;
  productImage?: string;
  price: string | number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
}

export interface Inbox {
  messages: any;
}

export interface InboxMessage {
  id: string;
  preview?: string;
  seen?: boolean;
  from: User;
  sent: Date | string;
  unread: number;
}
