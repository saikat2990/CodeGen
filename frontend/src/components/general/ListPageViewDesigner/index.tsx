import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import DataTable from "../DataTable";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Skeleton } from "../../ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Plus, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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

type ListPageLayoutTemplate = {
  pageId: string;
  pageName: string;
  templateName: string;
  serviceName: string;
  entryFunction: string;
  header: {
    title: string;
    subTitle: string;
    description: string;
  };
  actions: Action[];
  columns: Column[];
};

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

const ListPageViewDesigner: React.FC<ListPageViewDesignerProps> = () => {
  const [template, setTemplate] = useState<ListPageLayoutTemplate>({
    pageId: "1",
    pageName: "Default Page",
    templateName: "DefaultTemplate",
    serviceName: "DefaultService",
    entryFunction: "getAll",
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

  const [propertyType, setPropertyType] = useState<number>(0);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);

  useEffect(() => {
    // console.log("Template updated:", template);
  }, [template]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      header: {
        ...prevTemplate.header,
        title: e.target.value
      }
    }));
  };

  const updateActionProperty = (buttonName: string, property: keyof Action, value: string | boolean) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      actions: prevTemplate.actions.map(action => 
        action.buttonName === buttonName ? { ...action, [property]: value } : action
      )
    }));
  };

  const updateColumnProperty = (name: string, property: keyof Column, value: string | boolean) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      columns: prevTemplate.columns.map(column => 
        column.name === name ? { ...column, [property]: value } : column
      )
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

    setTemplate(prevTemplate => ({
      ...prevTemplate,
      actions: [...prevTemplate.actions, newAction]
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

    setTemplate(prevTemplate => ({
      ...prevTemplate,
      columns: [...prevTemplate.columns, newColumn]
    }));

    setPropertyType(3);
    setSelectedColumnIndex(template.columns.length);
  };

  const updateTemplateProperty = (property: keyof ListPageLayoutTemplate, value: string) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      [property]: value
    }));
  };

  return (
    <div className="w-full flex">
      <div className="w-3/4">
        <div className="p-8 sm:pl-96">
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
            <Button onClick={() => setPropertyType(4)}>
              <Settings className="mr-2 h-4 w-4" /> Template Settings
            </Button>
          </div>

          <div className="action-cls flex gap-4">
            {template?.actions.map((action: Action, index: number) => (
              <div key={index}>
                <Button variant="outline" onClick={() => {setPropertyType(2); setSelectedActionIndex(index)}}>{action.text}</Button>
              </div>
            ))}
            <Button variant="outline" onClick={addNewAction}>
              <Plus className="mr-2 h-4 w-4" /> Add Action
            </Button>
          </div>
            
          <div className="action-cls flex justify-between gap-4">
            {template?.columns.map((column: Column, index: number) => (          
              <div key={index} >
                <label>
                {column.text}
                </label>
                <Button variant="outline" onClick={() => {setPropertyType(3); setSelectedColumnIndex(index)}}> <Edit /> </Button>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplate(prevTemplate => ({
                ...prevTemplate,
                header: {
                  ...prevTemplate.header,
                  subTitle: e.target.value
                }
              }))}
              placeholder="Enter subtitle"
            />
            <label>Description</label>
            <Input
              id="newDescription"
              value={template.header.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplate(prevTemplate => ({
                ...prevTemplate,
                header: {
                  ...prevTemplate.header,
                  description: e.target.value
                }
              }))}
              placeholder="Enter description"
            />
          </div>
        )}
        {propertyType == 2 && (
          <div>
              <div className="flex flex-col gap-4 p-8">
                <div>Page Action</div>
                {Object.entries(template.actions[selectedActionIndex]).map(([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === 'boolean' ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) => updateActionProperty(template.actions[selectedActionIndex].buttonName, key as keyof Action, checked as boolean)}
                      />
                    ) : (
                      <Input
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateActionProperty(template.actions[selectedActionIndex].buttonName, key as keyof Action, e.target.value)}
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </div>
                ))}
              </div>
          </div>
        )}

        {propertyType == 3 && (
          <div>
              <div className="flex flex-col gap-4 p-8">
                <div>Table Column</div>
                {Object.entries(template.columns[selectedColumnIndex]).map(([key, value]) => (
                  <div key={key}>
                    <label>{key}</label>
                    {typeof value === 'boolean' ? (
                      <Checkbox
                        checked={value}
                        onCheckedChange={(checked) => updateColumnProperty(template.columns[selectedColumnIndex].name, key as keyof Column, checked as boolean)}
                      />
                    ) : (
                      <Input
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateColumnProperty(template.columns[selectedColumnIndex].name, key as keyof Column, e.target.value)}
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </div>
                ))}
              </div>
          </div>
        )}

        {propertyType == 4 && (
          <div className="flex flex-col gap-4 p-8">
            <div>Template Settings</div>
            <label>Page ID</label>
            <Input
              value={template.pageId}
              readOnly
            />
            <label>Page Name</label>
            <Input
              value={template.pageName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTemplateProperty('pageName', e.target.value)}
              placeholder="Enter page name"
            />
            <label>Template Name</label>
            <Select
              value={template.templateName}
              onValueChange={(value) => updateTemplateProperty('templateName', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ListViewEngine">ListViewEngine</SelectItem>
                <SelectItem value="FormViewEngine">FormViewEngine</SelectItem>
                <SelectItem value="TabViewEngine">TabViewEngine</SelectItem>
              </SelectContent>
            </Select>
            <label>Service Name</label>
            <Select
              value={template.serviceName}
              onValueChange={(value) => updateTemplateProperty('serviceName', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UserService">UserService</SelectItem>
                <SelectItem value="RoleService">RoleService</SelectItem>
              </SelectContent>
            </Select>
            <label>Entry Function</label>
            <Select
              value={template.entryFunction}
              onValueChange={(value) => updateTemplateProperty('entryFunction', value)}
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
        )}
      </div>
    </div>
  );
};

export default ListPageViewDesigner;
