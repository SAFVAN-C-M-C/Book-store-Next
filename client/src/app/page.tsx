"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import BookGrid from "@/components/BookGrid";
import AddBook from "@/components/AddBook";
import { IBook } from "@/domain/entities";

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState<IBook[] | null | undefined>([]);
  return (
    <>
      <div>
        <div className="header w-full flex justify-center m-10">
        <h1 className="text-2xl font-bold">Book Collection</h1>
        </div>
        <div className="actions m-6">
          <AddBook books={books} setBooks={setBooks} />
        </div>
        <BookGrid books={books} setBooks={setBooks} page={page} setTotalPages={setTotalPages}/>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
