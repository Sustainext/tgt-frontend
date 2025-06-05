// redux/reportCreationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Form fields
  reportName: '',
  reportType: '',
  reportBy: '',
  selectedOrganization: null,
  selectedCorporate: null,
  startDate: '',
  endDate: '',
  
  // New toggle fields
  includeMaterialTopics: true,
  includeContentIndex: true,
  
  // Investment corporate fields
  investmentCorporates: [],
  
  // Materiality assessment
  selectedAssessmentId: null,
  
  // Data lists
  organizations: [],
  corporates: [],
  
  // UI state
  errors: {},
  isLoading: false,
  reportExists: false,
  selectedOrgName: '',
  selectedCorpName: '',
};

const reportCreationSlice = createSlice({
  name: 'reportCreation',
  initialState,
  reducers: {
    setReportName: (state, action) => {
      state.reportName = action.payload;
      // Clear related errors
      if (state.errors.reportname) {
        delete state.errors.reportname;
      }
    },
    
    setReportType: (state, action) => {
      state.reportType = action.payload;
      if (state.errors.reporttype) {
        delete state.errors.reporttype;
      }
      // Reset investment corporates when changing type
      if (action.payload !== "GHG Report - Investments") {
        state.investmentCorporates = state.investmentCorporates.map(corp => ({
          ...corp,
          checked: false,
          ownershipRatio: ''
        }));
      }
    },
    
    setReportBy: (state, action) => {
      state.reportBy = action.payload;
      if (state.errors.firstSelection) {
        delete state.errors.firstSelection;
      }
      // Reset dependent fields
      state.selectedOrganization = null;
      state.selectedCorporate = null;
      state.corporates = [];
    },
    
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload;
      // Clear org-related errors
      if (state.errors.selectedOrgrs || state.errors.selectedOrgs) {
        delete state.errors.selectedOrgrs;
        delete state.errors.selectedOrgs;
      }
    },
    
    setSelectedCorporate: (state, action) => {
      state.selectedCorporate = action.payload;
      if (state.errors.selectedCorp) {
        delete state.errors.selectedCorp;
      }
    },
    
    setStartDate: (state, action) => {
      state.startDate = action.payload;
      if (state.errors.startdate) {
        delete state.errors.startdate;
      }
    },
    
    setEndDate: (state, action) => {
      state.endDate = action.payload;
      if (state.errors.enddate) {
        delete state.errors.enddate;
      }
    },
    
    setIncludeMaterialTopics: (state, action) => {
      state.includeMaterialTopics = action.payload;
    },
    
    setIncludeContentIndex: (state, action) => {
      state.includeContentIndex = action.payload;
    },
    
    setInvestmentCorporates: (state, action) => {
      state.investmentCorporates = action.payload.map(corp => ({
        ...corp,
        checked: false,
        ownershipRatio: ''
      }));
    },
    
    toggleInvestmentCorporate: (state, action) => {
      const { index } = action.payload;
      const corporate = state.investmentCorporates[index];
      if (corporate) {
        corporate.checked = !corporate.checked;
        if (!corporate.checked) {
          corporate.ownershipRatio = '';
        }
      }
      // Clear investment-related errors
      if (state.errors.investmentEntities) {
        delete state.errors.investmentEntities;
      }
    },
    
    setOwnershipRatio: (state, action) => {
      const { index, value } = action.payload;
      const corporate = state.investmentCorporates[index];
      if (corporate) {
        corporate.ownershipRatio = value;
      }
      // Clear investment-related errors
      if (state.errors.investmentEntities) {
        delete state.errors.investmentEntities;
      }
    },
    
    setSelectedAssessmentId: (state, action) => {
      state.selectedAssessmentId = action.payload;
    },
    
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
    },
    
    setCorporates: (state, action) => {
      state.corporates = action.payload;
    },
    
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setReportExists: (state, action) => {
      state.reportExists = action.payload.exists;
      state.selectedOrgName = action.payload.orgName || '';
      state.selectedCorpName = action.payload.corpName || '';
    },
    
    resetForm: (state) => {
      return {
        ...initialState,
        organizations: state.organizations, // Keep loaded organizations
      };
    },
  },
});

export const {
  setReportName,
  setReportType,
  setReportBy,
  setSelectedOrganization,
  setSelectedCorporate,
  setStartDate,
  setEndDate,
  setIncludeMaterialTopics,
  setIncludeContentIndex,
  setInvestmentCorporates,
  toggleInvestmentCorporate,
  setOwnershipRatio,
  setSelectedAssessmentId,
  setOrganizations,
  setCorporates,
  setErrors,
  setLoading,
  setReportExists,
  resetForm,
} = reportCreationSlice.actions;

// Selectors
export const selectReportName = (state) => state.reportCreation.reportName;
export const selectReportType = (state) => state.reportCreation.reportType;
export const selectReportBy = (state) => state.reportCreation.reportBy;
export const selectSelectedOrganization = (state) => state.reportCreation.selectedOrganization;
export const selectSelectedCorporate = (state) => state.reportCreation.selectedCorporate;
export const selectStartDate = (state) => state.reportCreation.startDate;
export const selectEndDate = (state) => state.reportCreation.endDate;
export const selectIncludeMaterialTopics = (state) => state.reportCreation.includeMaterialTopics;
export const selectIncludeContentIndex = (state) => state.reportCreation.includeContentIndex;
export const selectInvestmentCorporates = (state) => state.reportCreation.investmentCorporates;
export const selectSelectedAssessmentId = (state) => state.reportCreation.selectedAssessmentId;
export const selectOrganizations = (state) => state.reportCreation.organizations;
export const selectCorporates = (state) => state.reportCreation.corporates;
export const selectErrors = (state) => state.reportCreation.errors;
export const selectIsLoading = (state) => state.reportCreation.isLoading;
export const selectReportExists = (state) => state.reportCreation.reportExists;
export const selectSelectedOrgName = (state) => state.reportCreation.selectedOrgName;
export const selectSelectedCorpName = (state) => state.reportCreation.selectedCorpName;

// Complex selectors
export const selectIsFormValid = (state) => {
  const form = state.reportCreation;
  const hasRequiredFields = form.reportName && form.reportType && form.reportBy && 
                           form.selectedOrganization && form.startDate && form.endDate;
  
  if (form.reportBy === "Corporate" && !form.selectedCorporate) {
    return false;
  }
  
  if (form.reportType === "GHG Report - Investments" && form.investmentCorporates.length > 0) {
    const validInvestments = form.investmentCorporates.filter(
      corp => corp.checked && corp.emission_data && corp.ownershipRatio && 
              !isNaN(corp.ownershipRatio) && Number(corp.ownershipRatio) > 0 && 
              Number(corp.ownershipRatio) <= 100
    );
    return hasRequiredFields && validInvestments.length > 0;
  }
  
  return hasRequiredFields;
};

export const selectFormData = (state) => {
  const form = state.reportCreation;
  const selectedEntities = form.investmentCorporates
    .filter(entity => entity.checked)
    .map(entity => ({
      corporate_id: entity.id,
      ownership_ratio: parseInt(entity.ownershipRatio),
    }));

  return {
    name: form.reportName,
    report_type: form.reportType,
    report_by: form.reportBy,
    start_date: form.startDate,
    end_date: form.endDate,
    organization: form.selectedOrganization,
    corporate: form.selectedCorporate,
    investment_corporates: selectedEntities,
    assessment_id: form.selectedAssessmentId,
    include_material_topics: form.includeMaterialTopics,
    include_content_index: form.includeContentIndex,
  };
};

export default reportCreationSlice.reducer;

