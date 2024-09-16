import { IBook, IFetchBookRes } from "@/domain/entities";
import { fetchBooks } from "@/services/bookService";
import Grid from "@mui/material/Grid2";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import BookCard from "./BookCard";
import NothingHere from "./NothingHere";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
interface BookGridProps {
  page: number;
  books: IBook[] | null | undefined;
  setBooks: Dispatch<SetStateAction<IBook[] | null | undefined>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const BookGrid: FC<BookGridProps> = ({
  page,
  setTotalPages,
  books,
  setBooks,
}) => {
  useEffect(() => {
    const getBooks = async () => {
      const data: IFetchBookRes | null = await fetchBooks(page);
      console.log(data);

      setBooks(data?.data.books);
      setTotalPages(data?.data.totalPages || 1);
    };
    getBooks();
  }, [page, setTotalPages]);
  return (
    <>
      {/* {books && books?.length > 0 ? (
        books?.map((book) => (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={{ xs: 2, sm: 6, md: 4 }} key={book._id}>
              <Item>
                <BookCard book={book} />
              </Item>
            </Grid>
          </Grid>
        ))
      ) : (
        <NothingHere />
      )} */}
      {books && books?.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {books?.map((book, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Item>
                <BookCard book={book} />
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NothingHere />
      )}
    </>
  );
};

export default BookGrid;
