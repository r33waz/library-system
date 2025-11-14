export interface ILibraryInitialState {
  isLoading: boolean;
  isError: boolean;
  library: ILibraryData | null;
  libraryStats: ILibraryStats | null;
  libraryStatsLoading: boolean;
  libraryBorrowStats: ILibraryBorrowStats[] | null;
}

export interface ILibraryData {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  status: string;
  blocked: string;
  street: string;
  city: string;
  state: string;
  role: string;
  auth: {
    email: string;
  };
  profilepic: {
    id: string;
    name: string;
    path: string;
  };
  media: {
    id: string;
    path: string;
    mediaType: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ILibraryInterface {
  name: string;
  description: string;
  phoneNumber: string;
  media?: string;
  email: string;
  street: string;
  city: string;
  state: string;
}

export interface ILibraryStats {
  totalBooks: number;
  totalBorrowed: number;
  totalPending: number;
  totalActiveBorrow: number;
  totalOverdue: number;
}

export interface ILibraryBorrowStats{
  date: string;
  count: number;
}