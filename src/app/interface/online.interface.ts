export interface ICheckout{
    details: string;
    phone: string;
    city: string;
}


export interface CheckoutSession {
  id: string;
  url: string;
}

export interface CheckoutResponse {
  status: string;
  session: CheckoutSession;
  message?: string; 
}
