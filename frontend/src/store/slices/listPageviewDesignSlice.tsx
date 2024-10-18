import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AppComponentViewModel {
  id: number;
  model: AppComponentModel;
  success: boolean;
  message: string | null;
}

export interface AppComponentModel {
  id: number;
  moduleId: number;
  name: string;
  templateName: string;
  serviceName: string;
  entryFunc: string;
  pageType: string;
  pageLayout: string;
  isActive: boolean;
}

// Define the initial state
interface ListPageviewDesignState {
  storeTemplate: AppComponentViewModel | null;
  loading: boolean;
  error: string | null;
  tempTemplate: AppComponentViewModel | null;
}

const initialState: ListPageviewDesignState = {
  storeTemplate: null,
  loading: false,
  error: null,
  tempTemplate: null,
};

// Type guard function to check if an error is an AxiosError
function isAxiosError(error: unknown): error is Error {
  return error instanceof Error && 'isAxiosError' in error;
}

// Create async thunk for posting the template
export const postTemplate = createAsyncThunk(
  "listPageviewDesign/postTemplate",
  async (template: AppComponentModel, { rejectWithValue }) => {
    try {
      const response = await axios.post<AppComponentViewModel>(
        `${import.meta.env.VITE_BASE_URL}/api/AppComponent/AddOrUpdate`,
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

// Create async thunk for fetching the template by ID
export const fetchTemplateById = createAsyncThunk(
  "listPageviewDesign/fetchTemplateById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<AppComponentViewModel>(
        `${import.meta.env.VITE_BASE_URL}/api/AppComponent/GetById/${id}`
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

// Create the slice
const listPageviewDesignSlice = createSlice({
  name: "listPageviewDesign",
  initialState,
  reducers: {},
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
      })
      .addCase(fetchTemplateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

let d =  {
  "header": {
    "title": "List Page",
    "subTitle": "This is a subtitle",
    "description": "This is a description"
  },
  "actions": [
    {
      "buttonName": "New",
      "actionType": "",
      "drawerConponentId": "id",
      "url": "",
      "functionName": "functionName",
      "visible": true,
      "icon": "",
      "text": "New",
      "position": "",
      "showCaption": true
    }
  ],
  "columns": [
    {
      "name": "id",
      "fieldName": "id",
      "text": "ID",
      "textAlignment": "left",
      "allowFilter": true,
      "allowSort": true,
      "actionType": "",
      "drawerComponentId": "",
      "url": "",
      "idField": "id",
      "drawerWidth": ""
    }
  ]
}

export default listPageviewDesignSlice.reducer;

