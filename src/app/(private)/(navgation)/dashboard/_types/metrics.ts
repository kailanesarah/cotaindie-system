export interface GraphDataPoint {
  date: string;
  total: number;
  approved: number;
  profit: number;
}

export interface OrdersMetrics {
  total: number;
  approved: number;
  open: number;
}

export interface Metrics {
  orders: OrdersMetrics;
  amount: number;
  profit: number;
  data: GraphDataPoint[];
}
