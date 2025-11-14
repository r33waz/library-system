import { BLOCK_STATUS, BORROWER_STATUS, SIGNUPSTATUS } from "@/data/enum";

const StatusBadge = ({ status }: { status: string }) => {
  // swtich case
  switch (status) {
    case SIGNUPSTATUS.PENDING:
      return (
        <span className="bg-secondary-primary text-white py-1 px-2.5 rounded-full text-sm font-medium">
          PENDING
        </span>
      );
    case SIGNUPSTATUS.ACCEPTED:
      return (
        <span className="bg-green-primary text-white py-1 px-2.5 rounded-full text-sm font-medium">
          ACCEPTED
        </span>
      );
    case SIGNUPSTATUS.REJECTED:
      return (
        <span className="bg-error-red text-white py-1 px-2.5 rounded-full text-sm font-medium">
          REJECTED
        </span>
      );
    default:
      break;
  }
};

const BlockedStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case BLOCK_STATUS.ACTIVE:
      return (
        <span className="bg-green-primary text-white py-1 px-2.5 rounded-full text-sm font-medium">
          ACTIVE
        </span>
      );
    case BLOCK_STATUS.BLOCKED:
      return (
        <span className="bg-error-red text-white py-1 px-2.5 rounded-full text-sm font-medium">
          BLOCKED
        </span>
      );
    default:
      break;
  }
};

const BorrowStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case BORROWER_STATUS.PENDING:
      return (
        <span className="bg-secondary-primary text-white rounded-full text-xs px-2 py-1">
          PENDING
        </span>
      );
    case BORROWER_STATUS.BORROWED:
      return (
        <span className="bg-green-primary text-white rounded-full text-xs px-2 py-1">
          ACCEPTED
        </span>
      );
    case BORROWER_STATUS.REJECTED:
      return (
        <span className="bg-error-red text-white rounded-full text-xs px-2 py-1">
          REJECTED
        </span>
      );

    case BORROWER_STATUS.RETURNED:
      return (
        <span className="bg-error-red text-white rounded-full text-xs px-2 py-1">
          RETURNED
        </span>
      );

    case BORROWER_STATUS.OVERDUE:
      return (
        <span className="bg-error-red text-white py-1 px-2.5 rounded-full text-sm ">
          OVERDUE
        </span>
      );
    default:
      break;
  }
};

const BillPaymentBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pain":
      return (
        <span className="bg-green-primary text-white py-1 px-2.5 rounded-full text-sm font-medium">
          PAID
        </span>
      );
    case "unpaid":
      return (
        <span className="bg-error-red text-white py-1 px-2.5 rounded-full text-sm font-medium">
          UNPAID
        </span>
      );
    default:
      break;
  }
};

export { BillPaymentBadge, BlockedStatusBadge, BorrowStatusBadge, StatusBadge };
