import React from "react";

interface Book {
  book_author: string[];
  book_publication_city: string;
  book_publication_country: string;
  book_publication_year: string;
  book_pages: number;
  title: string;
  book_id: number;
  count: number;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p>Author(s): {book.book_author.join(", ")}</p>
            <p>Publication City: {book.book_publication_city}</p>
            <p>Publication Country: {book.book_publication_country}</p>
            <p>Publication Year: {book.book_publication_year}</p>
            <p>Pages: {book.book_pages}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
