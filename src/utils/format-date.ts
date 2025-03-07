import moment from "moment";
export const formatDate = (datetime: string) => {
  return moment(datetime).format("L");
};
