import { HttpStatus } from '@nestjs/common';
import { LIMIT_DATA, TYPE_DATE_TIME } from 'src/common/app';

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function dateNow(type: TYPE_DATE_TIME = TYPE_DATE_TIME.Day) {
  //  switch (key) {
  //   case value:
  //     break;
  //   default:
  //     break;
  //  }
}

export function cloneData(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export function lowercase(text: any) {
  try {
    return text.toString().toLocaleLowerCase();
  } catch (error) {
    return text;
  }
}

export function getPageLimitSkip(query: { [key: string]: any }) {
  const page = Number(query?.page || 1);
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
    let dataClone = cloneData(data);

    if (isError || !dataClone) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    if (Array.isArray(dataClone)) {
      dataClone = dataClone.map((e) => {
        if (typeof e == 'object') {
          delete e.__v;
        }
        return e;
      });
    } else {
      if (typeof dataClone == 'object') {
        delete dataClone.__v;
      }
    }

    return response.status(HttpStatus.OK).json({
      data: dataClone,
      status: HttpStatus.OK,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      dataClone: null,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
