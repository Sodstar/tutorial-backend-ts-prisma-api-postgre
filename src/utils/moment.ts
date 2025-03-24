import moment from "moment";

export const dateFormat = (date: Date, format = "YYYY-MM-DD") => {
  return moment(date.toISOString().split("T")[0]).format(format);
};

export const timeFormat = (time: Date, format = "HH:mm:ss") => {
  return time.toISOString().split("T")[1].split(".")[0];
};
