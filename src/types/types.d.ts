export interface Authors {
  id: number;
  name: string;
  bio?: string;
  birthdate: Date;
}

export interface Books {
  id: number;
  title: string;
  description?: string;
  published_date: Date;
  author_id: string;
}

interface IResponse {
  success: boolean;
  message: string;
}

interface IResponseWithData<T> extends IResponse {
  data: T;
}

interface IPaginatedResponse<T> extends IResponseWithData<T> {
  pagination?: IPagination;
}

export interface IPagination {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface IAuthorRow {
  author_id: number;
  author_name: string;
  author_bio?: string;
  author_birthdate: Date;
  book_id?: number;
  book_title?: string;
  book_description?: string;
  book_published_date?: Date;
}
export interface IAuthorWithBooks {
  id: number;
  name: string;
  bio?: string;
  birthdate: Date;
  books: Array<Partial<Omit<Books, 'author_id'>>>;
}
