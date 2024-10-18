let ListPageLayoutTemplate = {
    pageId: '1',
    pageName: 'Test',
    templateName: 'ListViewEngine', // enum templateType
    serviceName: 'listService', // class name
    entryFunction: 'getAll',
    header: {
        title: '',
        subTitle: '',
        description: '',
    },
    actions: [{
        buttonName: 'New',
        actionType: '', // drawer || navigate || function
        drawerConponentId: 'id', // pageid dropdown
        url: '', //
        functionName: 'functionName',
        visible: true,
        icon: '',
        caption: '',
        position: '',
        showCaption: true,
    }],
    fields: [{
        name: '',
        dataField: '',
        caption: '',
        textAlignment: '',
        allowFilter: '',
        allowSort: '',
        actionType: '',  // drawer || navigate
        drawerComponentId: 'page-id',
        url: '',
        idField: 'id', // fieldName
        drawerWidth: '',
    }] 
}


let detailPageLayoutTemplate = {
    pageId: '1',
    pageName: 'Test',
    templateName: 'DetailViewEngine', // enum templateType
    serviceName: 'detailService', // class name
    entryFunction: 'getById',
    header: {
        title: '',
        subTitle: '',
        description: '',
    },
    actions: [{
        buttonName: 'Save',
        actionType: 'function', // drawer || navigate || **function
        drawerConponentId: 'id', // pageid dropdown
        url: '', //
        functionName: 'addOrUpdate',
        visible: true,
        icon: '',
        caption: '',
        position: '',
        showCaption: true,
    }],
    fieldSet: [{
        name: 'row-1',
        type: 'row',
        css: '',
        fieldSet: [{
            name: 'column-1',
            type: 'column',
            css: '',
            fieldSet: [{
                name: 'card',
                type: 'card',
                title: 'Card-1',
                fieldSet: [{
                    name: 'row-',
                    type: 'row',
                    fieldSet: [{
                        type: 'input',
                        name: 'fieldName',
                        caption: '',
                        css: '',
                    }]
                }]
            }, {
                name: 'card',
                type: 'card',
                title: 'Card-2',
                fieldSet: [{
                    name: 'row-',
                    type: 'row',
                    fieldSet: [{
                        type: 'input',
                        name: 'fieldName',
                        caption: '',
                        css: '',
                    }]
                }]
            }],
        }],
    },
    {
        name: 'row-1',
        type: 'row',
        css: '',
        fieldSet: [{
            name: 'column-1',
            type: 'column',
            css: '',
            fieldSet: [{
                name: 'card',
                type: 'card',
                title: 'Card-1',
                fieldSet: [{
                    name: 'row-',
                    type: 'row',
                    fieldSet: [{
                        type: 'input',
                        name: 'fieldName',
                        caption: '',
                        css: '',
                    }]
                }]
            }, {
                name: 'card',
                type: 'card',
                title: 'Card-2',
                fieldSet: [{
                    name: 'row-',
                    type: 'row',
                    fieldSet: [{
                        type: 'input',
                        name: 'fieldName',
                        caption: '',
                        css: '',
                    }]
                }]
            }],
        }],
    }
] 
}

/* 
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
  });*/


  /*
    {
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
  }
  */