"use client"
import { useEffect, useState } from "react";
import { searchBooks } from "@/services/bookService";
import { TextField, Button, styled, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ElasticsearchHit } from "@/domain/entities";
import NothingHere from "@/components/NothingHere";
import SearchBookCard from "@/components/SearchBookCard";
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
export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<ElasticsearchHit[] | null>([]);

  const handleSearch = async () => {
    const data:ElasticsearchHit[] = await searchBooks(query);
    setBooks(data);
  };
  useEffect(()=>{
    setTimeout(() => {
        handleSearch()
    }, 300);
  },[ query])

  return (
    <>
      <div>
      <div className="header w-full flex justify-center m-10">
          <h1 className="text-2xl font-bold">Search Books</h1>
        </div>
      <div className="flex items-center gap-3">
      <TextField
        label="Search by title, author, or description"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      </div>

      {books && books?.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {books?.map((book, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Item>
                <SearchBookCard book={book} />
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NothingHere />
      )}
      </div>
    </>
  );
}
