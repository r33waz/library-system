export interface IAdmin {
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  blocked: string;
  status: string;
}

export interface IGenre {
  name: string;
  slug: string;
}


export interface ICategory{
  name: string;
  slug: string;
}