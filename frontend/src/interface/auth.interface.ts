export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthInitialState {
  isLoading: boolean;
  error: boolean;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  initialized: boolean;
  user: {
    role: string | null;
  };

  isUserLoading: boolean;
  isUserError: boolean;
  userDeatails: IUserDetails | null;

  // googleLogin related fields can be added here if needed
  googleLoading: boolean;
}

export interface IUserDetails {
  id: string;
  email: string;
  role: string;
  user: {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    role: string;
    blocked: string;
    status: string;
    universityId: string;
  };
  admin: {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    role: string;
    blocked: string;
    status: string;
  };
  library: {
    id: string;
    name: string;
    status: string;
    role: string;
    blocked: string;
  };
  libraryEmp: {
    id: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    status: string;
    role: string;
    blocked: string;
    library: {
      id: string;
      name: string;
      status: string;
      role: string;
      blocked: string;
    };
  };
}
