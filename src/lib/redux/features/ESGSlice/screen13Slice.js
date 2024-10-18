import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/utils/axiosMiddleware";


const Screen13Slice = createSlice({
  name: 'People',
  initialState: {
    employee_policies_statement:'',
    workforce_hire_retention_statement:'',
    standard_wage:'',
    performance_review_process:'',
    forced_labor_position:'',
    child_labor_position:'',
    employee_diversity_position:'',
    employee_skill_upgrade_programs:'',
    remuneration_practices:'',
    ohs_policies:'',
    hazard_risk_assessment:'',
    work_related_health_injuries:'',
    safety_training:'',
    ohs_management_system:'',
    freedom_of_association_views:'',
    violation_discrimination_policy:'',
    indigenous_rights_policy:'',
    parental_leaves:'',
    error: null
  },
  reducers: {
    setEmployeePoliciesStatement: (state, action) => {
      state.employee_policies_statement = action.payload;
    },
    setWorkforceHireRetentionStatement: (state, action) => {
      state.workforce_hire_retention_statement = action.payload;
    },
    setStandardWage: (state, action) => {
      state.standard_wage = action.payload;
    },
    setPerformanceReviewProcess: (state, action) => {
      state.performance_review_process = action.payload;
    },
    setForcedLaborPosition: (state, action) => {
      state.forced_labor_position = action.payload;
    },
    setChildLaborPosition: (state, action) => {
      state.child_labor_position = action.payload;
    },
    setEmployeeDiversityPosition: (state, action) => {
      state.employee_diversity_position = action.payload;
    },
    setEmployeeSkillUpgradePrograms: (state, action) => {
      state.employee_skill_upgrade_programs = action.payload;
    },
    setRemunerationPractices: (state, action) => {
      state.remuneration_practices = action.payload;
    },
    setOHSPolicies: (state, action) => {
      state.ohs_policies = action.payload;
    },
    setHazardRiskAssessment: (state, action) => {
      state.hazard_risk_assessment = action.payload;
    },
    setWorkRelatedHealthInjuries: (state, action) => {
      state.work_related_health_injuries = action.payload;
    },
    setSafetyTraining: (state, action) => {
      state.safety_training = action.payload;
    },
    setOHSManagementSystem: (state, action) => {
      state.ohs_management_system = action.payload;
    },
    setFreedomOfAssociationViews: (state, action) => {
      state.freedom_of_association_views = action.payload;
    },
    setViolationDiscriminationPolicy: (state, action) => {
      state.violation_discrimination_policy = action.payload;
    },
    setIndigenousRightsPolicy: (state, action) => {
      state.indigenous_rights_policy = action.payload;
    },
    setParentalLeaves: (state, action) => {
      state.parental_leaves = action.payload;
    },
  },
});

export const {
    setEmployeePoliciesStatement,
    setWorkforceHireRetentionStatement,
    setStandardWage,
    setPerformanceReviewProcess,
    setForcedLaborPosition,
    setChildLaborPosition,
    setEmployeeDiversityPosition,
    setEmployeeSkillUpgradePrograms,
    setRemunerationPractices,
    setOHSPolicies,
    setHazardRiskAssessment,
    setWorkRelatedHealthInjuries,
    setSafetyTraining,
    setOHSManagementSystem,
    setFreedomOfAssociationViews,
    setViolationDiscriminationPolicy,
    setIndigenousRightsPolicy,
    setParentalLeaves,
} = Screen13Slice.actions;


export default Screen13Slice.reducer;
