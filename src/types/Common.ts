export type ResponseList<T = unknown> = {
  limit: number;
  skip: number;
  total: number;
  products: T[];
};
