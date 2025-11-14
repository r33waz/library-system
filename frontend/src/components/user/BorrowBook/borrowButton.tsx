import { ButtonLoading } from "@/components/common/loading";
import { ErrorToast } from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BLOCK_STATUS, BORROWER_STATUS, SIGNUPSTATUS } from "@/data/enum";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { borrowBook } from "@/rtk/thunk/borrow.thunk";
import { Download, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  mode: "borrow" | "update";
  bookId: string;
  libraryId: string;
  avilabelCopies?: number;
  defaultStartDate?: string;
  defaultEndDate?: string;
  className?: string;
  status?: string;
};

const BorrowOrUpdateButton = ({
  mode,
  bookId,
  libraryId,
  avilabelCopies = 1,
  defaultStartDate = "",
  defaultEndDate = "",
  className,
  status,
}: Props) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const dispatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.borrowBook);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
  }, [defaultStartDate, defaultEndDate]);

  const handleOpen = () => {
    const user = userDeatails?.user;

    if (!user) {
      ErrorToast("Please login first");
      return;
    }

    if (
      user.status === SIGNUPSTATUS.PENDING ||
      user.status === SIGNUPSTATUS.REJECTED
    ) {
      ErrorToast("Verify your account first.");
      return;
    }

    if (user.blocked === BLOCK_STATUS.BLOCKED) {
      ErrorToast("Your account is blocked.");
      return;
    }

    setOpen(true);
  };

  const handleConfirm = () => {
    if (mode === "borrow") {
      dispatch(
        borrowBook({
          bookId,
          libraryId,
          startDate,
          endDate,
        })
      );
      setStartDate("");
      setEndDate("");
    } else if (mode === "update") {
      console.log("update", startDate, endDate);
    }

    setOpen(false);
  };

  const isDisabled = !startDate || !endDate;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        disabled={
          (mode === "borrow" && avilabelCopies <= 0) ||
          status === BORROWER_STATUS.BORROWED
        }
        onClick={handleOpen}
        aria-label={mode === "borrow" ? "Borrow Book" : "Update Borrow"}
        className={`${
          mode === "borrow"
            ? avilabelCopies <= 0
              ? "bg-error-red"
              : "bg-secondary-primary"
            : "bg-secondary-primary"
        } text-white text-sm flex items-center gap-1 h-9 px-4 w-full ${className}`}
      >
        {mode === "borrow" ? (
          <Download className="w-4 h-4" />
        ) : (
          <Pencil className="w-4 h-4" />
        )}
        {mode === "borrow"
          ? avilabelCopies > 0
            ? "Borrow"
            : "Out of Stock"
          : "Update"}
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {mode === "borrow" ? "Borrow Book" : "Update Borrow Period"}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Select the date range you'd like to {mode} this book for.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full justify-between items-center gap-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isDisabled}
            className="bg-secondary-primary text-white"
          >
            {isLoading ? <ButtonLoading /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowOrUpdateButton;
