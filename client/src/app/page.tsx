"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import BookGrid from "@/components/BookGrid";
import AddBook from "@/components/AddBook";
import { IBook } from "@/domain/entities";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState<IBook[] | null | undefined>([]);
  const router = useRouter();
  const handleSearchClick=()=>{

    router.push(`/search`);
  }
  return (
    <>
      <div>
        <div className="header w-full flex justify-center m-10">
          <h1 className="text-2xl font-bold">Book Collection</h1>
        </div>
        <div className="actions m-6 flex items-center justify-around">
          <AddBook books={books} setBooks={setBooks} />
          <SearchIcon onClick={handleSearchClick}/>
        </div>
        <BookGrid
          books={books}
          setBooks={setBooks}
          page={page}
          setTotalPages={setTotalPages}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
