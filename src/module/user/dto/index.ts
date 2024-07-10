export class CreateUserDto {
  sdt?: string;
  pass?: string;
  sex?: boolean;
  name?: string;
  isAdmin: boolean;
  date: string;
  addressShipper: string[];
  avatar?: string | null;
  exp?: number;
  address?: string;
}
