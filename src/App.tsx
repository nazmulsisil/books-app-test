import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksError,
  setCurrentPage,
} from "./redux/booksSlice";
import { RootState } from "./redux/store";
import { fetchBooks, searchBooks } from "./api/booksApi";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import SearchField from "./components/SearchField";
import Loading from "./components/Loading";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { books, loading, error, currentPage, itemsPerPage, totalCount } =
    useSelector((state: RootState) => state.books);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    const fetchBooksData = async () => {
      dispatch(fetchBooksStart());

      try {
        const data = await fetchBooks({ page: currentPage, itemsPerPage });
        dispatch(
          fetchBooksSuccess({ books: data.books, totalCount: data.totalCount })
        );
      } catch (err) {
        dispatch(fetchBooksError("Error fetching books data."));
      }
    };

    const query = new URLSearchParams(window.location.search);
    const pageParam = query.get("page");
    const pageNum = pageParam ? parseInt(pageParam, 10) : 1;

    if (pageNum !== currentPage) {
      dispatch(setCurrentPage(pageNum));
    } else {
      fetchBooksData();
    }
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    window.history.pushState({}, "", url.toString());
  };

  const handleSearch = async (searchTerm: string) => {
    dispatch(fetchBooksStart());

    try {
      const data = await searchBooks({ searchTerm });
      dispatch(
        fetchBooksSuccess({ books: data.books, totalCount: data.count })
      );
    } catch (err) {
      dispatch(fetchBooksError("Error searching for books."));
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Book List
        </Typography>
        <SearchField onSearch={handleSearch} />
        {loading ? (
          <Loading />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <>
            <BookList books={books} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;
