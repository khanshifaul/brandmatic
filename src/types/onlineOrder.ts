export interface OnlineOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface OnlineOrderResponse {
  orderId: string;
  status: string;
  message: string;
} 