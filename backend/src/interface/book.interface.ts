export interface IBook {
    title: string;
    author: string;
    coverColor?: string;
    description: string;
    totalCopies: number;
    availableCopies: number;
    videoUrl?: string;
    summary?: string;
    library: string;
    genre: string;
    media?: {
      mediaType: string;
      url: string;
    }[];
  }
  