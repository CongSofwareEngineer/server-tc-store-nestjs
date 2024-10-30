import * as moment from 'moment';

export const formatDate = (value?: any, type = 'DD-MM-YYYY') => {
  if (!value) {
    return moment().format('DD-MM-YYYY');
  }
  return moment(value).format('DD-MM-YYYY');
};
