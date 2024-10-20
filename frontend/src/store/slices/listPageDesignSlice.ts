import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppComponentViewModel, AppComponentModel, PageLayout } from "../../models/listModel";

// Constants
const SLICE_NAME = "listPageviewDesign";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// State interface
interface ListPageviewDesignState {
  storeTemplate: AppComponentViewModel | null;
  pageLayout: PageLayout | null;
  loading: boolean;
  error: string | null;
  tempTemplate: AppComponentViewModel | null;
}

// Initial state
const initialState: ListPageviewDesignState = {
  storeTemplate: null,
  loading: false,
  pageLayout: null,
  error: null,
  tempTemplate: null,
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
        state.pageLayout = JSON.parse(action.payload.model.pageLayout);
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
