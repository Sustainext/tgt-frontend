import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../app/utils/axiosMiddleware";

// Async thunk for fetching departments
export const fetchDepartments = createAsyncThunk(
  "roles-permissions/fetchDepartments",
  async (searchTerm) => {
    const response = await axiosInstance.get(
      `/sustainapp/department/?search=${searchTerm}`
    );
    return response.data;
  }
);

// Async thunk for adding new department
export const addNewDepartment = createAsyncThunk(
  "roles-permissions/addNewDepartment",
  async (departmentName) => {
    const response = await axiosInstance.post("/sustainapp/department/", {
      name: departmentName,
    });
    return response.data;
  }
);

const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  job_title: "",
  department: "",
  work_email: "",
  role_type: "",
  collect: true,
  analyse: true,
  report: false,
  optimise: false,
  track: false,
  permissions_checkbox: false,
  org_list: [],
  corp_list: [],
  loc_list: [],
  userlist: [],
  departmentsList: [],
  departmentsLoading: false,
  departmentsError: null,
};

export const Rolespermissionsslice = createSlice({
  name: "roles-permissions",
  initialState,
  reducers: {
    setfirstname: (state, action) => {
      state.first_name = action.payload;
    },
    setlastname: (state, action) => {
      state.last_name = action.payload;
    },
    setjobtitle: (state, action) => {
      state.job_title = action.payload;
    },
    setdepartment: (state, action) => {
      state.department = action.payload;
    },
    setworkemail: (state, action) => {
      state.work_email = action.payload;
    },
    setroletype: (state, action) => {
      state.role_type = action.payload;
    },
    setphonenumber: (state, action) => {
      state.phone_number = action.payload;
    },
    setOrgList: (state, action) => {
      state.org_list = action.payload;
    },
    setCorpList: (state, action) => {
      state.corp_list = action.payload;
    },
    setLocList: (state, action) => {
      state.loc_list = action.payload;
    },
    setCollect: (state, action) => {
      state.collect = action.payload;
    },
    setAnalyse: (state, action) => {
      state.analyse = action.payload;
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
    setOptimise: (state, action) => {
      state.optimise = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    setPermissionscheckbox: (state, action) => {
      state.permissions_checkbox = action.payload;
    },
    setUserlist: (state, action) => {
      state.userlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchDepartments
      .addCase(fetchDepartments.pending, (state) => {
        state.departmentsLoading = true;
        state.departmentsError = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departmentsLoading = false;
        state.departmentsList = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departmentsLoading = false;
        state.departmentsError = action.error.message;
      })
      // Handle addNewDepartment
      .addCase(addNewDepartment.fulfilled, (state, action) => {
        state.department = action.payload.name;
        state.departmentsList = [...state.departmentsList, action.payload];
      });
  },
});

export const {
  setfirstname,
  setlastname,
  setjobtitle,
  setdepartment,
  setworkemail,
  setroletype,
  setphonenumber,
  setOrgList,
  setCorpList,
  setLocList,
  setCollect,
  setAnalyse,
  setReport,
  setOptimise,
  setTrack,
  setPermissionscheckbox,
  setUserlist,
} = Rolespermissionsslice.actions;
export default Rolespermissionsslice.reducer;
