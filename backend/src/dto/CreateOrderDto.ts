export interface CreateOrderDto {
  customerName: string;
  customerPhone?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}
