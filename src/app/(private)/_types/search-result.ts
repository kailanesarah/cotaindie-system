export interface SearchResult<T> {
  items: T[];
  totalPages: number;
  page: number;
}
