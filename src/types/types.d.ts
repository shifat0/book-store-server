export interface Authors {
  id: string;
  name: string;
  bio?: string;
  birthdate: Date;
}

export interface Books {
  id: string;
  title: string;
  description?: string;
  published_date: Date;
  author_id: string;
}

export interface IPagination {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
