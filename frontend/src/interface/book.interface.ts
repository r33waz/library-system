export interface IBookIntitialState {
  isLoading: boolean;
  isError: boolean;
  isLatestBookLoading: boolean;
  latestBookError: boolean;
  latestBook: ILatestBook[] | null;
  singleBook: IBook | null;
  isSingleBookLoading: boolean;
  singleBookError: boolean;
  books: IBooks[];
  isBooksLoading: boolean;
  booksError: boolean;
  totalPages: number;
}

export interface IBooks {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  author: string;
  totalCopies: number;
  availableCopies: number;
  genre: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  category: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  coverImage: {
    name: string;
    path: string;
  };
  library: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  page: number;
  limit: number;
  totalPages: number;
}

export interface ILatestBook {
  id: string;
  title: string;
  description: string;
  slug: string;
  author: string;
  coverImage: {
    name: string;
    path: string;
  };
}

export interface IBook {
  id: string;
  title: string;
  description: string;
  slug: string;
  author: string;
  coverColor: string;
  price: number;
  totalCopies: number;
  availableCopies: number;
  videoUrlNeplai: string;
  videoUrlEnglish: string;
  videoUrlHindi: string;
  summary: string;
  createdAt: string;
  genre: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  category: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  coverImage: {
    name: string;
    path: string;
  };
  library: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}
