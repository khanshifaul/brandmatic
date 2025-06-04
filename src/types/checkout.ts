export interface CheckoutFormData {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
  termsAccepted: boolean;
} 