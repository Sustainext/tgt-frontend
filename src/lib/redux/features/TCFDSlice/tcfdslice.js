// lib/redux/features/TCFDSlice/tcfdSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Message from CEO section
  messageCEO: {
    messageContent: '',
    signatureUrl: '',
  },
  
  // About the Report section
  aboutReport: {
    description: '',
    reportingPeriod: '',
    reportingFrequency: '',
    pointOfContact: '',
  },
  
  // About Company & Operations section
  aboutCompany: {
    companyOverview: '',
    businessModel: '',
    geographicalPresence: '',
    keyOperations: '',
  },
  
  // Governance section
  governance: {
    boardOversight: '',
    tcfdFrameworkDescription: '',
    managementRole: '',
    governanceStructure: '',
    skillsCompetencies: '',
  },
  
  // Strategy section
  strategy: {
    climateRisksOpportunities: '',
    climateRisksOpportunities2: '',
    impactOnBusiness: '',
    resilienceOfStrategy: '',
    scenarioAnalysis: '',
  },
  
  // Risk Management section
  riskManagement: {
    identificationProcess: '',
    assessmentProcess: '',
    managementProcess: '',
    integrationIntoOverall: '',
  },
  
  // Metrics and Targets section
  metricsTargets: {
    climateMetrics: '',
    metricsDescription: '',
    mainContentEmissions: '',
    scope1Emissions: '',
    scope2Emissions: '',
    scope3Emissions: '',
    ghgIntensity: '',
    ghgByScope: '',
    ghgBySource: '',
    ghgByBusiness: '',
    ghgByLocation: '',
    climateTargets: '',
    closingRemarks: '',
    sectorInfo: '',
  },
  
  // General state
  currentSection: 0,
  isLoading: false,
  error: null,
};

const tcfdSlice = createSlice({
  name: 'tcfd',
  initialState,
  reducers: {
    // Message from CEO actions
    setMessageContent: (state, action) => {
      state.messageCEO.messageContent = action.payload;
    },
    setSignatureUrl: (state, action) => {
      state.messageCEO.signatureUrl = action.payload;
    },
    
    // About Report actions
    setAboutReportDescription: (state, action) => {
      state.aboutReport.description = action.payload;
    },
    setReportingPeriod: (state, action) => {
      state.aboutReport.reportingPeriod = action.payload;
    },
    setReportingFrequency: (state, action) => {
      state.aboutReport.reportingFrequency = action.payload;
    },
    setPointOfContact: (state, action) => {
      state.aboutReport.pointOfContact = action.payload;
    },
    
    // About Company actions
    setCompanyOverview: (state, action) => {
      state.aboutCompany.companyOverview = action.payload;
    },
    setBusinessModel: (state, action) => {
      state.aboutCompany.businessModel = action.payload;
    },
    setGeographicalPresence: (state, action) => {
      state.aboutCompany.geographicalPresence = action.payload;
    },
    setKeyOperations: (state, action) => {
      state.aboutCompany.keyOperations = action.payload;
    },
    
    // Governance actions
    setBoardOversight: (state, action) => {
      state.governance.boardOversight = action.payload;
    },
    setTcfdFrameworkDescription: (state, action) => {
      state.governance.tcfdFrameworkDescription = action.payload;
    },
    setManagementRole: (state, action) => {
      state.governance.managementRole = action.payload;
    },
    setGovernanceStructure: (state, action) => {
      state.governance.governanceStructure = action.payload;
    },
    setSkillsCompetencies: (state, action) => {
      state.governance.skillsCompetencies = action.payload;
    },
    
    // Strategy actions
    setClimateRisksOpportunities: (state, action) => {
      state.strategy.climateRisksOpportunities = action.payload;
    },
    setClimateRisksOpportunities2: (state, action) => {
      state.strategy.climateRisksOpportunities2 = action.payload;
    },
    setImpactOnBusiness: (state, action) => {
      state.strategy.impactOnBusiness = action.payload;
    },
    setResilienceOfStrategy: (state, action) => {
      state.strategy.resilienceOfStrategy = action.payload;
    },
    setScenarioAnalysis: (state, action) => {
      state.strategy.scenarioAnalysis = action.payload;
    },
    
    // Risk Management actions
    setIdentificationProcess: (state, action) => {
      state.riskManagement.identificationProcess = action.payload;
    },
    setAssessmentProcess: (state, action) => {
      state.riskManagement.assessmentProcess = action.payload;
    },
    setManagementProcess: (state, action) => {
      state.riskManagement.managementProcess = action.payload;
    },
    setIntegrationIntoOverall: (state, action) => {
      state.riskManagement.integrationIntoOverall = action.payload;
    },
    
    // Metrics and Targets actions
    setClimateMetrics: (state, action) => {
      state.metricsTargets.climateMetrics = action.payload;
    },
    setMetricsDescription: (state, action) => { // New action for 7.1 description
      state.metricsTargets.metricsDescription = action.payload;
    },
    setMainContentEmissions: (state, action) => {
      state.metricsTargets.mainContentEmissions = action.payload;
    },
    setScope1Emissions: (state, action) => {
      state.metricsTargets.scope1Emissions = action.payload;
    },
    setScope2Emissions: (state, action) => {
      state.metricsTargets.scope2Emissions = action.payload;
    },
    setScope3Emissions: (state, action) => {
      state.metricsTargets.scope3Emissions = action.payload;
    },
    setGhgIntensity: (state, action) => {
      state.metricsTargets.ghgIntensity = action.payload;
    },
    setGhgByScope: (state, action) => {
      state.metricsTargets.ghgByScope = action.payload;
    },
    setGhgBySource: (state, action) => {
      state.metricsTargets.ghgBySource = action.payload;
    },
    setGhgByBusiness: (state, action) => {
      state.metricsTargets.ghgByBusiness = action.payload;
    },
    setGhgByLocation: (state, action) => {
      state.metricsTargets.ghgByLocation = action.payload;
    },
    setClimateTargets: (state, action) => {
      state.metricsTargets.climateTargets = action.payload;
    },
    setClosingRemarks: (state, action) => {
  state.metricsTargets.closingRemarks = action.payload;
},
    setSectorInfo: (state, action) => {
      state.metricsTargets.sectorInfo = action.payload;
    },
    
    // General actions
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Reset actions
    resetMessageCEO: (state) => {
      state.messageCEO = initialState.messageCEO;
    },
    resetAboutReport: (state) => {
      state.aboutReport = initialState.aboutReport;
    },
    resetAboutCompany: (state) => {
      state.aboutCompany = initialState.aboutCompany;
    },
    resetGovernance: (state) => {
      state.governance = initialState.governance;
    },
    resetStrategy: (state) => {
      state.strategy = initialState.strategy;
    },
    resetRiskManagement: (state) => {
      state.riskManagement = initialState.riskManagement;
    },
    resetMetricsTargets: (state) => {
      state.metricsTargets = initialState.metricsTargets;
    },
    resetAllSections: (state) => {
      return initialState;
    },
  },
});

export const {
  // Message from CEO
  setMessageContent,
  setSignatureUrl,
  
  // About Report
  setAboutReportDescription,
  setReportingPeriod,
  setReportingFrequency,
  setPointOfContact,
  
  // About Company
  setCompanyOverview,
  setBusinessModel,
  setGeographicalPresence,
  setKeyOperations,
  
  // Governance
  setBoardOversight,
  setTcfdFrameworkDescription,
  setManagementRole,
  setGovernanceStructure,
  setSkillsCompetencies,
  
  // Strategy
  setClimateRisksOpportunities,
  setClimateRisksOpportunities2,
  setImpactOnBusiness,
  setResilienceOfStrategy,
  setScenarioAnalysis,
  
  // Risk Management
  setIdentificationProcess,
  setAssessmentProcess,
  setManagementProcess,
  setIntegrationIntoOverall,
  
  // Metrics and Targets
  setClimateMetrics,
  setMetricsDescription, // New export
  setMainContentEmissions,
  setScope1Emissions,
  setScope2Emissions,
  setScope3Emissions,
  setGhgIntensity,
  setGhgByScope,
  setGhgBySource,
  setGhgByBusiness,
  setGhgByLocation,
  setClimateTargets,
  setClosingRemarks,
  setSectorInfo,
  
  // General
  setCurrentSection,
  setLoading,
  setError,
  
  // Reset actions
  resetMessageCEO,
  resetAboutReport,
  resetAboutCompany,
  resetGovernance,
  resetStrategy,
  resetRiskManagement,
  resetMetricsTargets,
  resetAllSections,
} = tcfdSlice.actions;

// Selectors
export const selectMessageCEO = (state) => state.tcfdReport?.messageCEO || { messageContent: '', signatureUrl: '' };
export const selectAboutReport = (state) => state.tcfdReport?.aboutReport || { description: '', reportingPeriod: '', reportingFrequency: '', pointOfContact: '' };
export const selectAboutCompany = (state) => state.tcfdReport?.aboutCompany || { companyOverview: '', businessModel: '', geographicalPresence: '', keyOperations: '' };
export const selectGovernance = (state) => state.tcfdReport?.governance || { 
  boardOversight: '', 
  tcfdFrameworkDescription: '', 
  managementRole: '', 
  governanceStructure: '', 
  skillsCompetencies: '' 
};
export const selectStrategy = (state) => state.tcfdReport?.strategy || { 
  climateRisksOpportunities: '', 
  climateRisksOpportunities2: '', 
  impactOnBusiness: '', 
  resilienceOfStrategy: '', 
  scenarioAnalysis: '' 
};
export const selectRiskManagement = (state) => state.tcfdReport?.riskManagement || { 
  identificationProcess: '', 
  assessmentProcess: '', 
  managementProcess: '', 
  integrationIntoOverall: '' 
};
export const selectMetricsTargets = (state) => state.tcfdReport?.metricsTargets || { 
  climateMetrics: '', 
  metricsDescription: '', // New field in selector
  mainContentEmissions: '',
  scope1Emissions: '', 
  scope2Emissions: '', 
  scope3Emissions: '', 
  ghgIntensity: '',
  ghgByScope: '',
  ghgBySource: '',
  ghgByBusiness: '',
  ghgByLocation: '',
  climateTargets: '',
  closingRemarks: '', 
  sectorInfo: ''
};
export const selectCurrentSection = (state) => state.tcfdReport?.currentSection || 0;
export const selectIsLoading = (state) => state.tcfdReport?.isLoading || false;
export const selectError = (state) => state.tcfdReport?.error || null;

export default tcfdSlice.reducer;