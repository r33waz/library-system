export interface InititalBillState {
  isloading: boolean;
  error: boolean
  bills: [IBill] | [];
  singleBill: IBill | null;
}

export interface IBill {
  id: string;
  lastActivityDate: string; 
  startDate: string; 
  endDate: string; 
  daysBorrowed: number;
  pricePerDay: string; 
  totalAmount: string;
  penaltyAmount: string;
  grandTotal: string;
  status: string;
  book: {
    id: string;
    title: string;
    author: string;
  };
}
