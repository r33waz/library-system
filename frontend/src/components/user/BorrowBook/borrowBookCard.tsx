import { IBorrowBook } from "@/interface/borrow.interface";
import formatPrice from "@/utils/priceFormater";
import { StatusBadge } from "@/utils/statusBadge";
import { Book, ClockIcon } from "lucide-react";
import moment from "moment";
import BorrowOrUpdateButton from "./borrowButton";

const BorrowBookCard = ({ IBorrowBooks }: { IBorrowBooks: IBorrowBook }) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow  mt-6">
      <div className="flex flex-col h-full">
        {/* Card Header with Status */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm line-clamp-1">
              {IBorrowBooks.book.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {IBorrowBooks.book.author}
            </p>
          </div>
          <StatusBadge status={IBorrowBooks.status} />
        </div>

        {/* Card Content */}
        <div className="flex flex-col sm:flex-row p-4 gap-4">
          {/* Book Cover */}
          <div className="flex-shrink-0 flex items-center justify-center">
            {IBorrowBooks?.book?.coverImage ? (
              <img
                src={"/placeholder.svg"}
                alt={IBorrowBooks.book.title}
                className="w-24 h-40 object-cover rounded-md shadow-sm"
              />
            ) : (
              <div className="w-32 h-50 flex items-center justify-center bg-muted rounded-md shadow-sm border">
                <Book className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-3">
            {IBorrowBooks.book.description && (
              <div className="text-sm">
                <p className="line-clamp-2 text-muted-foreground">
                  {IBorrowBooks.book.description.length > 20
                    ? IBorrowBooks.book.description.slice(0, 20) + "..."
                    : IBorrowBooks.book.description}
                </p>
              </div>
            )}

            <div className="flex justify-between flex-col">
              <div className="flex flex-col ">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-sm font-medium">
                  {formatPrice(IBorrowBooks.book.price)} / day
                </p>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <div className="flex flex-col ">
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm">
                    {moment(IBorrowBooks.startDate).format("DD-MM-YYYY")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground ">End Date</p>
                  <p className="text-sm">
                    {moment(IBorrowBooks.startDate).format("DD-MM-YYYY")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground ">Total Days</p>
                  <p className="text-sm">
                    {moment
                      .duration(
                        moment(IBorrowBooks.endDate).diff(
                          moment(IBorrowBooks.startDate)
                        )
                      )
                      .asDays()}{" "}
                    days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-auto p-3 bg-muted/30 text-xs border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span className="text-muted-foreground">
                {moment(IBorrowBooks?.createdAt).fromNow()}
              </span>
            </div>
            <div className="text-muted-foreground">
              <BorrowOrUpdateButton
                mode="borrow"
                bookId={IBorrowBooks.bookId}
                libraryId={IBorrowBooks.library?.id}
                defaultStartDate={IBorrowBooks.startDate}
                defaultEndDate={IBorrowBooks.endDate}
                status={IBorrowBooks.status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookCard;
