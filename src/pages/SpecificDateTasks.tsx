import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

const SpecificDateTasks = () => {
  const { date } = useParams();

  return (
    <section className="flex flex-col items-start gap-5">
      <PageHeader
        title={`${date}`}
        subText="Here are your tasks on this date"
      />
    </section>
  );
};

export default SpecificDateTasks;
