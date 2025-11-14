export interface IInittialWishListState {
  isLoading: boolean;
  isError: boolean;
  wishList: IWishList[] | null;
}

export interface IWishList {
  userId: string;
  bookId: string;
  book: {
    id: string;
    title: string;
    description: string;
    slug: string;
    author: string;
    price: number;
    totalCopies: number;
    availableCopies: number;
    coverImage: {
      name: string;
      path: string;
    };
    genre: {
      id: string;
      name: string;
      slug: string;
    }[];
    category: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  library: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
  };
}

