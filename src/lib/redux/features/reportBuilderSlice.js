// store/slices/reportBuilderSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../app/utils/axiosMiddleware';
import { setIncludeMaterialTopics, setIncludeContentIndex } from './reportCreationSlice';


export const fetchReportBuilderData = createAsyncThunk(
  'reportBuilder/fetchReportBuilderData',
  async (reportId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/esg_report/custom_esg_report/${reportId}/`);

      const data = response.data.data;

      // Proper dispatch calls
      dispatch(setIncludeMaterialTopics(data.include_management_material_topics));
      dispatch(setIncludeContentIndex(data.include_content_index));


      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateReportBuilderData = createAsyncThunk(
  'reportBuilder/updateReportBuilderData',
  async (reportId, { getState, rejectWithValue }) => {
    try {
      const state = getState().reportBuilder;
      console.log(state,"lll section state")
      const { sections, subsections, selectedSubsections } = state;

      // 1. Build `section` array
      const section = sections.map(s => ({
        id: s.id,
        title: s.title,
        order: s.order,
        enabled: s.enabled,
        mandatory: s.mandatory,
        field:s.field,
        screen:s.screen
      }));

      // 2. Build `sub_section` object
      const sub_section = {};

      for (const [sectionId, subs] of Object.entries(subsections)) {
        const selected = selectedSubsections[sectionId] || [];

        const mapSubs = (items) =>
          items.map(item => {
            const isEnabled = selected.includes(item.id.trim());
            return {
              id: item.id.trim(),
              label: item.label,
              enabled: isEnabled,
              field: item.field,
              children: item.children ? mapSubs(item.children) : undefined
            };
          });

        sub_section[sectionId] = mapSubs(subs);
      }

      // 3. Send PATCH
      const payload = { section, sub_section };

      const response = await axiosInstance.patch(
        `/esg_report/custom_esg_report/${reportId}/`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

function reorderSectionsByEnabledState(sections) {
  const enabled = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
  const disabled = sections.filter(s => !s.enabled).sort((a, b) => a.order - b.order);

  const combined = [...enabled, ...disabled];

  return combined.map((section, index) => ({
    ...section,
    order: index + 1,
  }));
}

// Default sections - keeping original IDs for compatibility but mapping to camelCase internally
const defaultSections = [
  {
    id: 'message_ceo',
    title: 'Message From Our Leadership',
    mandatory: false,
    enabled: false,
    field:['message'],
    order: 1,
    screen: "screen_one"
  },
    {
    id: 'about_company',
    title: 'About the Company & Operations',
    mandatory: false,
    enabled: false,
    field:['about_the_company'],
    order: 2,
    screen: "screen_two"
  },
  {
    id: 'mission_vision',
    title: 'Mission, Vision, Value',
    mandatory: false,
    enabled: false,
    field:['mission'],
    order: 3,
    screen: "screen_three"
  },
  {
    id: 'sustainability',
    title: 'Sustainability Roadmap',
    mandatory: false,
    enabled: false,
    field:['description'],
    order: 4,
    screen: "screen_four"
  },
  {
    id: 'awards',
    title: 'Awards & Alliances',
    mandatory: false,
    enabled: false,
    field:['description'],
    order: 5,
    screen: "screen_five"
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder Engagement',
    mandatory: false,
    enabled: false,
    field:['description'],
    order: 6,
    screen: "screen_six"
  },
  {
    id: 'about_report',
    title: 'About the Report',
    mandatory: false,
    enabled: false,
    field:['description'],
    order: 7,
    screen: "screen_seven"
  },
  {
    id: 'materiality',
    title: 'Materiality',
    mandatory: false,
    enabled: false,
    order: 8,
    screen: "screen_eight"
  },
  {
    id: 'governance',
    title: 'Corporate Governance',
    mandatory: false,
    enabled: false,
    field:['statement'],
    order: 9,
    screen: "screen_nine"
  },
  {
    id: 'journey',
    title: 'Sustainability Journey',
    mandatory: false,
    enabled: false,
    field:['company_sustainability_statement'],
    order: 10,
    screen: "screen_ten"
  },
  {
    id: 'economic',
    title: 'Economic Performance',
    mandatory: false,
    enabled: false,
    field:['company_economic_performance_statement'],
    order: 11,
    screen: "screen_eleven"
  },
  {
    id: 'environment',
    title: 'Environment',
    mandatory: false,
    enabled: false,
    field:['environmental_responsibility_statement'],
    order: 12,
    screen: "screen_twelve"
  },
  {
    id: 'people',
    title: 'People',
    mandatory: false,
    enabled: false,
    field:['employee_policies_statement'],
    order: 13,
    screen: "screen_thirteen"
  },
  {
    id: 'community',
    title: 'Community',
    mandatory: false,
    enabled: false,
    order: 14,
    screen: "screen_fourteen"
  },
  {
    id: 'customers',
    title: 'Customers, Products & Services',
    mandatory: false,
    enabled: false,
    field:['conclusion'],
    order: 15,
    screen: "screen_fifteen"
  }
];

// Default subsections - using original snake_case IDs for compatibility
const defaultSubsections = {
  message_ceo: [
    { 
      id: 'chief_executive_message', 
      label: 'Message From CEO',
      field:['ceo_name'],
      enabled: false
    },
  ],  
  about_company: [
    { 
      id: 'business_model', 
      label: 'Business Model And Impact',
      enabled: false,
      children: [
        { 
          id: 'value_chain', 
          label: 'Activities, Value Chain, And Other Business Relationships',
          field:['business_relations'],
          enabled: false
        },
        { 
          id: 'entities_included', 
          label: 'Entities Included In The Organization\'s Sustainability Reporting',
          field:['entities_included'],
          enabled: false
        },
      ]
    },
    { 
      id: 'supply_chain', 
      label: 'Supply Chain',
      field:['supply_chain_description'],
      enabled: false
    },
  ],
  mission_vision: [
    { 
      id: 'mission_vision', 
      label: 'Mission, Vision, And Values',
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
      id: 'awards_and_recognition', 
      label: 'Awards & Recognition',
      enabled: false
    },
  ],
  stakeholder: [
    { 
      id: 'approach_to_stakeholder_engagement', 
      label: 'Approach To Stakeholder Engagement',
      enabled: false
    },
  ],
  about_report: [
    { 
      id: 'reporting_period', 
      label: 'Reporting Period, Frequency And Point Of Contact',
      enabled: false,
      children: [
        { 
          id: 'restatement_information', 
          label: 'Restatement Of Information',
          enabled: false
        }
      ]
    },
    { 
      id: 'frameworks', 
      label: 'Frameworks',
      field:['framework_description'],
      enabled: false
    },
    { 
      id: 'external_assurance', 
      label: 'External Assurance',
      field:['external_assurance'],
      enabled: false
    },
  ],
  materiality: [
    { 
      id: 'materiality_assessment', 
      label: 'Materiality Assessment',
      field:['statement'],
      enabled: false,
      children: [
        { 
          id: 'list_of_material_topic', 
          label: 'List Of Material Topics',
          enabled: false
        },
        { 
            id: 'topic_changes', 
            label: 'Changes In The List Of Material Topics',
            enabled: false
          },
          { 
            id: 'materiality_process', 
            label: 'Materiality Assessment – Process',
            enabled: false
          },
          { 
            id: 'management_of_material_topic', 
            label: 'Management Of Material Topic',
            enabled: false
          },
      ]
    },
    
  ],
  governance: [
    {
      id: 'board_of_directors',
      label: 'Board Of Directors',
      enabled: false,
      children: [
        {
          id: 'governance_structure_composition',
          label: 'Governance Structure And Composition',
          field:['board_gov_statement'],
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
          label: 'Nomination, Selection Of The Highest Governance Body',
          enabled: false
        },
        {
          id: 'chair_highest_governance_body',
          label: 'Chair Of The Highest Governance Body',
          enabled: false
        },
        {
          id: 'senior_management_local',
          label: 'Senior Management Hired From Local Community',
          enabled: false
        },
        {
          id: 'management_of_material_topic',
          label: 'Management Of Material Topic',
          enabled: false
        }
      ]
    },
    {
      id: 'board_responsibility_evaluation_remuneration',
      label: 'Responsibility, Evaluation And Remuneration Of The Board',
      enabled: false,
      children: [
        {
          id: 'role_highest_governance_body',
          label: 'Role Of The Highest Governance Body',
          enabled: false
        },
        {
          id: 'collective_knowledge',
          label: 'Collective Knowledge Of The Highest Governance Body',
          enabled: false
        },
        {
          id: 'sustainability_reporting_role',
          label: 'Role Of The Highest Governance Body In Sustainability Reporting',
          enabled: false
        },
        {
          id: 'delegation_of_responsibility',
          label: 'Delegation Of Responsibility For Managing Impacts',
          enabled: false
        },
        {
          id: 'communication_critical_concerns',
          label: 'Communication Of Critical Concerns',
          enabled: false
        },
        {
          id: 'performance_evaluation',
          label: 'Evaluation Of The Performance Of The Highest Governance Body',
          enabled: false
        },
        {
          id: 'remuneration_policies_process',
          label: 'Remuneration Policies & Process To Determine Remuneration',
          field:['remuneration_policies'],
          enabled: false
        },
        {
          id: 'annual_compensation_ratio',
          label: 'Annual Compensation Ratio',
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
          label: 'Statement On Sustainable Development Strategy',
          enabled: false
        },
        {
          id: 'membership_association',
          label: 'Membership Association',
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
          label: 'Remediation Of Negative Impacts',
          enabled: false
        },
        {
          id: 'advice_mechanism',
          label: 'Mechanism For Seeking Advice And Raising Concerns',
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
          label: 'Embedding Policy Commitment',
          field:['policy_not_public_reason'],
          enabled: false
        },
        {
          id: 'anti_trust_behavior',
          label: 'Anti-Trust, Anti-Competitive Behavior, Monopoly Practices',
          enabled: false
        },
        {
          id: 'retirement_benefits',
          label: 'Defined Benefit Plan Obligations And Other Retirement Plans',
          enabled: false
        }
      ]
    },
    {
      id: 'conflict_of_interest',
      label: 'Conflict Of Interest',
      enabled: false
    }
  ],  
  journey: [
    {
      id: 'sustainability_management_approach',
      label: 'Management Approach For Sustainability/ESG Topics',
      field:['approach_for_sustainability'],
      enabled: false
    },
    {
      id: 'company_sustainability',
      label: "Company's Sustainability Goals",
      field:['sustainability_goals'],
      enabled: false
    },
    {
      id: 'supply_chain_sustainability',
      label: 'Supply Chain Sustainability',
      field:['approach_to_supply_chain_sustainability'],
      enabled: false,
      children: [
        {
          id: 'supply_chain_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'local_suppliers',
          label: 'Local Suppliers',
          enabled: false
        },
        {
          id: 'negative_impacts_in_supply_chain',
          label: 'Negative Environmental & Social Impacts In The Supply Chain',
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
          label: 'Management Of Material Topics',
          enabled: false
        },
        {
          id: 'economic_value_creation',
          label: 'Economic Value Creation',
          field:['introduction_to_economic_value_creation'],
          enabled: false
        },
        {
          id: 'financial_assistance_government',
          label: 'Financial Assistance Received From Government',
          field:['financial_assistance_from_government'],
          enabled: false
        }
      ]
    },
    {
      id: 'infrastructure_investment',
      label: 'Infrastructure Investment And Services Supported',
      field:['infrastructure_investement'],
      enabled: false,
      children: [
        {
          id: 'infrastructure_material_topic_management',
          label: 'Management Of Material Topics',
          enabled: false
        },
        {
          id: 'indirect_economic_impacts',
          label: 'Indirect Economic Impacts',
          enabled: false
        }
      ]
    },
    {
      id: 'climate_financials',
      label: 'Climate-Related Financial Implications, Risks And Opportunities',
      enabled: false,
      children: [
        {
          id: 'climate_material_topic_management',
          label: 'Management Of Material Topics',
          enabled: false
        },
        {
          id: 'climate_financial_implications',
          label: 'Climate-Related Financial Implications',
          enabled: false,
          children: [
            {
              id: 'climate_related_risks',
              label: 'Climate-Related Risks',
              enabled: false
            },
            {
              id: 'climate_related_opportunities',
              label: 'Climate-Related Opportunities',
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
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'approach_to_tax',
          label: 'Approach To Tax',
          enabled: false
        },
        {
          id: 'tax_governance_risk',
          label: 'Tax Governance And Risk Management',
          enabled: false
        },
        {
          id: 'tax_stakeholder_engagement',
          label: 'Stakeholder Engagement And Management Of Concerns Related To Tax',
          enabled: false
        }
      ]
    },
    {
      id: 'anti_corruption',
      label: 'Anti-Corruption',
      enabled: false,
      children: [
        {
          id: 'anti_corruption_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'risk_assessment_anti_corruption',
          label: 'Operations Assessed For Risks Related To Anti-Corruption',
          enabled: false
        },
        {
          id: 'incidents_anti_corruption',
          label: 'Incidents Of Anti-Corruption',
          enabled: false
        },
        {
          id: 'training_anti_corruption',
          label: 'Training On Anti-Corruption',
          enabled: false
        }
      ]
    },
    {
      id: 'political_contribution',
      label: 'Political Contribution',
      enabled: false,
      children: [
        {
          id: 'political_contribution_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        }
      ]
    }
  ],  
  environment: [
    {
      id: 'emissions',
      label: 'Emissions',
      field:['emissions'],
      enabled: false,
      children: [
        { id: 'emissions_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'scope_1_ghg_emissions', label: 'Scope 1 GHG Emissions',field:['scope_one_emissions','biogenic_c02_emissions'], enabled: false },
        { id: 'scope_2_ghg_emissions', label: 'Scope 2 GHG Emissions',field:['scope_two_emissions'], enabled: false },
        { id: 'scope_3_ghg_emissions', label: 'Scope 3 GHG Emissions',field:['scope_three_emissions','biogenic_c02_emissions_305_3c'], enabled: false },
        { id: 'base_year', label: 'Base Year',field:['base_year'], enabled: false },
        { id: 'consolidation_approach', label: 'Consolidation Approach',field:['consolidation'], enabled: false },
        { id: 'ghg_emission_intensity', label: 'GHG Emission Intensity',field:['ghg_emission_intensity_tracking'], enabled: false },
        { id: 'reduction_in_ghg_emissions', label: 'Reduction In GHG Emissions',field:['ghg_emission_reduction_efforts'], enabled: false },
        { id: 'ozone_depleting_substances', label: 'Ozone Depleting Substances',field:['ozone_depleting_substance_elimination'], enabled: false }
      ]
    },
    {
      id: 'materials',
      label: 'Materials',
      field:['material_management_strategy'],
      enabled: false,
      children: [
        { id: 'materials_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'recycled_input_materials', label: 'Recycled Input Materials Used',field:['recycling_process'], enabled: false },
        { id: 'reclaimed_products_packaging', label: 'Reclaimed Products And Their Packaging Materials',field:['reclamation_recycling_process'], enabled: false }
      ]
    },
    {
      id: 'water',
      label: 'Water',
      enabled: false,
      children: [
        { id: 'water_material_topic_management', label: 'Management Of Material Topic', enabled: false },
        { id: 'water_withdrawal', label: 'Water Withdrawal',field:['water_withdrawal_tracking'], enabled: false },
        { id: 'water_discharge_impact', label: 'Water Discharge & Management Of Associated Impact', enabled: false },
        { id: 'water_consumption', label: 'Water Consumption',field:['water_consumption_goals'], enabled: false }
      ]
    },
    {
      id: 'energy',
      label: 'Energy',
      enabled: false,
      children: [
        { id: 'energy_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'energy_consumption_within', label: 'Energy Consumption Within The Organisation',field:['energy_consumption_within_organization'], enabled: false },
        { id: 'energy_consumption_outside', label: 'Energy Consumption Outside Of The Organisation',field:['energy_consumption_outside_organization'], enabled: false },
        { id: 'energy_intensity', label: 'Energy Intensity', enabled: false },
        { id: 'energy_reduction', label: 'Reduction In Energy Consumption', enabled: false }
      ]
    },
    {
      id: 'waste',
      label: 'Waste',
      enabled: false,
      children: [
        { id: 'waste_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'waste_generation_impacts', label: 'Waste Generation And Impacts', enabled: false },
        { id: 'waste_impact_management', label: 'Management Of Waste Related Impacts', enabled: false },
        { id: 'waste_disposed', label: 'Waste Disposed', enabled: false },
        { id: 'waste_diverted', label: 'Waste Diverted From Disposal', enabled: false },
        { id: 'significant_spills', label: 'Significant Spills',field:['significant_spills'], enabled: false }
      ]
    },
    {
      id: 'biodiversity',
      label: 'Biodiversity',
      enabled: false,
      children: [
        { id: 'biodiversity_material_topic_management', label: 'Management Of Material Topic', enabled: false },
        { id: 'habitat_protected_restored', label: 'Habitat Protected And Restored',field:['habitat_protection_restoration_commitment'], enabled: false }
      ]
    },
    {
      id: 'air_quality',
      label: 'Air Quality',
      field:['air_quality_protection_commitment'],
      enabled: false,
      children: [
        { id: 'air_quality_material_topic_management', label: 'Management Of Material Topics', enabled: false }
      ]
    }
  ],  
  people: [
    {
      id: 'employees',
      label: 'Employees',
      enabled: false,
      children: [
        { id: 'employees_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'employee_hiring_turnover', label: 'Employee Hire, Turnover',field:['workforce_hire_retention_statement'], enabled: false },
        { id: 'employee_benefits_health', label: 'Employee Benefits And Health Services', enabled: false },
        { id: 'parental_leaves', label: 'Parental Leaves',field:['parental_leaves'], enabled: false },
        { id: 'standard_wages', label: 'Standard Wage', field:['standard_wage'], enabled: false },
        { id: 'career_development_reviews', label: 'Performance And Career Development Reviews Of Employees',field:['performance_review_process'], enabled: false }
      ]
    },
    {
      id: 'labour_management',
      label: 'Labour Management',
      enabled: false,
      children: [
        { id: 'labour_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'non_employee_workers', label: 'Workers Who Are Not Employees', enabled: false },
        { id: 'forced_labour', label: 'Forced Or Compulsory Labour',field:['forced_labor_position'], enabled: false }
      ]
    },
    {
      id: 'child_labour',
      label: 'Incidents Of Child Labour',
      enabled: false,
      children: [
        { id: 'child_labour_material_topic_management', label: 'Management Of Material Topic', enabled: false }
      ]
    },
    {
      id: 'diversity_inclusion',
      label: 'Diversity, Inclusion',
      enabled: false,
      children: [
        { id: 'diversity_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'diversity_governance_employees', label: 'Diversity Of Governance Bodies And Employees',field:['employee_diversity_position'], enabled: false },
        { id: 'diversity_remuneration', label: 'Remuneration',field:['remuneration_practices'], enabled: false }
      ]
    },
    {
      id: 'training_education',
      label: 'Training & Education',
      enabled: false,
      children: [
        { id: 'training_material_topic_management', label: 'Management Of Material Topics', enabled: false },
        { id: 'training_programs_upgrading_skills', label: 'Programs For Upgrading Employee Skills And Transition Assistance Programs',field:['employee_skill_upgrade_programs'], enabled: false }
      ]
    },
    {
      id: 'occupational_health_safety',
      label: 'Occupational Health And Safety',
      enabled: false,
      children: [
        { id: 'ohs_material_topic_management', label: 'Management Of Material Topic', enabled: false },
        { id: 'ohs_management_system', label: 'OHS Management System', enabled: false },
        { id: 'occupational_health_services', label: 'Occupational Health Services', enabled: false },
        { id: 'worker_ohs_participation', label: 'Worker Participation, Consultation, And Communication On OHS',field:['ohs_policies'], enabled: false },
        { id: 'promotion_worker_health', label: 'Promotion Of Worker Health', enabled: false },
        { id: 'ohs_impact_prevention', label: 'Prevention And Mitigation Of OHS Impacts', enabled: false },
        { id: 'hazard_risk_identification', label: 'Hazard, Risk Identification And Investigation',field:['hazard_risk_assessment'], enabled: false },
        { id: 'work_related_illness_injuries', label: 'Work-Related Ill-Health & Injuries',field:['work_related_health_injuries'], enabled: false },
        { id: 'safety_training', label: 'Safety Training',field:['safety_training'], enabled: false },
        { id: 'workers_covered_ohs', label: 'Workers Covered By OHS Management System',field:['ohs_management_system'], enabled: false }
      ]
    },
    {
      id: 'collective_bargaining',
      label: 'Collective Bargaining',
      enabled: false,
      children: [
        { id: 'freedom_of_association_risks', label: 'Operations And Suppliers In Which The Right To Freedom Of Association And Collective Bargaining May Be At Risk',field:['freedom_of_association_views'], enabled: false }
      ]
    },
    {
      id: 'violations_discrimination',
      label: 'Incidents Of Violation/Discrimination',
      field:['violation_discrimination_policy'],
      enabled: false,
      children: [
        { id: 'violations_material_topic_management', label: 'Management Of Material Topic', enabled: false }
      ]
    }
  ],  
  community: [
    {
      id: 'community_engagement',
      label: 'Community Engagement',
      field:['community_engagement','impact_assessment'],
      enabled: false,
      children: [
        {
          id: 'community_engagement_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'violation_rights_indigenous_people',
          label: 'Incidents Of Violation Of Rights Of Indigenous People',
          field:['violation_rights'],
          enabled: false
        }
      ]
    },
    {
      id: 'csr',
      label: 'CSR',
      field:['csr_policies'],
      enabled: false
    }
  ],
  customers: [
    {
      id: 'products_services',
      label: 'Products And Services',
      field:['commitment_statement'],
      enabled: false,
      children: [
        {
          id: 'products_services_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'safety_impact',
          label: 'Health And Safety Impacts Of Product And Service Categories',
          enabled: false
        },
        {
          id: 'non_compliance',
          label: 'Incidents Of Non-Compliance',
          enabled: false
        }
      ]
    },
    {
      id: 'product_labeling',
      label: 'Product And Service Information & Labelling',
      field:['product_info_labelling'],
      enabled: false,
      children: [
        {
          id: 'product_labeling_material_topic_management',
          label: 'Management Of Material Topic',
          enabled: false
        },
        {
          id: 'marketing',
          label: 'Marketing',
          field:['marketing_practices'],
          enabled: false
        }
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      field:['customers'],
      enabled: false,
      children: [
        {
          id: 'customers_material_topic_management',
          label: 'Management Of Material Topic',
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

  skipSelectionPage:false,
  
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

    setskipSelectionPage: (state, action) => {
      state.skipSelectionPage = action.payload;
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

    updateEnabledSectionOrder: (state) => {
      // Sort: enabled first, then disabled
      const sorted = [...state.sections].sort((a, b) => {
        if (a.enabled === b.enabled) {
          return a.order - b.order; // preserve existing order within each group
        }
        return a.enabled ? -1 : 1; // enabled sections come first
      });
    
      // Reassign order
      sorted.forEach((section, index) => {
        section.order = index + 1;
      });
    
      state.sections = sorted;
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
        state.sections = reorderSectionsByEnabledState(state.sections);
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
      state.currentReportPage=0;
      state.error = null;
      state.skipSelectionPage=false
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

    handleNext:(state)=>{
      if (state.currentReportPage > 0) {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportBuilderData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportBuilderData.fulfilled, (state, action) => {
        const { section, sub_section,skip_first_page } = action.payload;
       

        state.skipSelectionPage=skip_first_page;
        // 1. Update sections
        state.sections = (section || []).map((s, i) => ({
          id: s.id,
          title: s.title,
          enabled: s.enabled,
          mandatory: s.mandatory,
          order: s.order,
          field:s.field,
          screen:s.screen
        }));
  
        // 2. Update subsections
        state.subsections = sub_section || {};
  
        // 3. Build selectedSubsections based on enabled state
        const selectedSubsections = {};
  
        for (const [sectionId, subs] of Object.entries(sub_section || {})) {
          const sectionEnabled = section.find(s => s.id === sectionId)?.enabled;
          if (!sectionEnabled) continue;
  
          const enabledIds = [];
  
          const scan = (items) => {
            for (const item of items) {
              if (item.enabled) {
                enabledIds.push(item.id.trim()); // remove trailing spaces
              }
              if (item.children) {
                scan(item.children);
              }
            }
          };
  
          scan(subs);
          if (enabledIds.length > 0) {
            selectedSubsections[sectionId] = enabledIds;
          }
        }
  
        state.selectedSubsections = selectedSubsections;
        state.isLoading = false;
      })
      .addCase(fetchReportBuilderData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load ESG report data.';
      });
  }
  
  
});

export const {
  // Step management
  setCurrentStep,
  nextStep,
  previousStep,
  setskipSelectionPage,
  
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
  handleNext,
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

  updateEnabledSectionOrder
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
export const selectSkipSelectionPage =(state) => state.reportBuilder.skipSelectionPage
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