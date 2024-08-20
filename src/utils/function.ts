import { HttpStatus } from '@nestjs/common';
import { FILTER_BILL, LIMIT_DATA, TYPE_DATE_TIME } from 'src/common/app';
import { encryptData } from './crypto';
import { PipelineStage, Types } from 'mongoose';
import { KEY_OPTION_FILTER_DB, OPTION_FILTER_DB } from 'src/common/mongoDB';
import moment from 'moment';

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isObject(value: any) {
  try {
    if (!value) {
      return false;
    }
    return Object.prototype.toString.call(value) === '[object Object]';
  } catch (error) {
    return false;
  }
}

export function dateNow(type: TYPE_DATE_TIME = TYPE_DATE_TIME.Day) {
  //  switch (key) {
  //   case value:
  //     break;
  //   default:
  //     break;
  //  }
  console.log({ type });
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
      if (isObject(dataClone)) {
        delete dataClone.__v;
      }
    }
    if (!dataClone) {
      return response.status(HttpStatus.OK).json({
        data: dataClone,
        status: HttpStatus.OK,
      });
    }
    console.log({ methodresponse: response.method });

    return response.status(HttpStatus.OK).json({
      data: response.req.method !== 'GET' ? encryptData(dataClone) : dataClone,
      status: HttpStatus.OK,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      dataClone: null,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export const getQueryDB = (query: any, keyType?: KEY_OPTION_FILTER_DB) => {
  const queryBase: PipelineStage = {
    $match: {},
  };
  if (OPTION_FILTER_DB[keyType]) {
    Object.keys(OPTION_FILTER_DB[keyType]).forEach((key) => {
      if (key !== 'page' && key !== 'limit' && query[key]) {
        if (key === 'date') {
          const day = new Date(Number(query.date));

          const start = new Date(
            moment(day).startOf('day').toString(),
          ).getTime();
          const end = new Date(moment(day).endOf('day').toString()).getTime();

          queryBase.$match.date = {
            $gte: start.toString(),
            $lt: end.toString(),
          };
        } else {
          if (key === 'status' || key === 'type') {
            if (query[key] !== FILTER_BILL.All) {
              queryBase.$match[key] = query[key];
            }
          } else {
            if (key === 'id') {
              queryBase.$match._id = new Types.ObjectId(query[key]?.toString());
            } else {
              queryBase.$match[key] = query[key];
            }
          }
        }
      }
    });
  }
  return queryBase;
};
