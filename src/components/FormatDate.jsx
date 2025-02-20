import { format } from 'date-fns';

const DateFormat = ({ date }) => {
  return <span>{format(new Date(date), "dd MMMM, yyyy ")}</span>;
};

export default DateFormat;
