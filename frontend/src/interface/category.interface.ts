export interface ICategoryIntitialState {
  isLoading: boolean;
  isError: boolean;
  categories: ICategoryData[] | null;
  libraryBookCategoryStats: ILibraryBookCategoryStats[] | null;
  libraryBookCategoryStatsLoading: boolean;
}

export interface ICategoryData {
  id: string;
  name: string;
  slug: string;
}

export interface ILibraryBookCategoryStats {
  category: string;
  count: string;
}
