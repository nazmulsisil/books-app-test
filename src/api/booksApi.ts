import { API_BASE_URL, BOOKS_PER_PAGE } from "../constants";
import { Book } from "../redux/booksSlice";

interface FetchBooksOptions {
  page?: number;
  itemsPerPage?: number;
  filters?: Array<{ type: string; values: string[] }>;
}

export interface ApiResponse {
  books: Book[];
  count: number;
}

export async function fetchBooks({
  page = 1,
  itemsPerPage = 20,
  filters = [],
}: FetchBooksOptions): Promise<{ books: Book[]; totalCount: number }> {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      itemsPerPage,
      filters,
    }),
  });

  if (!response.ok) {
    throw new Error("Error fetching books.");
  }

  const data: ApiResponse = await response.json();
  return { books: data.books, totalCount: data.count };
}

interface SearchBooksParams {
  page?: number;
  itemsPerPage?: number;
  searchTerm?: string;
}

export const searchBooks = async ({
  page = 1,
  itemsPerPage = BOOKS_PER_PAGE,
  searchTerm = "",
}: SearchBooksParams) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      itemsPerPage,
      filters: [{ type: "all", values: [searchTerm] }],
    }),
  });

  const data: ApiResponse = await response.json();

  return data;
};
