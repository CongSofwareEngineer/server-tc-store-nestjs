import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUser(): string {
    return `getAllUser`;
  }

  async login(sdt: string, pass: string): Promise<Array<Record<string, any>>> {
    console.log({ sdt, pass });

    return [{ name: 'diencong' }];
  }
}
