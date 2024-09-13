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

export interface IBookRow {
  id: string;
  title: string;
  description?: string;
  published_date: Date;
}

export interface IAuthorRow {
  author_id: string;
  author_name: string;
  author_bio?: string;
  author_birthdate: Date;
  book_id?: string;
  book_title?: string;
  book_description?: string;
  book_published_date?: Date;
}

// Accumulator type (authors with books)
export interface IAuthorWithBooks {
  id: string;
  name: string;
  bio?: string;
  birthdate: Date;
  books: Array<Partial<Omit<Books, 'author_id'>>>;
}
