import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSingleBill } from "@/rtk/thunk/bill.thunks";
import formatPrice from "@/utils/priceFormater";
import { BillPaymentBadge } from "@/utils/statusBadge";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  Download,
  ReceiptIcon,
  User,
} from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

function Bill({ billId }: { billId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { singleBill } = useAppSelector((state) => state.bill);
  const billRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (billId) {
      dispatch(getSingleBill(billId));
    }
  }, [dispatch, billId]);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full bg-blue-600 text-white flex items-center gap-1 hover:bg-blue-700">
          <ReceiptIcon className="h-4 w-4" />
          Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md dark:bg-dark-primary">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReceiptIcon className="h-5 w-5" />
              Bill Receipt
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Printable Content */}
        <div ref={billRef} className="printable">
          <Card className=" dark:bg-dark-primary">
            <CardContent className="">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Book
                    </p>
                    <p className="font-semibold">{singleBill?.book?.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {singleBill?.book?.author}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">
                        {moment(singleBill?.startDate).format("YYYY-MM-DD")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        End Date
                      </p>
                      <p className="font-medium">
                        {moment(singleBill?.endDate).format("YYYY-MM-DD")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Duration
                      </p>
                      <p className="font-medium">
                        {singleBill?.daysBorrowed} days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <BillPaymentBadge status={singleBill?.status ?? ""} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <p className="text-sm">Price per day</p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(singleBill?.pricePerDay ?? "")}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm pl-6">
                      Subtotal ({singleBill?.daysBorrowed} days)
                    </p>
                    <p className="font-medium">
                      {formatPrice(singleBill?.totalAmount ?? "")}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-red-600 bg-red-50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <div>
                        <p className="text-sm font-medium">
                          Late Return Penalty
                        </p>
                        <p className="text-xs">
                          After due date includes additional charges
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatPrice(singleBill?.penaltyAmount ?? "")}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Grand Total</p>
                    <p className="font-bold text-lg">
                      {formatPrice(singleBill?.grandTotal ?? "")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <p>Bill ID: {singleBill?.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            className="bg-error-red text-white"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          <Button variant="outline">
            Download <Download className="h-4 w-4 " />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Bill;
