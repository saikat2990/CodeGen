import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppComponentViewModel, AppComponentModel, PageLayout } from "../../models/listModel";
import { AppComponentFields } from "@/data/class-map";

// Constants
const SLICE_NAME = "listPageviewDesign";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const defaultPageLayout = {
  id: 0,
  moduleId: 0,
  name: "New Component",
  templateName: "List",
  serviceName: "ListService",
  entryFunc: "getAll",
  pageType: "List",
  isActive: true,
  header: {
    title: "New Component",
    subTitle: "",
    description: "",
  },
  actions: [
    {
      buttonName: "New",
      actionType: "",
      drawerConponentId: "id",
      url: "",
      functionName: "onActionClick",
      visible: false,
      icon: "",
      text: "New",
      position: "",
      showCaption: true,
    },
    {
      buttonName: "Refresh",
      actionType: "",
      drawerConponentId: "id",
      url: "",
      functionName: "onActionClick",
      visible: true,
      icon: "",
      text: "Refresh",
      position: "",
      showCaption: true,
    },
    {
      buttonName: "Delete",
      actionType: "",
      drawerConponentId: "id",
      url: "",
      functionName: "onActionClick",
      visible: true,
      icon: "",
      text: "Delete",
      position: "",
      showCaption: true,
    },
  ],
  columns: [],
};

// State interface
interface ListPageviewDesignState {
  storeTemplate: AppComponentViewModel | null;
  pageLayout: PageLayout | null;
  loading: boolean;
  error: string | null;
  tempTemplate: AppComponentViewModel | null;
  defaultPageLayout: PageLayout;
}

// Initial state
const initialState: ListPageviewDesignState = {
  storeTemplate: null,
  loading: false,
  pageLayout: null,
  error: null,
  tempTemplate: null,
  defaultPageLayout: defaultPageLayout,
};

// Helper function
function isAxiosError(error: unknown): error is Error {
  return error instanceof Error && 'isAxiosError' in error;
}

// Async thunks
export const postTemplate = createAsyncThunk(
  `${SLICE_NAME}/postTemplate`,
  async (template: AppComponentModel, { rejectWithValue }) => {
    try {
      const response = await axios.post<AppComponentViewModel>(
        `${API_BASE_URL}/api/AppComponent/AddOrUpdate`,
        template
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchTemplateById = createAsyncThunk(
  `${SLICE_NAME}/fetchTemplateById`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<AppComponentViewModel>(
        `${API_BASE_URL}/api/AppComponent/GetById/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const listPageviewDesignSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTempTemplate: (state, action: PayloadAction<AppComponentViewModel | null>) => {
      state.tempTemplate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.storeTemplate = action.payload;
      })
      .addCase(postTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTemplateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplateById.fulfilled, (state, action) => {
        state.loading = false;
        state.storeTemplate = action.payload;
        if(!action.payload.model){
          state.pageLayout = state.defaultPageLayout;
          AppComponentFields.map((field: any) => {

            console.log(field);
            state.pageLayout?.columns.push({
              
                name: field,
                fieldName: field,
                text: field,
                textAlignment: "left",
                allowFilter: true,
                allowSort: true,
                actionType: "",
                drawerComponentId: "",
                url: "",
                idField: "",
                drawerWidth: "",
              
            })
          })
        } else {
          state.pageLayout = JSON.parse(action.payload.model.pageLayout);
        }
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { setTempTemplate, clearError } = listPageviewDesignSlice.actions;

// Reducer
export default listPageviewDesignSlice.reducer;
