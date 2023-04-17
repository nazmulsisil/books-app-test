import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BOOKS_PER_PAGE } from "../constants";

export interface Book {
  book_author: string[];
  book_publication_city: string;
  book_publication_country: string;
  book_publication_year: string;
  book_pages: number;
  title: string;
  book_id: number;
  count: number;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: BOOKS_PER_PAGE,
  totalCount: 0,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (
      state,
      action: PayloadAction<{ books: Book[]; totalCount: number }>
    ) => {
      state.books = action.payload.books;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
      state.error = null;
    },
    fetchBooksError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksError,
  setCurrentPage,
  setItemsPerPage,
} = booksSlice.actions;

export default booksSlice.reducer;
