import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/utils/axiosMiddleware";


const Screen12Slice = createSlice({
  name: 'Environment',
  initialState: {
    environmental_responsibility_statement:'',
    emissions:'',
    scope_one_emissions:'',
    scope_two_emissions:'',
    scope_three_emissions:'',
    ghg_emission_intensity_tracking:'',
    ghg_emission_reduction_efforts:'',
    ozone_depleting_substance_elimination:'',
    material_management_strategy:'',
    recycling_process:'',
    reclamation_recycling_process:'',
    water_withdrawal_tracking:'',
    water_consumption_goals:'',
    energy_consumption_within_organization:'',
    energy_consumption_outside_organization:'',
    energy_intensity_tracking:'',
    energy_consumption_reduction_commitment:'',
    significant_spills:'',
    habitat_protection_restoration_commitment:'',
    air_quality_protection_commitment:'',
    biogenic_c02_emissions:'',
    biogenic_c02_emissions_305_3c:'',
    error: null
  },
  reducers: {

    setEnvironmentStatement: (state, action) => {
      state.environmental_responsibility_statement = action.payload;
    },
    setEmission: (state, action) => {
        state.emissions = action.payload;
    },
    setScopeOneEmission: (state, action) => {
        state.scope_one_emissions = action.payload;
    },
    setScopeTwoEmission: (state, action) => {
        state.scope_two_emissions = action.payload;
    },
    setScopeThreeEmission: (state, action) => {
        state.scope_three_emissions = action.payload;
    },
    setGHGEmissionIntensityTracking: (state, action) => {
        state.ghg_emission_intensity_tracking = action.payload;
    },
    setGHGEmissionReductionEfforts: (state, action) => {
        state.ghg_emission_reduction_efforts = action.payload;
    },
    setOzoneDepletingSubstanceElimination: (state, action) => {
        state.ozone_depleting_substance_elimination = action.payload;
    },
    setMaterialManagementStrategy: (state, action) => {
        state.material_management_strategy = action.payload;
    },
    setRecyclingProcess: (state, action) => {
        state.recycling_process = action.payload;
    },
    setReclamationRecyclingProcess: (state, action) => {
        state.reclamation_recycling_process = action.payload;
    },
    setWaterWithdrawalTracking: (state, action) => {
        state.water_withdrawal_tracking = action.payload;
    },
    setWaterConsumptionGoals: (state, action) => {
        state.water_consumption_goals = action.payload;
    },
    setEnergyConsumptionWithinOrganization: (state, action) => {
        state.energy_consumption_within_organization = action.payload;
    },
    setEnergyConsumptionOutsideOrganization: (state, action) => {
        state.energy_consumption_outside_organization = action.payload;
    },
    setEnergyIntensityTracking: (state, action) => {
        state.energy_intensity_tracking = action.payload;
    },
    setEnergyConsumptionReductionCommitment: (state, action) => {
        state.energy_consumption_reduction_commitment = action.payload;
    },
    setSignificantSpills: (state, action) => {
        state.significant_spills = action.payload;
    },
    setHabitatProtectionRestorationCommitment: (state, action) => {
        state.habitat_protection_restoration_commitment = action.payload;
    },
    setAirQualityProtectionCommitment: (state, action) => {
        state.air_quality_protection_commitment = action.payload;
    },
    setBiogenicCO2Emission: (state, action) => {
        state.biogenic_c02_emissions = action.payload;
    },
    setBiogenicCO2305: (state, action) => {
        state.biogenic_c02_emissions_305_3c = action.payload;
    },
  },
});

export const {
    setEnvironmentStatement,
    setEmission,
    setScopeOneEmission,
    setScopeTwoEmission,
    setScopeThreeEmission,
    setGHGEmissionIntensityTracking,
    setGHGEmissionReductionEfforts,
    setOzoneDepletingSubstanceElimination,
    setMaterialManagementStrategy,
    setRecyclingProcess,
    setReclamationRecyclingProcess,
    setWaterWithdrawalTracking,
    setWaterConsumptionGoals,
    setEnergyConsumptionWithinOrganization,
    setEnergyConsumptionOutsideOrganization,
    setEnergyIntensityTracking,
    setEnergyConsumptionReductionCommitment,
    setSignificantSpills,
    setHabitatProtectionRestorationCommitment,
    setAirQualityProtectionCommitment,
    setBiogenicCO2Emission,
    setBiogenicCO2305
} = Screen12Slice.actions;

export default Screen12Slice.reducer;
