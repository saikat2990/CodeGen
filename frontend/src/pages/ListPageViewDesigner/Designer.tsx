import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  postTemplate,
  fetchTemplateById,
  AppComponentViewModel,
  AppComponentModel,
} from "../../store/slices/listPageDesignSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import DataTable from "../../components/general/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Skeleton } from "../../components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Plus,
  Settings,
  Save,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type Action = {
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
};

type Column = {
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
};

interface ListPageLayoutTemplate extends AppComponentModel {
  header: {
    title: string;
    subTitle: string;
    description: string;
  };
  actions: Action[];
  columns: Column[];
}

interface ListPageViewDesignerProps {
  template?: ListPageLayoutTemplate;
}

const createColumnsFromJson = (columnDefs: any[]): ColumnDef<any>[] => {
  return columnDefs
    .map((colDef) => {
      return {
        accessorKey: colDef.fieldName,
        header: colDef.text,
        cell: colDef.text,
        enableSorting: colDef.enableSorting ?? true,
        enableHiding: colDef.enableHiding ?? true,
      };
    })
    .filter(Boolean) as ColumnDef<any>[];
};

const ListViewDesignerPage: React.FC<ListPageViewDesignerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    storeTemplate: storeTemplate,
    loading,
    error,
  } = useSelector((state: RootState) => state.listPageviewDesign);

  const [appComponent, setAppComponent] = useState<AppComponentModel>({
    id: 0,
    moduleId: 0,
    name: "Default Page",
    templateName: "DefaultTemplate",
    serviceName: "DefaultService",
    entryFunc: "getAll",
    pageType: "List",
    pageLayout: "Default",
    isActive: true,
  });

  const [template, setTemplate] = useState<ListPageLayoutTemplate>({
    id: 0,
    moduleId: 0,
    name: "Default Page",
    templateName: "DefaultTemplate",
    serviceName: "DefaultService",
    entryFunc: "getAll",
    pageType: "List",
    pageLayout: "Default",
    isActive: true,
    header: {
      title: "Default List Page",
      subTitle: "This is a default subtitle",
      description: "This is a default description",
    },
    actions: [
      {
        buttonName: "New",
        actionType: "",
        drawerConponentId: "id",
        url: "",
        functionName: "functionName",
        visible: true,
        icon: "",
        text: "New",
        position: "",
        showCaption: true,
      },
      {
        buttonName: "Delete",
        actionType: "",
        drawerConponentId: "id",
        url: "",
        functionName: "functionName",
        visible: true,
        icon: "",
        text: "Delete",
        position: "",
        showCaption: true,
      },
    ],
    columns: [
      {
        name: "id",
        fieldName: "id",
        text: "ID",
        textAlignment: "left",
        allowFilter: true,
        allowSort: true,
        actionType: "",
        drawerComponentId: "",
        url: "",
        idField: "id",
        drawerWidth: "",
      },
      {
        name: "name",
        fieldName: "name",
        text: "Name",
        textAlignment: "left",
        allowFilter: true,
        allowSort: true,
        actionType: "",
        drawerComponentId: "",
        url: "",
        idField: "",
        drawerWidth: "",
      },
    ],
  });

  const [recordid, setRecordId] = useState<number>();

  const [propertyType, setPropertyType] = useState<number>(4);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (storeTemplate) {
      setTemplate(
        JSON.parse(storeTemplate?.model?.pageLayout) as ListPageLayoutTemplate
      );
      setAppComponent(storeTemplate?.model as AppComponentModel);
      // console.log(JSON.stringify(storeTemplate));
    }
  }, [storeTemplate]);

  useEffect(() => {
    // console.log("Template updated:", template);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      header: {
        ...prevTemplate.header,
        title: e.target.value,
      },
    }));
  };

  const updateActionProperty = (
    buttonName: string,
    property: keyof Action,
    value: string | boolean
  ) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      actions: prevTemplate.actions.map((action) =>
        action.buttonName === buttonName
          ? { ...action, [property]: value }
          : action
      ),
    }));
  };

  const updateColumnProperty = (
    name: string,
    property: keyof Column,
    value: string | boolean
  ) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      columns: prevTemplate.columns.map((column) =>
        column.name === name ? { ...column, [property]: value } : column
      ),
    }));
  };

  const addNewAction = () => {
    const newAction: Action = {
      buttonName: `New Action ${template.actions.length + 1}`,
      actionType: "",
      drawerConponentId: "",
      url: "",
      functionName: "",
      visible: true,
      icon: "",
      text: `New Action ${template.actions.length + 1}`,
      position: "",
      showCaption: true,
    };

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      actions: [...prevTemplate.actions, newAction],
    }));

    setPropertyType(2);
    setSelectedActionIndex(template.actions.length);
  };

  const addNewColumn = () => {
    const newColumn: Column = {
      name: `column${template.columns.length + 1}`,
      fieldName: `column${template.columns.length + 1}`,
      text: `Column ${template.columns.length + 1}`,
      textAlignment: "left",
      allowFilter: true,
      allowSort: true,
      actionType: "",
      drawerComponentId: "",
      url: "",
      idField: "",
      drawerWidth: "",
    };

    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      columns: [...prevTemplate.columns, newColumn],
    }));

    setPropertyType(3);
    setSelectedColumnIndex(template.columns.length);
  };

  const updateTemplateProperty = (
    property: keyof AppComponentModel,
    value: string
  ) => {
    setAppComponent((prevTemplate) => ({
      ...prevTemplate,
      [property]: value,
    }));
  };

  const handleSave = () => {
    let t = { ...template };
    let a = { ...appComponent };
    let layout = {
      header: t.header,
      actions: t.actions,
      columns: t.columns,
    };

    const templateToSave: AppComponentModel = {
      id: a.id,
      moduleId: a.moduleId,
      name: a.name,
      templateName: a.templateName,
      serviceName: a.serviceName,
      entryFunc: a.entryFunc,
      pageType: a.pageType,
      pageLayout: JSON.stringify(layout),
      isActive: a.isActive,
    };
    dispatch(postTemplate(templateToSave));
  };

  const loadTemplate = (id: number) => {
    dispatch(fetchTemplateById(id));
  };

  useEffect(() => {
    setRecordId(3);
  }, []);

  useEffect(() => {
    if (recordid) {
      loadTemplate(recordid);
    }
  }, [recordid]);

  return (
    <div className="w-full flex">
      <div className="w-3/4">
        <div className="p-8 sm:pl-96">
          {/* here */}
          <div>
            <div>Template Settings</div>
            <div className="flex gap-4 p-8">
              <div className="w-full">
                <label>Page ID</label>
                <Input value={appComponent?.id?.toString()} readOnly />
              </div>
              <div className="w-full">
                <label>Page Name</label>
                <Input
                  value={appComponent?.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateTemplateProperty("name", e.target.value)
                  }
                  placeholder="Enter page name"
                />
              </div>
              <div className="w-full">
                <label>Template Name</label>
                <Select
                  value={appComponent?.templateName}
                  onValueChange={(value) =>
                    updateTemplateProperty("templateName", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ListViewEngine">
                      ListViewEngine
                    </SelectItem>
                    <SelectItem value="FormViewEngine">
                      FormViewEngine
                    </SelectItem>
                    <SelectItem value="TabViewEngine">TabViewEngine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label>Service Name</label>
                <Select
                  value={appComponent?.serviceName}
                  onValueChange={(value) =>
                    updateTemplateProperty("serviceName", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UserService">UserService</SelectItem>
                    <SelectItem value="RoleService">RoleService</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label>Entry Function</label>
                <Select
                  value={appComponent?.entryFunc}
                  onValueChange={(value) =>
                    updateTemplateProperty("entryFunc", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select entry function" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getAll">getAll</SelectItem>
                    <SelectItem value="getById">getById</SelectItem>
                    <SelectItem value="create">create</SelectItem>
                    <SelectItem value="update">update</SelectItem>
                    <SelectItem value="delete">delete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="header-cls mb-2 flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {template.header.title}{" "}
                <Button onClick={() => setPropertyType(1)}>
                  <Edit />
                </Button>
              </h2>
              <p className="text-muted-foreground">
                {template.header.subTitle}
              </p>
              <p className="text-muted-foreground">
                {template.header.description}
              </p>
            </div>
            <div>
              <Button onClick={handleSave} className="mr-2" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />{" "}
                {loading ? "Saving..." : "Save"}
              </Button>
              {/* <Button onClick={() => setPropertyType(4)}>
                <Settings className="mr-2 h-4 w-4" /> Template Settings
              </Button> */}
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {saveSuccess && (
            <p className="text-green-500">Template saved successfully!</p>
          )}

          <div className="action-cls flex gap-4">
            {template?.actions.map((action: Action, index: number) => (
              <div key={index}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPropertyType(2);
                    setSelectedActionIndex(index);
                  }}
                >
                  {action.text}
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addNewAction}>
              <Plus className="mr-2 h-4 w-4" /> Add Action
            </Button>
          </div>

          <div className="action-cls flex justify-between gap-4">
            {template?.columns.map((column: Column, index: number) => (
              <div key={index}>
                <label>{column.text}</label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPropertyType(3);
                    setSelectedColumnIndex(index);
                  }}
                >
                  {" "}
                  <Edit />{" "}
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addNewColumn}>
              <Plus className="mr-2 h-4 w-4" /> Add Column
            </Button>
          </div>
          {/* <DataTable
            columns={createColumnsFromJson(template.columns)}
            data={[]}
          /> */}
        </div>
      </div>
      <div className="w-1/4">
        {propertyType == 1 && (
          <div className="flex flex-col gap-4 p-8">
            <div>Page Header</div>
            <label>Title</label>
            <Input
              id="newColumn"
              value={template.header.title}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
            <label>Sub Title</label>
            <Input
              id="newSubtitle"
              value={template.header.subTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTemplate((prevTemplate) => ({
                  ...prevTemplate,
                  header: {
                    ...prevTemplate.header,
                    subTitle: e.target.value,
                  },
                }))
              }
              placeholder="Enter subtitle"
            />
            <label>Description</label>
            <Input
              id="newDescription"
              value={template.header.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTemplate((prevTemplate) => ({
                  ...prevTemplate,
                  header: {
                    ...prevTemplate.header,
                    description: e.target.value,
                  },
                }))
              }
              placeholder="Enter description"
            />
          </div>
        )}
        {propertyType == 2 && (
          <div>
            <div className="flex flex-col gap-4 p-8">
              <div>Page Action</div>
              {Object.entries(template.actions[selectedActionIndex]).map(
                ([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === "boolean" ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) =>
                          updateActionProperty(
                            template.actions[selectedActionIndex].buttonName,
                            key as keyof Action,
                            checked as boolean
                          )
                        }
                      />
                    ) : (
                      <Input
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateActionProperty(
                            template.actions[selectedActionIndex].buttonName,
                            key as keyof Action,
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {propertyType == 3 && (
          <div>
            <div className="flex flex-col gap-4 p-8">
              <div>Table Column</div>
              {Object.entries(template.columns[selectedColumnIndex]).map(
                ([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === "boolean" ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) =>
                          updateColumnProperty(
                            template.columns[selectedColumnIndex].name,
                            key as keyof Column,
                            checked as boolean
                          )
                        }
                      />
                    ) : (
                      <Input
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateColumnProperty(
                            template.columns[selectedColumnIndex].name,
                            key as keyof Column,
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListViewDesignerPage;
