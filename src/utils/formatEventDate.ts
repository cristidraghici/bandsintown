import { format } from "date-fns";

const formatEventDate = (
  date: string,
  outputFormat: string = "MMMM dd, yyyy 'at' hh:mmaaa"
) => {
  return format(new Date(date), outputFormat);
};

export default formatEventDate;
