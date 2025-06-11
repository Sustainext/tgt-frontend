// store/slices/reportBuilderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Default sections - keeping original IDs for compatibility but mapping to camelCase internally
const defaultSections = [
  {
    id: 'message_ceo',
    title: 'Message From Our Leadership',
    mandatory: false,
    enabled: false,
    order: 1
  },
    {
    id: 'about_company',
    title: 'About the Company & Operations',
    mandatory: false,
    enabled: false,
    order: 2
  },
  {
    id: 'mission_vision',
    title: 'Mission, Vision, Value',
    mandatory: false,
    enabled: false,
    order: 3
  },
  {
    id: 'sustainability',
    title: 'Sustainability Roadmap',
    mandatory: false,
    enabled: false,
    order: 4
  },
  {
    id: 'awards',
    title: 'Awards & Alliances',
    mandatory: false,
    enabled: false,
    order: 5
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder Engagement',
    mandatory: false,
    enabled: false,
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
    id: 'materiality',
    title: 'Materiality',
    mandatory: false,
    enabled: false,
    order: 8
  },
  {
    id: 'governance',
    title: 'Corporate Governance',
    mandatory: false,
    enabled: false,
    order: 9
  },
  {
    id: 'journey',
    title: 'Sustainability Journey',
    mandatory: false,
    enabled: false,
    order: 10
  },
  {
    id: 'economic',
    title: 'Economic Performance',
    mandatory: false,
    enabled: false,
    order: 11
  },
  {
    id: 'environment',
    title: 'Environment',
    mandatory: false,
    enabled: false,
    order: 12
  },
  {
    id: 'people',
    title: 'People',
    mandatory: false,
    enabled: false,
    order: 13
  },
  {
    id: 'community',
    title: 'Community',
    mandatory: false,
    enabled: false,
    order: 14
  },
  {
    id: 'customers',
    title: 'Customers, Products & Services',
    mandatory: false,
    enabled: false,
    order: 15
  }
];

// Default subsections - using original snake_case IDs for compatibility
const defaultSubsections = {
message_ceo: [
        { 
          id: 'chief_executive_message', 
          label: ' Message from CEO',
          enabled: false
        },
],  
  about_company: [
    { 
      id: 'business_model', 
      label: 'Business Model and Impact',
      enabled: false,
      children: [
        { 
          id: 'value_chain', 
          label: 'Activities, Value Chain and Business Relationships',
          enabled: false
        },
        { 
          id: 'excluded_entities', 
          label: 'Entities Included in the Organization\'s Sustainability Reporting',
          enabled: false
        },
      ]
    },
    { 
      id: 'supply_chain', 
      label: 'Supply Chain',
      enabled: false
    },
  ],
  mission_vision: [
    { 
      id: 'mission_vision', 
      label: 'Mission, Vision, and Values',
      enabled: false
    }
  ],
  sustainability: [
    { 
      id: 'sustainability_roadmap', 
      label: 'Sustainability Roadmap',
      enabled: false
    },
  ],
  awards: [
    { 
      id: ' awards_and_recognition', 
      label: ' Awards & Recognition',
      enabled: false
    },
  ],
  stakeholder: [
    { 
      id: 'approach_to_stakeholder_engagement', 
      label: 'Approach to stakeholder engagement',
      enabled: false
    },
  ],
  about_report: [
    { 
      id: 'reporting_period', 
      label: 'Reporting period, frequency and point of contact',
      enabled: false,
      children: [
        { 
          id: 'restatement_information', 
          label: 'Restatement of information',
          enabled: false
        }
      ]
    },
    { 
      id: 'frameworks', 
      label: 'Frameworks',
      enabled: false
    },
    { 
      id: 'external_assurance', 
      label: 'External Assurance',
      enabled: false
    },
  ],
  materiality: [
    { 
      id: 'materiality_assessment ', 
      label: 'Materiality Assessment',
      enabled: false,
      children: [
        { 
          id: 'list_of_material_topic', 
          label: 'List of material topics',
          enabled: false
        },
        { 
            id: 'topic_changes', 
            label: 'Changes in the list of material topics',
            enabled: false
          },
          { 
            id: 'materiality_process', 
            label: 'Materiality assessment – Process',
            enabled: false
          },
          { 
            id: 'management_of_material_topic', 
            label: 'Management of material topic',
            enabled: false
          },
      ]
    },
    
  ],
  governance: [
    {
      id: 'board_of_directors',
      label: 'Board of Directors',
      enabled: false,
      children: [
        {
          id: 'governance_structure_composition',
          label: 'Governance structure and composition',
          enabled: false
        }
      ]
    },
    {
      id: 'general_governance',
      label: 'General Governance',
      enabled: false,
      children: [
        {
          id: 'nomination_selection',
          label: 'Nomination, selection of the highest governance body',
          enabled: false
        },
        {
          id: 'chair_highest_governance_body',
          label: 'Chair of the highest governance body',
          enabled: false
        },
        {
          id: 'senior_management_local',
          label: 'Senior management hired from local community',
          enabled: false
        },
        {
          id: 'management_of_material_topic',
          label: 'Management of material topic',
          enabled: false
        }
      ]
    },
    {
      id: 'board_responsibility_evaluation_remuneration',
      label: 'Responsibility, Evaluation and Remuneration of the Board',
      enabled: false,
      children: [
        {
          id: 'role_highest_governance_body',
          label: 'Role of the highest governance body',
          enabled: false
        },
        {
          id: 'collective_knowledge',
          label: 'Collective knowledge of the highest governance body',
          enabled: false
        },
        {
          id: 'sustainability_reporting_role',
          label: 'Role of the highest governance body in sustainability reporting',
          enabled: false
        },
        {
          id: 'delegation_of_responsibility',
          label: 'Delegation of responsibility for managing impacts',
          enabled: false
        },
        {
          id: 'communication_critical_concerns',
          label: 'Communication of critical concerns',
          enabled: false
        },
        {
          id: 'performance_evaluation',
          label: 'Evaluation of the performance of the highest governance body',
          enabled: false
        },
        {
          id: 'remuneration_policies_process',
          label: 'Remuneration policies & process to determine remuneration',
          enabled: false
        },
        {
          id: 'annual_compensation_ratio',
          label: 'Annual compensation ratio',
          enabled: false
        }
      ]
    },
    {
      id: 'strategy',
      label: 'Strategy',
      enabled: false,
      children: [
        {
          id: 'sustainable_strategy_statement',
          label: 'Statement on sustainable development strategy',
          enabled: false
        },
        {
          id: 'membership_association',
          label: 'Membership association',
          enabled: false
        }
      ]
    },
    {
      id: 'risk_management',
      label: 'Risk Management',
      enabled: false,
      children: [
        {
          id: 'remediation_negative_impacts',
          label: 'Remediation of negative impacts',
          enabled: false
        },
        {
          id: 'advice_mechanism',
          label: 'Mechanism for seeking advice and raising concerns',
          enabled: false
        },
        {
          id: 'compliance',
          label: 'Compliance',
          enabled: false
        }
      ]
    },
    {
      id: 'policy',
      label: 'Policy',
      enabled: false,
      children: [
        {
          id: 'embedding_policy_commitment',
          label: 'Embedding policy commitment',
          enabled: false
        },
        {
          id: 'anti_trust_behavior',
          label: 'Anti-trust, anti-competitive behavior, monopoly practices',
          enabled: false
        },
        {
          id: 'retirement_benefits',
          label: 'Defined benefit plan obligations and other retirement plans',
          enabled: false
        }
      ]
    },
    {
      id: 'conflict_of_interest',
      label: 'Conflict of interest',
      enabled: false
    }
  ],  
  journey: [
    {
      id: 'sustainability_management_approach',
      label: 'Management approach for sustainability/ESG topics',
      enabled: false
    },
    {
      id: 'company_sustainability',
      label: "Company's Sustainability",
      enabled: false
    },
    {
      id: 'supply_chain_sustainability',
      label: 'Supply Chain Sustainability',
      enabled: false,
      children: [
        {
          id: 'supply_chain_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'local_suppliers',
          label: 'Local Suppliers',
          enabled: false
        },
        {
          id: 'negative_impacts_in_supply_chain',
          label: 'Negative environmental & social impacts in the supply chain',
          enabled: false
        }
      ]
    }
  ],  
  economic: [
    {
      id: 'economic_highlights',
      label: 'Highlights',
      enabled: false,
      children: [
        {
          id: 'highlights_material_topic_management',
          label: 'Management of Material Topics',
          enabled: false
        },
        {
          id: 'economic_value_creation',
          label: 'Economic value creation',
          enabled: false
        },
        {
          id: 'financial_assistance_government',
          label: 'Financial assistance received from government',
          enabled: false
        }
      ]
    },
    {
      id: 'infrastructure_investment',
      label: 'Infrastructure investment and services supported',
      enabled: false,
      children: [
        {
          id: 'infrastructure_material_topic_management',
          label: 'Management of Material Topics',
          enabled: false
        },
        {
          id: 'indirect_economic_impacts',
          label: 'Indirect economic impacts',
          enabled: false
        }
      ]
    },
    {
      id: 'climate_financials',
      label: 'Climate-related financial implications, risks and opportunities',
      enabled: false,
      children: [
        {
          id: 'climate_material_topic_management',
          label: 'Management of Material Topics',
          enabled: false
        },
        {
          id: 'climate_financial_implications',
          label: 'Climate-related Financial Implications',
          enabled: false,
          children: [
            {
              id: 'climate_related_risks',
              label: 'Climate-related Risks',
              enabled: false
            },
            {
              id: 'climate_related_opportunities',
              label: 'Climate-related Opportunities',
              enabled: false
            }
          ]
        }
      ]
    },
    {
      id: 'tax',
      label: 'Tax',
      enabled: false,
      children: [
        {
          id: 'tax_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'approach_to_tax',
          label: 'Approach to tax',
          enabled: false
        },
        {
          id: 'tax_governance_risk',
          label: 'Tax governance and risk management',
          enabled: false
        },
        {
          id: 'tax_stakeholder_engagement',
          label: 'Stakeholder engagement and management of concerns related to tax',
          enabled: false
        }
      ]
    },
    {
      id: 'anti_corruption',
      label: 'Anti-corruption',
      enabled: false,
      children: [
        {
          id: 'anti_corruption_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'risk_assessment_anti_corruption',
          label: 'Operations assessed for risks related to anti-corruption',
          enabled: false
        },
        {
          id: 'incidents_anti_corruption',
          label: 'Incidents of anti-corruption',
          enabled: false
        },
        {
          id: 'training_anti_corruption',
          label: 'Training on anti-corruption',
          enabled: false
        }
      ]
    },
    {
      id: 'political_contribution',
      label: 'Political contribution',
      enabled: false,
      children: [
        {
          id: 'political_contribution_material_topic_management',
          label: 'Management of Material Topic',
          enabled: false
        }
      ]
    }
  ],  
  environment: [
    {
      id: 'emissions',
      label: 'Emissions',
      enabled: false,
      children: [
        { id: 'emissions_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'scope_1_ghg_emissions', label: 'Scope 1 GHG Emissions', enabled: false },
        { id: 'scope_2_ghg_emissions', label: 'Scope 2 GHG Emissions', enabled: false },
        { id: 'scope_3_ghg_emissions', label: 'Scope 3 GHG Emissions', enabled: false },
        { id: 'base_year', label: 'Base Year', enabled: false },
        { id: 'consolidation_approach', label: 'Consolidation Approach', enabled: false },
        { id: 'ghg_emission_intensity', label: 'GHG emission intensity', enabled: false },
        { id: 'reduction_in_ghg_emissions', label: 'Reduction in GHG emissions', enabled: false },
        { id: 'ozone_depleting_substances', label: 'Ozone depleting substances', enabled: false }
      ]
    },
    {
      id: 'materials',
      label: 'Materials',
      enabled: false,
      children: [
        { id: 'materials_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'recycled_input_materials', label: 'Recycled input materials used', enabled: false },
        { id: 'reclaimed_products_packaging', label: 'Reclaimed products and their packaging materials', enabled: false }
      ]
    },
    {
      id: 'water',
      label: 'Water',
      enabled: false,
      children: [
        { id: 'water_material_topic_management', label: 'Management of Material Topic', enabled: false },
        { id: 'water_withdrawal', label: 'Water withdrawal', enabled: false },
        { id: 'water_discharge_impact', label: 'Water discharge & management of associated impact', enabled: false },
        { id: 'water_consumption', label: 'Water Consumption', enabled: false }
      ]
    },
    {
      id: 'energy',
      label: 'Energy',
      enabled: false,
      children: [
        { id: 'energy_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'energy_consumption_within', label: 'Energy consumption within the organisation', enabled: false },
        { id: 'energy_consumption_outside', label: 'Energy consumption outside of the organisation', enabled: false },
        { id: 'energy_intensity', label: 'Energy intensity', enabled: false },
        { id: 'energy_reduction', label: 'Reduction in energy consumption', enabled: false }
      ]
    },
    {
      id: 'waste',
      label: 'Waste',
      enabled: false,
      children: [
        { id: 'waste_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'waste_generation_impacts', label: 'Waste generation and impacts', enabled: false },
        { id: 'waste_impact_management', label: 'Management of waste related impacts', enabled: false },
        { id: 'waste_disposed', label: 'Waste disposed', enabled: false },
        { id: 'waste_diverted', label: 'Waste diverted from disposal', enabled: false },
        { id: 'significant_spills', label: 'Significant Spills', enabled: false }
      ]
    },
    {
      id: 'biodiversity',
      label: 'Biodiversity',
      enabled: false,
      children: [
        { id: 'biodiversity_material_topic_management', label: 'Management of Material Topic', enabled: false },
        { id: 'habitat_protected_restored', label: 'Habitat protected and restored', enabled: false }
      ]
    },
    {
      id: 'air_quality',
      label: 'Air Quality',
      enabled: false,
      children: [
        { id: 'air_quality_material_topic_management', label: 'Management of Material Topics', enabled: false }
      ]
    }
  ],  
  people: [
    {
      id: 'employees',
      label: 'Employees',
      enabled: false,
      children: [
        { id: 'employees_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'employee_hiring_turnover', label: 'Employee hire, turnover', enabled: false },
        { id: 'employee_benefits_health', label: 'Employee benefits and health services', enabled: false },
        { id: 'personal_leaves', label: 'Personal leaves', enabled: false },
        { id: 'standard_wages', label: 'Standard wages', enabled: false },
        { id: 'career_development_reviews', label: 'Performance and career development reviews of employees', enabled: false }
      ]
    },
    {
      id: 'labour_management',
      label: 'Labour Management',
      enabled: false,
      children: [
        { id: 'labour_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'non_employee_workers', label: 'Workers who are not employees', enabled: false },
        { id: 'forced_labour', label: 'Forced or compulsory labour', enabled: false }
      ]
    },
    {
      id: 'child_labour',
      label: 'Incidents of child labour',
      enabled: false,
      children: [
        { id: 'child_labour_material_topic_management', label: 'Management of Material Topic', enabled: false }
      ]
    },
    {
      id: 'diversity_inclusion',
      label: 'Diversity, Inclusion',
      enabled: false,
      children: [
        { id: 'diversity_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'diversity_governance_employees', label: 'Diversity of governance bodies and employees', enabled: false },
        { id: 'diversity_remuneration', label: 'Remuneration', enabled: false }
      ]
    },
    {
      id: 'training_education',
      label: 'Training & education',
      enabled: false,
      children: [
        { id: 'training_material_topic_management', label: 'Management of Material Topics', enabled: false },
        { id: 'training_programs_upgrading_skills', label: 'Programs for upgrading employee skills and transition assistance programs', enabled: false }
      ]
    },
    {
      id: 'occupational_health_safety',
      label: 'Occupational Health and Safety',
      enabled: false,
      children: [
        { id: 'ohs_material_topic_management', label: 'Management of Material Topic', enabled: false },
        { id: 'ohs_management_system', label: 'OHS management system', enabled: false },
        { id: 'occupational_health_services', label: 'Occupational health services', enabled: false },
        { id: 'worker_ohs_participation', label: 'Worker participation, consultation, and communication on OHS', enabled: false },
        { id: 'promotion_worker_health', label: 'Promotion of worker health', enabled: false },
        { id: 'ohs_impact_prevention', label: 'Prevention and mitigation of OHS impacts', enabled: false },
        { id: 'hazard_risk_identification', label: 'Hazard, risk identification and investigation', enabled: false },
        { id: 'work_related_illness_injuries', label: 'Work-related ill-health & injuries', enabled: false },
        { id: 'safety_training', label: 'Safety training', enabled: false },
        { id: 'workers_covered_ohs', label: 'Workers covered by OHS management system', enabled: false }
      ]
    },
    {
      id: 'collective_bargaining',
      label: 'Collective Bargaining',
      enabled: false,
      children: [
        { id: 'freedom_of_association_risks', label: 'Operations and suppliers in which the right to freedom of association and collective bargaining may be at risk', enabled: false }
      ]
    },
    {
      id: 'violations_discrimination',
      label: 'Incidents of violation/discrimination',
      enabled: false,
      children: [
        { id: 'violations_material_topic_management', label: 'Management of material topic', enabled: false }
      ]
    }
  ],  
  community: [
    {
      id: 'community_engagement',
      label: 'Community Engagement',
      enabled: false,
      children: [
        {
          id: 'community_engagement_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'violation_rights_indigenous_people',
          label: 'Incidents of Violation of Rights of Indigenous People',
          enabled: false
        }
      ]
    },
    {
      id: 'csr',
      label: 'CSR',
      enabled: false
    }
  ],
  customers: [
    {
      id: 'products_services',
      label: 'Products and Services',
      enabled: false,
      children: [
        {
          id: 'products_services_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'safety_impact',
          label: 'Health and safety impacts of product and service categories',
          enabled: false
        },
        {
          id: 'non_compliance',
          label: 'Incidents of non-compliance',
          enabled: false
        }
      ]
    },
    {
      id: 'product_labeling',
      label: 'Product and Service Information & Labelling',
      enabled: false,
      children: [
        {
          id: 'product_labeling_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        },
        {
          id: 'marketing',
          label: 'Marketing',
          enabled: false
        }
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      enabled: false,
      children: [
        {
          id: 'customers_material_topic_management',
          label: 'Management of material topic',
          enabled: false
        }
      ]
    }
  ]
  
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
  materiality: 'Materiality',
  governance: 'Governance',
  journey: 'Journey',
  economic: 'Economic',
  environment: 'Environment',
  people: 'People',
  community: 'Community',
  customers: 'Customers',
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

// New selector to get sections in default order for non-custom reports
export const selectSectionsForReportType = (reportType, defaultSections = []) => (state) => {
  if (reportType === 'Custom ESG Report') {
    // For custom reports, use the modified/reordered sections from Redux
    return state.reportBuilder.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  } else {
    // For non-custom reports, always use default sections in default order
    return defaultSections.map((section, index) => ({
      ...section,
      enabled: true,
      order: index + 1
    }));
  }
};

// Updated selector for current display section that respects report type
export const selectCurrentDisplaySectionForReportType = (reportType, defaultSections = []) => (state) => {
  const sectionsToUse = reportType === 'Custom ESG Report' 
    ? state.reportBuilder.sections.filter(s => s.enabled).sort((a, b) => a.order - b.order)
    : defaultSections.map((section, index) => ({
        ...section,
        enabled: true,
        order: index + 1
      }));
      
  return sectionsToUse[state.reportBuilder.currentReportPage] || null;
};

// Action to reset sections to default order for non-custom reports
export const initializeForNonCustomReport = (defaultSections) => (dispatch) => {
  // Reset to default sections in default order
  const defaultOrderedSections = defaultSections.map((section, index) => ({
    ...section,
    enabled: true,
    order: index + 1
  }));
  
  dispatch(setSections(defaultOrderedSections));
  dispatch(setCurrentReportPage(0));
};

export const initializeForCustomReport = () => (dispatch) => {
  dispatch(setSections(defaultSections));
};

export default reportBuilderSlice.reducer;