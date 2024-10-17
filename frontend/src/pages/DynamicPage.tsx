import { useEffect, useState } from "react";
import LocalStorageCRUD from "@/lib/local-storage-crud";
import { ApplicationPage } from "./ApplicationPages";
import EngineViewList from "@/components/EngineViewList";
import EngineViewForm from "@/components/EngineViewForm";

interface DynamicPageProps {
  id: number;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ id }) => {
  const [page, setPage] = useState<ApplicationPage | null>(null);
  console.debug({ page });

  useEffect(() => {
    // Fetch data by ID from local storage
    const data = LocalStorageCRUD.getItem<ApplicationPage>(
      "application_pages",
      id
    );

    if (data) {
      setPage(data);
    }
  }, [id]);

  if (!page) {
    return <div>Loading...</div>;
  }

  const { pageType } = page;

  // Dynamically render component based on pageType
  switch (pageType) {
    case "ListView":
      return <EngineViewList pageId={page.id} />;
    case "FormView":
      return <EngineViewForm />;
    default:
      return <div>Unknown page type</div>;
  }
};

export default DynamicPage;
