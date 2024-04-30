import { format } from "date-fns";

const formatEventDate = (date: string) => {
  return format(new Date(date), "MMMM dd, yyyy 'at' hh:mmaaa");
};

export default formatEventDate;
