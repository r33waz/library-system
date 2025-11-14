export interface IBorrowBookState {
  isLoading: boolean;
  isError: boolean;
  borrowBook: IBorrowBook[] ;
  totalPages: number;
}

export interface IBorrowBookData {
  bookId: string;
  userId: string;
}

export interface IBorrowBook {
  bookId: string;
  startDate: string;
  endDate: string;
  status: string;
  book: {
    id: string;
    title: string;
    description: string;
    author: string;
    coverImage: {
      name: string;
      path: string;
    };
    price: number;
  };
  library: {
    id: string;
    name: string;
  };

  bill: {
    id: string;
  };


  createdAt: string;
  updatedAt: string;

  page: number;
  limit: number;
  totalPages: number;
}
