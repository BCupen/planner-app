import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { format, parse } from "date-fns";

const SpecificDateTasks = () => {
  const { date } = useParams();

  const parsedDate = parse(date || "", "MM-dd-yyyy", new Date());

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader
        title={`${format(parsedDate, "PPP")}`}
        subText="Here are your tasks on this date"
      />
    </section>
  );
};

export default SpecificDateTasks;
