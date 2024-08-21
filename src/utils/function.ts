import { HttpStatus } from '@nestjs/common';
import { FILTER_BILL, LIMIT_DATA, TYPE_DATE_TIME } from 'src/common/app';
import { encryptData } from './crypto';
import { PipelineStage, Types } from 'mongoose';
import { KEY_OPTION_FILTER_DB, OPTION_FILTER_DB } from 'src/common/mongoDB';
const moment = require('moment');

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

export function getDateToQuery(value: string) {
  const day = new Date(Number(value));

  const start = new Date(moment(day).startOf('day').toString()).getTime();
  const end = new Date(moment(day).endOf('day').toString()).getTime();

  return {
    $gte: start,
    $lte: end,
  };
}

export function getRangeDateToQuery(startDate: string, endDate: string) {
  const dayStart = new Date(Number(startDate));
  const dayEnd = new Date(Number(endDate));

  const start = new Date(moment(dayStart).startOf('day').toString()).getTime();
  const end = new Date(moment(dayEnd).endOf('day').toString()).getTime();
  return {
    $gte: start,
    $lte: end,
  };
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
    if (isError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (!data) {
      return response.status(HttpStatus.OK).json({
        data: data,
        status: HttpStatus.OK,
      });
    }

    return response.status(HttpStatus.OK).json({
      data: response.req.method !== 'GET' ? encryptData(data) : data,
      status: HttpStatus.OK,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
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
      if (query[key]) {
        if (key === 'date') {
          queryBase.$match.date = getDateToQuery(query.date);
        } else {
          if (key === 'dateRange') {
            const listRanegDate = query[key].split(',');
            queryBase.$match.date = getRangeDateToQuery(
              listRanegDate[0],
              listRanegDate[1],
            );
          } else {
            if (key === 'status' || key === 'type') {
              if (query[key] !== FILTER_BILL.All) {
                queryBase.$match[key] = query[key];
              }
            } else {
              if (key === 'id') {
                queryBase.$match._id = new Types.ObjectId(
                  query[key]?.toString(),
                );
              } else {
                if (key == 'admin') {
                  queryBase.$match[key] = query[key] === 'true' ? true : false;
                } else {
                  queryBase.$match[key] = query[key];
                }
              }
            }
          }
        }
      }
    });
  }
  return queryBase;
};
