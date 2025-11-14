import BreadCrumb from "@/components/common/breadCrumb";
import BorrowComponent from "@/components/user/BorrowBook/borrowBookComp";

const BorrowHistory = () => {
  return (
    <>
      <BreadCrumb
        items={[
          { label: "Home", href: "/e-book/home" },
          { label: "Borrow History" },
        ]}
      />
      <BorrowComponent />
    </>
  );
};

export default BorrowHistory;
