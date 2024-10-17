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