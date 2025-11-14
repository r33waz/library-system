import { lazy } from "react";

const BooksComp = lazy(() => import("@/components/user/book/booksComp"));

function BooksPage() {
  return (
    <div className="">
      <BooksComp />
    </div>
  );
}

export default BooksPage;
