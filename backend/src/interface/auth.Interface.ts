import { Request } from "express";

export interface ISignup {
  fullname: string;
  email: string;
  password: string;
  universityCard: string;
  universityId: number;
  status: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface JwtPayloadWithId {
  id: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayloadWithId;
}


export interface AuthRequest extends Request {
  user?: {
    id: string;
    libraryEmpId?: string;
    library?:{
      id: string;
    }
  };
}