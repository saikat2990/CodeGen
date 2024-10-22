import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  postTemplate,
  fetchTemplateById,
} from "../../store/slices/listPageDesignSlice";
import {
  AppComponentViewModel,
  AppComponentModel,
  ListPageLayoutTemplate,
  Action,
  Column,
  PageLayout
} from "../../models/listModel";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Edit, Plus, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ListPageViewDesignerProps {
  template?: ListPageLayoutTemplate;
}

const ListViewDesignerPage: React.FC<ListPageViewDesignerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    storeTemplate,
    pageLayout: storeLayout,
    loading,
    error,
  } = useSelector((state: RootState) => state.listPageviewDesign);

  const [pageLayout, setPageLayout] = useState<PageLayout | null>(null);
  const [recordid, setRecordId] = useState<number>();
  const [propertyType, setPropertyType] = useState<number>(4);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const loadTemplate = (id: number) => {
    dispatch(fetchTemplateById(id));
  };

  useEffect(() => {
    setRecordId(1);
  }, []);

  useEffect(() => {
    if (recordid) {
      loadTemplate(recordid);
    }
  }, [recordid]);

  useEffect(() => {
    if(storeLayout){
      setPageLayout(storeLayout);
    }
  }, [storeLayout])

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
    appMenus: [],
  });



  useEffect(() => {
    if (storeTemplate) {
      setAppComponent(storeTemplate.model as AppComponentModel);
    }
  }, [storeTemplate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageLayout((prevLayout) => prevLayout ? ({
      ...prevLayout,
      header: {
        ...prevLayout.header,
        title: e.target.value,
      },
    }) : null);
  };

  const updateActionProperty = (
    buttonName: string,
    property: keyof Action,
    value: string | boolean
  ) => {
    setPageLayout((prevLayout) => prevLayout ? ({
      ...prevLayout,
      actions: prevLayout.actions.map((action) =>
        action.buttonName === buttonName
          ? { ...action, [property]: value }
          : action
      ),
    }) : null);
  };

  const updateColumnProperty = (
    name: string,
    property: keyof Column,
    value: string | boolean
  ) => {
    setPageLayout((prevLayout) => prevLayout ? ({
      ...prevLayout,
      columns: prevLayout.columns.map((column) =>
        column.name === name ? { ...column, [property]: value } : column
      ),
    }) : null);
  };

  const addNewAction = () => {
    if (!pageLayout) return;
    const newAction: Action = {
      buttonName: `New Action ${pageLayout.actions.length + 1}`,
      actionType: "",
      drawerConponentId: "",
      url: "",
      functionName: "",
      visible: true,
      icon: "",
      text: `New Action ${pageLayout.actions.length + 1}`,
      position: "",
      showCaption: true,
    };

    setPageLayout((prevLayout) => prevLayout ? ({
      ...prevLayout,
      actions: [...prevLayout.actions, newAction],
    }) : null);

    setPropertyType(2);
    setSelectedActionIndex(pageLayout.actions.length);
  };

  const addNewColumn = () => {
    if (!pageLayout) return;
    const newColumn: Column = {
      name: `column${pageLayout.columns.length + 1}`,
      fieldName: `column${pageLayout.columns.length + 1}`,
      text: `Column ${pageLayout.columns.length + 1}`,
      textAlignment: "left",
      allowFilter: true,
      allowSort: true,
      actionType: "",
      drawerComponentId: "",
      url: "",
      idField: "",
      drawerWidth: "",
    };

    setPageLayout((prevLayout) => prevLayout ? ({
      ...prevLayout,
      columns: [...prevLayout.columns, newColumn],
    }) : null);

    setPropertyType(3);
    setSelectedColumnIndex(pageLayout.columns.length);
  };

  const updateTemplateProperty = (
    property: keyof AppComponentModel,
    value: string | boolean
  ) => {
    setAppComponent((prevTemplate) => ({
      ...prevTemplate,
      [property]: value,
    }));
  };

  const handleSave = () => {
    if (!pageLayout) return;
    let layout = {
      header: pageLayout.header,
      actions: pageLayout.actions,
      columns: pageLayout.columns,
    };

    const templateToSave: AppComponentModel = {
      ...appComponent,
      pageType: 'List',
      pageLayout: JSON.stringify(layout),
    };
    dispatch(postTemplate(templateToSave));
  };

  

  if (!pageLayout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex">
      <div className="w-3/4">
        <div className="p-8 sm:pl-96">
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
                {pageLayout.header.title}{" "}
                <Button onClick={() => setPropertyType(1)}>
                  <Edit />
                </Button>
              </h2>
              <p className="text-muted-foreground">
                {pageLayout.header.subTitle}
              </p>
              <p className="text-muted-foreground">
                {pageLayout.header.description}
              </p>
            </div>
            <div>
              <Button onClick={handleSave} className="mr-2" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />{" "}
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {saveSuccess && (
            <p className="text-green-500">Template saved successfully!</p>
          )}

          <div className="action-cls flex gap-4">
            {pageLayout.actions.map((action: Action, index: number) => (
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
            {pageLayout.columns.map((column: Column, index: number) => (
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
        </div>
      </div>
      <div className="w-1/4">
        {propertyType == 1 && (
          <div className="flex flex-col gap-4 p-8">
            <div>Page Header</div>
            <label>Title</label>
            <Input
              id="newColumn"
              value={pageLayout.header.title}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
            <label>Sub Title</label>
            <Input
              id="newSubtitle"
              value={pageLayout.header.subTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageLayout((prevLayout) => prevLayout ? ({
                  ...prevLayout,
                  header: {
                    ...prevLayout.header,
                    subTitle: e.target.value,
                  },
                }) : null)
              }
              placeholder="Enter subtitle"
            />
            <label>Description</label>
            <Input
              id="newDescription"
              value={pageLayout.header.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageLayout((prevLayout) => prevLayout ? ({
                  ...prevLayout,
                  header: {
                    ...prevLayout.header,
                    description: e.target.value,
                  },
                }) : null)
              }
              placeholder="Enter description"
            />
          </div>
        )}
        {propertyType == 2 && (
          <div>
            <div className="flex flex-col gap-4 p-8">
              <div>Page Action</div>
              {Object.entries(pageLayout.actions[selectedActionIndex]).map(
                ([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === "boolean" ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) =>
                          updateActionProperty(
                            pageLayout.actions[selectedActionIndex].buttonName,
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
                            pageLayout.actions[selectedActionIndex].buttonName,
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
              {Object.entries(pageLayout.columns[selectedColumnIndex]).map(
                ([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === "boolean" ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) =>
                          updateColumnProperty(
                            pageLayout.columns[selectedColumnIndex].name,
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
                            pageLayout.columns[selectedColumnIndex].name,
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
