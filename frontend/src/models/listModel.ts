export interface Header {
  title: string;
  subTitle: string;
  description: string;
}

export interface Action {
  buttonName: string;
  actionType: string;
  drawerConponentId: string;
  url: string;
  functionName: string;
  visible: boolean;
  icon: string;
  text: string;
  position: string;
  showCaption: boolean;
}

export interface Column {
  name: string;
  fieldName: string;
  text: string;
  textAlignment: "left" | "center" | "right";
  allowFilter: boolean;
  allowSort: boolean;
  actionType: string;
  drawerComponentId: string;
  url: string;
  idField: string;
  drawerWidth: string;
}

export interface PageLayout {
  header: Header;
  actions: Action[];
  columns: Column[];
}

export interface AppComponentModel {
  id: number;
  moduleId: number;
  name: string;
  templateName: string;
  serviceName: string;
  entryFunc: string;
  pageType: string;
  pageLayout: string;  // Stored as JSON string, which can be parsed into `PageLayout`
  isActive: boolean;
  appMenus: AppMenu[];
}

export interface AppComponentViewModel {
  id: number;
  model: AppComponentModel;
  success: boolean;
  message: string | null;
}

export interface AppMenu {
  // Define fields for `AppMenu` if they are present in your JSON
  // In this case, the array is empty so we can define it as an empty object or array for now
  [key: string]: any;
}


// AppComponentModel can be extended if we want to flaten the API model
export interface ListPageLayoutTemplate extends AppComponentModel {
  header: Header;
  actions: Action[];
  columns: Column[];
}
