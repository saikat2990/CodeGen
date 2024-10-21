export interface IParameter {
  name: string;
  type: unknown;
}

export interface IService {
  key: string;
  serviceName: string;
  functionName: string;
  serviceUrl: string;
  // responseClassName: string;
  responseType: unknown;
  parameters: IParameter[];
}

export type AppComponentModel = {
  id: number;
  moduleId: number;
  name: string;
  templateName: string;
  serviceName: string;
  entryFunc: string;
  pageType: string;
  pageLayout:
    | {
        header: {
          title: string;
          subTitle: string;
          description: string;
        };
        actions: {
          buttonName: string;
          actionType: string;
          drawerComponentId: string;
          url: string;
          functionName: string;
          visible: boolean;
          icon: string;
          text: string;
          position: string;
          showCaption: boolean;
        }[];
        columns: {
          name: string;
          fieldName: string;
          text: string;
          textAlignment: string;
          allowFilter: boolean;
          allowSort: boolean;
          actionType: string;
          drawerComponentId: string;
          url: string;
          idField: string;
          drawerWidth: string;
        }[];
      }
    | string;
  isActive: boolean;
  appMenus: unknown[];
};

class ServiceMap {
  private services: IService[] = [];

  constructor() {
    this.services = this.json;
  }

  json = [
    {
      serviceName: "AppComponentService",
      functionName: "GetList",
      serviceUrl: "/api/AppComponent/GetList",
    },
    {
      serviceName: "AppComponentService",
      functionName: "GetById",
      serviceUrl: "/api/AppComponent/GetById/{id}",
    },
  ] as IService[];

  getListOfServices() {
    return this.services;
  }

  getServiceUrl(serviceName: string, functionName: string) {
    const service = this.services.find(
      (s: IService) =>
        s.serviceName === serviceName && s.functionName === functionName
    );

    if (service) {
      return service.serviceUrl;
    }

    return null;
  }
}

export default new ServiceMap();
