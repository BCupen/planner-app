interface PageHeaderProps {
  title: string;
  subText: string;
}

export const PageHeader = ({ title, subText }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold text-text-1">{title}</h2>
      <p className="text-subtle text-sm font-medium">{subText}</p>
    </div>
  );
};
