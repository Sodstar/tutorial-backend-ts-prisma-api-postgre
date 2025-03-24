import sha1 from "sha1";
import md5 from "md5";

export const encrypt = (password: string) => {
  return md5(sha1(password));
};

export const getRandomCode = (length: number) => {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");
};

export const getRandomNumberInRange = ({
  min = 0,
  max,
}: {
  min: number;
  max: number;
}) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

export const dateDiffInDays = (date1: Date, date2: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const sortArrayObjByField = (array: any[], field: string, asc = 1) => {
  const arr = array.sort((a, b) =>
    a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
  );
  return asc ? arr : arr.reverse();
};