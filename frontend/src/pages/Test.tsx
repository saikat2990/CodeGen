import DataTable from "@/components/general/DataTable";

const Test: React.FC = () => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      {/* <div className="flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0"> */}
      <DataTable />
      {/* </div> */}
    </>
  );
};

export default Test;
