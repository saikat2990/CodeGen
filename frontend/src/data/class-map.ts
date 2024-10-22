interface AppComponentModel {
    id?: number;
    moduleId?: number;
    name?: string;
    templateName?: string;
    serviceName?: string;
    entryFunc?: string;
    pageType?: string;
    pageLayout?: string;  // Stored as JSON string, which can be parsed into `PageLayout`
    isActive?: boolean;
}

export const AppComponentFields = ['id', 'moduleId', 'name', 'templateName', 'serviceName', 'entryFunc', 'pageType', 'pageLayout', 'isActive'];

