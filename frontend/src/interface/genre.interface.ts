export interface IGenreIntitialState {
  isLoading: boolean;
  error: boolean;
  genre: IGenreData[] | null;
  libraryBookGenreStats: ILibraryBookGenreStats[] | null;
  libraryBookStatsLoading: boolean;
}

export interface IGenreData {
  id: string;
  name: string;
  slug: string;
  genrePic: {
    id: string;
    path: string;
    mediaType: string;
    type: string;
  };
}

export interface ILibraryBookGenreStats {
  genre: string;
  count: string;
}
