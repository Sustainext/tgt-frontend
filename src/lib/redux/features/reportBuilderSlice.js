// store/slices/reportBuilderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Default sections - keeping original IDs for compatibility but mapping to camelCase internally
const defaultSections = [
  { 
    id: 'about_company', 
    title: 'About the Company & Operations', 
    mandatory: true,
    enabled: true,
    order: 1
  },
  { 
    id: 'message_ceo', 
    title: 'Message From Our Leadership', 
    mandatory: true,
    enabled: true,
    order: 2
  },
  { 
    id: 'mission_vision', 
    title: 'Mission, Vision, Value', 
    mandatory: true,
    enabled: true,
    order: 3
  },
  { 
    id: 'sustainability', 
    title: 'Sustainability Roadmap', 
    mandatory: true,
    enabled: true,
    order: 4
  },
  { 
    id: 'awards', 
    title: 'Awards & Alliances', 
    mandatory: true,
    enabled: true,
    order: 5
  },
  { 
    id: 'stakeholder', 
    title: 'Stakeholder Engagement', 
    mandatory: true,
    enabled: true,
    order: 6
  },
  { 
    id: 'about_report', 
    title: 'About the Report', 
    mandatory: false,
    enabled: false,
    order: 7
  },
  { 
    id: 'governance', 
    title: 'Corporate Governance', 
    mandatory: false,
    enabled: false,
    order: 8
  },
  { 
    id: 'journey', 
    title: 'Sustainability Journey', 
    mandatory: false,
    enabled: false,
    order: 9
  },
  { 
    id: 'economic', 
    title: 'Economic Performance', 
    mandatory: false,
    enabled: false,
    order: 10
  },
  { 
    id: 'environment', 
    title: 'Environment', 
    mandatory: false,
    enabled: false,
    order: 11
  },
  { 
    id: 'people', 
    title: 'People', 
    mandatory: false,
    enabled: false,
    order: 12
  },
  { 
    id: 'community', 
    title: 'Community', 
    mandatory: false,
    enabled: false,
    order: 13
  },
  { 
    id: 'customers', 
    title: 'Customers, Products & Services', 
    mandatory: false,
    enabled: false,
    order: 14
  },
  { 
    id: 'materiality', 
    title: 'Materiality', 
    mandatory: false,
    enabled: false,
    order: 15
  },
];

// Default subsections - using original snake_case IDs for compatibility
const defaultSubsections = {
  about_company: [
    { 
      id: 'business_model', 
      label: 'Business Model and Impact',
      enabled: true,
      children: [
        { 
          id: 'value_chain', 
          label: 'Activities, Value Chain and Business Relationships',
          enabled: true
        },
        { 
          id: 'excluded_entities', 
          label: 'Entities Included in the Organization\'s Sustainability Reporting',
          enabled: true
        },
      ]
    },
    { 
      id: 'supply_chain', 
      label: 'Supply Chain',
      enabled: true
    },
  ],
  message_ceo: [
    { 
      id: 'chief_executive_message', 
      label: 'Chief Executive Message',
      enabled: true
    },
    { 
      id: 'board_message', 
      label: 'Board Message',
      enabled: true
    },
  ],
  mission_vision: [
    { 
      id: 'mission_statement', 
      label: 'Mission Statement',
      enabled: true
    },
    { 
      id: 'vision_statement', 
      label: 'Vision Statement',
      enabled: true
    },
    { 
      id: 'core_values', 
      label: 'Core Values',
      enabled: true
    },
  ],
  sustainability: [
    { 
      id: 'sustainability_strategy', 
      label: 'Sustainability Strategy',
      enabled: true
    },
    { 
      id: 'goals_and_targets', 
      label: 'Goals and Targets',
      enabled: true
    },
    { 
      id: 'roadmap_timeline', 
      label: 'Roadmap Timeline',
      enabled: true
    },
  ],
  awards: [
    { 
      id: 'sustainability_awards', 
      label: 'Sustainability Awards',
      enabled: true
    },
    { 
      id: 'industry_recognition', 
      label: 'Industry Recognition',
      enabled: true
    },
    { 
      id: 'strategic_alliances', 
      label: 'Strategic Alliances',
      enabled: true
    },
  ],
  stakeholder: [
    { 
      id: 'stakeholder_identification', 
      label: 'Stakeholder Identification',
      enabled: true
    },
    { 
      id: 'engagement_strategy', 
      label: 'Engagement Strategy',
      enabled: true
    },
    { 
      id: 'feedback_mechanisms', 
      label: 'Feedback Mechanisms',
      enabled: true
    },
  ],
  about_report: [
    { 
      id: 'reporting_scope', 
      label: 'Reporting Scope',
      enabled: true
    },
    { 
      id: 'reporting_period', 
      label: 'Reporting Period',
      enabled: true
    },
    { 
      id: 'reporting_standards', 
      label: 'Reporting Standards',
      enabled: true
    },
  ],
  governance: [
    { 
      id: 'governance_structure', 
      label: 'Governance Structure',
      enabled: true
    },
    { 
      id: 'board_composition', 
      label: 'Board Composition',
      enabled: true
    },
    { 
      id: 'ethics_and_compliance', 
      label: 'Ethics and Compliance',
      enabled: true
    },
  ],
  journey: [
    { 
      id: 'historical_milestones', 
      label: 'Historical Milestones',
      enabled: true
    },
    { 
      id: 'key_initiatives', 
      label: 'Key Initiatives',
      enabled: true
    },
    { 
      id: 'future_commitments', 
      label: 'Future Commitments',
      enabled: true
    },
  ],
  economic: [
    { 
      id: 'financial_performance', 
      label: 'Financial Performance',
      enabled: true
    },
    { 
      id: 'economic_impact', 
      label: 'Economic Impact',
      enabled: true
    },
    { 
      id: 'value_creation', 
      label: 'Value Creation',
      enabled: true
    },
  ],
  environment: [
    { 
      id: 'climate_action', 
      label: 'Climate Action',
      enabled: true
    },
    { 
      id: 'resource_management', 
      label: 'Resource Management',
      enabled: true
    },
    { 
      id: 'waste_management', 
      label: 'Waste Management',
      enabled: true
    },
    { 
      id: 'biodiversity_conservation', 
      label: 'Biodiversity Conservation',
      enabled: true
    },
  ],
  people: [
    { 
      id: 'employee_wellbeing', 
      label: 'Employee Wellbeing',
      enabled: true
    },
    { 
      id: 'diversity_and_inclusion', 
      label: 'Diversity and Inclusion',
      enabled: true
    },
    { 
      id: 'talent_development', 
      label: 'Talent Development',
      enabled: true
    },
    { 
      id: 'health_and_safety', 
      label: 'Health and Safety',
      enabled: true
    },
  ],
  materiality: [
    { 
      id: 'list_of_materials', 
      label: 'List of material topics',
      enabled: true
    },
    { 
      id: 'topic_changes', 
      label: 'Changes in the list of material topics',
      enabled: true
    },
    { 
      id: 'materiality_process', 
      label: 'Materiality assessment – Process',
      enabled: true
    },
    { 
      id: 'management_strategy', 
      label: 'Management of material topic',
      enabled: true
    },
  ],
  community: [
    {
      id: 'community_management',
      label: 'Management of material topic',
      enabled: true,
      children: [
        { 
          id: 'violation_rights', 
          label: 'Incidents of Violation of Rights of Indigenous People',
          enabled: true
        }
      ]
    },
    { 
      id: 'csr', 
      label: 'CSR',
      enabled: true
    },
    { 
      id: 'community_investment', 
      label: 'Community Investment',
      enabled: true
    },
    { 
      id: 'local_partnerships', 
      label: 'Local Partnerships',
      enabled: true
    },
  ],
  customers: [
    {
      id: 'products_services',
      label: 'Products and services',
      enabled: true,
      children: [
        { 
          id: 'safety_impact', 
          label: 'Health and safety impacts of product and service categories',
          enabled: true
        },
        { 
          id: 'non_compliance', 
          label: 'Incidents of non-compliance',
          enabled: true
        }
      ]
    },
    {
      id: 'product_labeling',
      label: 'Product and service information & labeling',
      enabled: true,
      children: [
        { 
          id: 'label_management', 
          label: 'Management of material topic',
          enabled: true
        }
      ]
    },
    { 
      id: 'customer_satisfaction', 
      label: 'Customer Satisfaction',
      enabled: true
    },
    { 
      id: 'product_innovation', 
      label: 'Product Innovation',
      enabled: true
    },
  ],
};

// Component mapping for sections - using original IDs
const sectionComponentMapping = {
  about_company: 'AboutCompany',
  message_ceo: 'MessageCEO',
  mission_vision: 'MissionVision',
  sustainability: 'SustainabilityRoadmap',
  awards: 'Awards',
  stakeholder: 'StakeholderEngagement',
  about_report: 'AboutReport',
  governance: 'Governance',
  journey: 'Journey',
  economic: 'Economic',
  environment: 'Environment',
  people: 'People',
  community: 'Community',
  customers: 'Customers',
  materiality: 'Materiality',
};

const initialState = {
  // Step management
  currentStep: 0,
  totalSteps: 3,
  
  // Section management (Level 1)
  sections: defaultSections,
  
  // Subsection management (Level 2)
  subsections: defaultSubsections,
  
  // Sub-subsection selections (Level 3)
  selectedSubsections: {},
  
  // Component mapping
  componentMapping: sectionComponentMapping,
  
  // Report navigation - NEW
  currentReportPage: 0, // Index of currently viewed section in report
  reportSections: [], // Array of enabled sections for report navigation
  
  // UI State
  isLoading: false,
  error: null,
  
  // Modal state
  isSectionEditorOpen: false,
  isSubsectionEditorOpen: false,
};

const reportBuilderSlice = createSlice({
  name: 'reportBuilder',
  initialState,
  reducers: {
    // Step management
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    
    // Section management (Level 1)
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    
    toggleSectionEnabled: (state, action) => {
      const sectionId = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      if (section && !section.mandatory) {
        section.enabled = !section.enabled;
      }
    },
    
    reorderSections: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const sections = [...state.sections];
      const [removed] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, removed);
      
      // Update order numbers
      sections.forEach((section, index) => {
        section.order = index + 1;
      });
      
      state.sections = sections;
    },
    
    moveSectionBetweenContainers: (state, action) => {
      const { sectionId, targetEnabled } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      if (section && !section.mandatory) {
        section.enabled = targetEnabled;
        
        // Reorder sections
        const enabledSections = state.sections.filter(s => s.enabled);
        const disabledSections = state.sections.filter(s => !s.enabled);
        
        enabledSections.forEach((section, index) => {
          section.order = index + 1;
        });
        
        disabledSections.forEach((section, index) => {
          section.order = enabledSections.length + index + 1;
        });
      }
    },
    
    // Subsection management (Level 2)
    setSubsections: (state, action) => {
      state.subsections = action.payload;
    },
    
    toggleSubsectionEnabled: (state, action) => {
      const { sectionId, subsectionId } = action.payload;
      const sectionSubsections = state.subsections[sectionId];
      if (sectionSubsections) {
        const subsection = sectionSubsections.find(s => s.id === subsectionId);
        if (subsection) {
          subsection.enabled = !subsection.enabled;
        }
      }
    },
    
    // Sub-subsection management (Level 3)
    setSelectedSubsections: (state, action) => {
      state.selectedSubsections = action.payload;
    },
    
    toggleSubSubsectionEnabled: (state, action) => {
      const { sectionId, subsectionId, subSubsectionId } = action.payload;
      const sectionSubsections = state.subsections[sectionId];
      if (sectionSubsections) {
        const subsection = sectionSubsections.find(s => s.id === subsectionId);
        if (subsection && subsection.children) {
          const subSubsection = subsection.children.find(s => s.id === subSubsectionId);
          if (subSubsection) {
            subSubsection.enabled = !subSubsection.enabled;
          }
        }
      }
    },
    
    updateSelectedSubsections: (state, action) => {
      const { sectionId, subsectionIds } = action.payload;
      state.selectedSubsections[sectionId] = subsectionIds;
    },
    
    // Bulk operations
    enableAllMandatorySections: (state) => {
      state.sections.forEach(section => {
        if (section.mandatory) {
          section.enabled = true;
        }
      });
    },
    
    resetToDefaults: (state) => {
      state.sections = defaultSections;
      state.subsections = defaultSubsections;
      state.selectedSubsections = {};
      state.currentStep = 0;
      state.error = null;
    },
    
    // Modal management
    setSectionEditorOpen: (state, action) => {
      state.isSectionEditorOpen = action.payload;
    },
    
    setSubsectionEditorOpen: (state, action) => {
      state.isSubsectionEditorOpen = action.payload;
    },
    
    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Report navigation actions - NEW
    setCurrentReportPage: (state, action) => {
      const pageIndex = action.payload;
      const enabledSections = state.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
      if (pageIndex >= 0 && pageIndex < enabledSections.length) {
        state.currentReportPage = pageIndex;
      }
    },
    
    nextReportPage: (state) => {
      const enabledSections = state.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
      if (state.currentReportPage < enabledSections.length - 1) {
        state.currentReportPage += 1;
      }
    },
    
    previousReportPage: (state) => {
      if (state.currentReportPage > 0) {
        state.currentReportPage -= 1;
      }
    },
    
    initializeReportNavigation: (state) => {
      const enabledSections = state.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
      state.reportSections = enabledSections;
      state.currentReportPage = 0;
    },
    // Local storage sync
    loadFromLocalStorage: (state, action) => {
      const { sections, subsections, selectedSubsections, step } = action.payload;
      if (sections) state.sections = sections;
      if (subsections) state.subsections = subsections;
      if (selectedSubsections) state.selectedSubsections = selectedSubsections;
      if (step !== undefined) state.currentStep = step;
    },
  },
});

export const {
  // Step management
  setCurrentStep,
  nextStep,
  previousStep,
  
  // Section management
  setSections,
  toggleSectionEnabled,
  reorderSections,
  moveSectionBetweenContainers,
  
  // Subsection management
  setSubsections,
  toggleSubsectionEnabled,
  
  // Sub-subsection management
  setSelectedSubsections,
  toggleSubSubsectionEnabled,
  updateSelectedSubsections,
  
  // Report navigation - NEW
  setCurrentReportPage,
  nextReportPage,
  previousReportPage,
  initializeReportNavigation,
  
  // Bulk operations
  enableAllMandatorySections,
  resetToDefaults,
  
  // Modal management
  setSectionEditorOpen,
  setSubsectionEditorOpen,
  
  // Error handling
  setError,
  clearError,
  
  // Loading state
  setLoading,
  
  // Local storage sync
  loadFromLocalStorage,
} = reportBuilderSlice.actions;

// Selectors
export const selectCurrentStep = (state) => state.reportBuilder.currentStep;
export const selectTotalSteps = (state) => state.reportBuilder.totalSteps;
export const selectSections = (state) => state.reportBuilder.sections;
export const selectEnabledSections = (state) => 
  state.reportBuilder.sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);
export const selectDisabledSections = (state) => 
  state.reportBuilder.sections.filter(section => !section.enabled).sort((a, b) => a.order - b.order);
export const selectSubsections = (state) => state.reportBuilder.subsections;
export const selectSelectedSubsections = (state) => state.reportBuilder.selectedSubsections;
export const selectComponentMapping = (state) => state.reportBuilder.componentMapping;
export const selectIsSectionEditorOpen = (state) => state.reportBuilder.isSectionEditorOpen;
export const selectIsSubsectionEditorOpen = (state) => state.reportBuilder.isSubsectionEditorOpen;
export const selectIsLoading = (state) => state.reportBuilder.isLoading;
export const selectError = (state) => state.reportBuilder.error;

// Complex selectors
export const selectSubsectionsForSection = (sectionId) => (state) => 
  state.reportBuilder.subsections[sectionId] || [];

export const selectEnabledSubsectionsForSection = (sectionId) => (state) => {
  const subsections = state.reportBuilder.subsections[sectionId] || [];
  return subsections.filter(sub => sub.enabled);
};

export const selectSectionById = (sectionId) => (state) => 
  state.reportBuilder.sections.find(section => section.id === sectionId);

//NEW Report navigation selectors
export const selectCurrentReportPage = (state) => state.reportBuilder.currentReportPage;
export const selectReportSections = (state) => state.reportBuilder.reportSections;
export const selectCurrentReportSection = (state) => {
  const enabledSections = state.reportBuilder.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  return enabledSections[state.reportBuilder.currentReportPage] || null;
};
export const selectCanGoToNextPage = (state) => {
  const enabledSections = state.reportBuilder.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  return state.reportBuilder.currentReportPage < enabledSections.length - 1;
};
export const selectCanGoToPreviousPage = (state) => state.reportBuilder.currentReportPage > 0;

export const selectCanProceedToNextStep = (state) => {
  const { currentStep, sections } = state.reportBuilder;
  
  switch (currentStep) {
    case 0: // Section selection step
      return sections.some(section => section.enabled);
    case 1: // Subsection selection step
      return Object.keys(state.reportBuilder.selectedSubsections).length > 0;
    default:
      return true;
  }
};

export default reportBuilderSlice.reducer;