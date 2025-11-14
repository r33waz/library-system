import { ErrorToast } from "@/components/common/toast";
import { SIGNUPSTATUS } from "@/data/enum";
import { Middleware } from "@reduxjs/toolkit";

const borrowActionMiddleware: Middleware<{}> =
  (store) => (next) => (action: any) => {
    // Log all actions to see what's happening
    console.log("Action received:", action.type);

    if (
      action.type &&
      action.type.startsWith("borrowBook") &&
      !action.type.includes("/pending") &&
      !action.type.includes("/fulfilled") &&
      !action.type.includes("/rejected")
    ) {
      console.log("Borrow action caught:", action.type);
      const state = store.getState();
      const userStatus = state.auth?.user?.status;

      if (
        userStatus === SIGNUPSTATUS.PENDING ||
        userStatus === SIGNUPSTATUS.REJECTED
      ) {
        console.log("Blocking action:", action.type);
        ErrorToast("You are not allowed to borrow books");
        return; // Prevents the action from proceeding
      }
    }

    return next(action);
  };

export default borrowActionMiddleware;
