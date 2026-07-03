export interface PhoneUser {
  phone: string;
  verifyCode: number | string;
  id?:number;
  posts?: any[];
  likes?: any[];
}

export const PHONES: PhoneUser[] = []