const envConfig = {
  baseurl: import.meta.env.VITE_BACKEND_URL,
};

const endPoints = {
  register: `api/v1/auth/signup`,
  login: `api/v1/auth/login`,
  logout: `api/v1/auth/logout`,
  authorize: `api/v1/auth/authorize`,
  me: `api/v1/auth/me`,
  csrf: `api/v1/auth/csrf-token`,

  // for genre
  getAllGenre: `api/v1/genre/getAll`,

  // for category
  getAllCategory: `api/v1/category/getAll`,

  // upload file
  upload: `api/v1/media/uploads`,

  // for book
  getLatestBook: `api/v1/book/latest-book`,
  getSingleBook: (id: string) => `/api/v1/book/${id}`,
  getBookList: (payload: {
    search?: string;
    page?: number;
    genre?: string;
    category?: string;
    library?: string;
    limit?: number;
  }) => {
    const params = new URLSearchParams();

    if (payload.search) params.append("search", payload.search);
    if (payload.page) params.append("page", payload.page.toString());
    if (payload.genre) params.append("genre", payload.genre);
    if (payload.category) params.append("category", payload.category);
    if (payload.library) params.append("library", payload.library);
    if (payload.limit) params.append("limit", payload.limit.toString());

    return `api/v1/book/getAll-book?${params.toString()}`;
  },

  getBooksByLibrary: (payload: {
    id: string;
    search?: string;
    page?: number;
    genre?: string;
    category?: string;
  }) => {
    const params = new URLSearchParams();
    if (payload.id) params.append("id", payload.id);
    if (payload.search) params.append("search", payload.search);
    if (payload.page) params.append("page", payload.page.toString());
    if (payload.genre) params.append("genre", payload.genre);
    if (payload.category) params.append("category", payload.category);
    return `api/v1/book/library/${payload.id}?${params.toString()}`;
  },

  // for library
  getAllLibrary: `api/v1/library/getAll-library`,
  getSingleLibrary: (id: string) => `api/v1/library/${id}`,
  createLibrary: `api/v1/library/create-library`,
  updateLibrary: (id: string) => `api/v1/library/update-library/${id}`,
  deleteLibrary: (id: string) => `api/v1/library/delete-library/${id}`,
  getLibraryStats: (payload: { startDate?: string; endDate?: string }) => {
    const params = new URLSearchParams();
    if (payload.startDate) params.append("fromDate", payload.startDate);
    if (payload.endDate) params.append("toDate", payload.endDate);
    return `api/v1/library-dashboard/stats?${params.toString()}`;
  },

  getLibraryBorrowStats: `api/v1/library-dashboard/borrower-stats`,
  //for library employee
  getSingleLibraryEmp: (id: string) => `api/v1/libraryEmp/${id}`,

  // wishlist
  toggleWishList: "/api/v1/wishlist/add",
  getWishListById: (id: string) => `/api/v1/wishlist/${id}`,

  // borrow book
  borrowRequest: "/api/v1/borrow/request",
  getAllBorrowRequest: (payload: {
    search?: string;
    page?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams();

    if (payload.search) params.append("search", payload.search);
    if (payload.page) params.append("page", payload.page.toString());
    if (payload.startDate) params.append("startDate", payload.startDate);
    if (payload.endDate) params.append("endDate", payload.endDate);

    return `api/v1/borrow/user-books?${params.toString()}`;
  },

  // bills
  getAllBills: "/api/v1/bill/getAll-bill",
  getSingleBill: (id: string) => `/api/v1/bill/${id}`,
  createBill: "/api/v1/bill/create-bill",
  updateBill: (id: string) => `/api/v1/bill/update-bill/${id}`,
  deleteBill: (id: string) => `/api/v1/bill/delete-bill/${id}`,

  // dashboard
  getLibraryBookGenreStats: `api/v1/library-dashboard/genre-distribution`,
  getLibraryBookCategoryStats: `api/v1/library-dashboard/category-distribution`,
};
export { endPoints, envConfig };
