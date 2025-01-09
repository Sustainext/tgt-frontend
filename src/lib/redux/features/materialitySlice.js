import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../app/utils/axiosMiddleware";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")?.replace(/"/g, "");
  }
  return "";
};

export const fetchMaterialityData = createAsyncThunk(
  "materiality/fetchMaterialityData",
  async ({ corporate, organization, start_date, end_date }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const queryParams = new URLSearchParams({
        corporate,
        organization,
        start_date,
        end_date,
      }).toString();

      const response = await axiosInstance.get(
        `materiality_dashboard/get_material_topics_with_disclosures_with_path_slugs/?${queryParams}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const materialitySlice = createSlice({
  name: "materiality",
  initialState: {
    userData: {},
    organization_id: "",
    organization_name: "",
    corporate_id: "",
    corporate_name: "",
    materiality_year: "",
    start_date: "",
    end_date: "",
    assessment_year:"",
    is_year_changed:false,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOrgID: (state, action) => {
      state.organization_id = action.payload;
    },
    setOrgName: (state, action) => {
      state.organization_name = action.payload;
    },
    setCorpID: (state, action) => {
      state.corporate_id = action.payload;
    },
    setCorpName: (state, action) => {
      state.corporate_name = action.payload;
    },
    setMaterialityYear: (state, action) => {
      state.materiality_year = action.payload;
    },
    setStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    setAssessmentYear: (state, action) => {
      state.assessment_year = action.payload;
    },
    setIsYearChanged: (state, action) => {
      state.is_year_changed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialityData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        if(action.payload.organisation&&action.payload.organisation_name){
            state.organization_id = action.payload.organisation;
            state.organization_name = action.payload.organisation_name; 
        }
        if(action.payload.corporate && action.payload.corporate_name){
            state.corporate_id = action.payload.corporate; 
            state.corporate_name = action.payload.corporate_name; 
        }
        if(action.payload.year){
            state.materiality_year = action.payload.year;
            state.assessment_year=action.payload.year; 
        }
        if(action.payload.start_date && action.payload.end_date){
            state.start_date = action.payload.start_date;  
        state.end_date = action.payload.end_date;  
        }
      
        
        
        
      })
      .addCase(fetchMaterialityData.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.payload;
        state.data = '';
        state.organization_id = '';

state.organization_name = ''
state.corporate_id = ''; 
     
state.corporate_name = '';
state.materiality_year = ''; 
state.assessment_year='';
      
state.start_date = ''; 
state.end_date = '';   
     
      });
  },
});

export const {
  setUserData,
  setOrgID,
  setOrgName,
  setCorpID,
  setCorpName,
  setMaterialityYear,
  setStartDate,
  setEndDate,
  setAssessmentYear,
  setIsYearChanged
} = materialitySlice.actions;

export default materialitySlice.reducer;
