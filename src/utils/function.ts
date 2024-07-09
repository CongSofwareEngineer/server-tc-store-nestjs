import { HttpStatus } from '@nestjs/common';
import { LIMIT_DATA } from 'src/common/app';

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getPageLimitSkip(query: { [key: string]: any }) {
  const page = query?.page || 1;
  const limit = Number(query?.limit || LIMIT_DATA);
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
}

export function formatRes(response: any, data: any, isError?: boolean) {
  try {
    if (isError || !data) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return response.status(HttpStatus.OK).json({
      data,
      status: HttpStatus.OK,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
