import { HttpStatus } from '@nestjs/common';

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function formatRes(response: any, data: any, isError?: boolean) {
  if (isError) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
      status: HttpStatus.BAD_REQUEST,
    });
  }
  return response.status(HttpStatus.OK).json({
    data,
    status: HttpStatus.OK,
  });
}
