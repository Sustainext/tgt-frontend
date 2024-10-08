// src/features/users/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      personalDetails: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "123-456-7890",
        roleType: "Manager",
        jobTitle: "Project Manager",
        department: "Management",
        status: "Active",
      },
      organizationDetails: {
        organization: ["Eternal"],
        corporate: ["Corporate A"],
        location: ["New York"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "234-567-8901",
        roleType: "Manager",
        jobTitle: "Software Engineer",
        department: "Development",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate B"],
        location: ["San Francisco"],
      },
      permissions: {
        collect: true,
        analyse: false,
        report: false,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        phoneNumber: "345-678-9012",
        roleType: "Manager",
        jobTitle: "HR Manager",
        department: "Human Resources",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["HealthPlus"],
        corporate: ["Corporate C"],
        location: ["Chicago"],
      },
      permissions: {
        collect: false,
        analyse: true,
        report: true,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 4,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@example.com",
        phoneNumber: "456-789-0123",
        roleType: "Manager",
        jobTitle: "Marketing Specialist",
        department: "Marketing",
        status: "Active",
      },
      organizationDetails: {
        organization: ["HealthPlus"],
        corporate: ["Corporate D"],
        location: ["Los Angeles"],
      },
      permissions: {
        collect: true,
        analyse: false,
        report: true,
        optimise: false,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 5,
        firstName: "David",
        lastName: "Williams",
        email: "david.williams@example.com",
        phoneNumber: "567-890-1234",
        roleType: "Employee",
        jobTitle: "Accountant",
        department: "Finance",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["FinanceInc"],
        corporate: ["Corporate E"],
        location: ["New York","Delhi","Mumbai","Kolkata","Bangalore"],
      },
      permissions: {
        collect: false,
        analyse: true,
        report: false,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 6,
        firstName: "Sophia",
        lastName: "Brown",
        email: "sophia.brown@example.com",
        phoneNumber: "678-901-2345",
        roleType: "Manager",
        jobTitle: "Chief Technical Officer",
        department: "IT",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["Seattle"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: true,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 7,
        firstName: "Daniel",
        lastName: "Miller",
        email: "daniel.miller@example.com",
        phoneNumber: "789-012-3456",
         roleType: "Employee",
        jobTitle: "Sales Representative",
        department: "Sales",
        status: "Active",
      },
      organizationDetails: {
        organization: ["RetailSolutions"],
        corporate: ["Corporate F"],
        location: ["Miami"],
      },
      permissions: {
        collect: false,
        analyse: false,
        report: true,
        optimise: true,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 8,
        firstName: "Olivia",
        lastName: "Garcia",
        email: "olivia.garcia@example.com",
        phoneNumber: "890-123-4567",
        roleType: "Manager",
        jobTitle: "Operations Manager",
        department: "Operations",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["RetailSolutions"],
        corporate: ["Corporate G"],
        location: ["Austin"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: false,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 9,
        firstName: "James",
        lastName: "Martinez",
        email: "james.martinez@example.com",
        phoneNumber: "901-234-5678",
         roleType: "Employee",
        jobTitle: "Support Engineer",
        department: "Customer Support",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["Houston"],
      },
      permissions: {
        collect: true,
        analyse: false,
        report: false,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 10,
        firstName: "Ava",
        lastName: "Wilson",
        email: "ava.wilson@example.com",
        phoneNumber: "012-345-6789",
         roleType: "Employee",
        jobTitle: "Business Analyst",
        department: "Business Analysis",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["FinanceInc"],
        corporate: ["Corporate E"],
        location: ["Boston"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: false,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 11,
        firstName: "Isabella",
        lastName: "Thomas",
        email: "isabella.thomas@example.com",
        phoneNumber: "123-456-7890",
        roleType: "Manager",
        jobTitle: "Chief Financial Officer",
        department: "Finance",
        status: "Active",
      },
      organizationDetails: {
        organization: ["FinanceInc"],
        corporate: ["Corporate E"],
        location: ["New York"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: true,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 12,
        firstName: "William",
        lastName: "Moore",
        email: "william.moore@example.com",
        phoneNumber: "234-567-8901",
         roleType: "Employee",
        jobTitle: "Network Manageristrator",
        department: "IT",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["San Francisco"],
      },
      permissions: {
        collect: false,
        analyse: false,
        report: true,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 13,
        firstName: "Mia",
        lastName: "Harris",
        email: "mia.harris@example.com",
        phoneNumber: "345-678-9012",
         roleType: "Employee",
        jobTitle: "Legal Advisor",
        department: "Legal",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["LegalEagle"],
        corporate: ["Corporate H"],
        location: ["Chicago"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: false,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 14,
        firstName: "Alexander",
        lastName: "Clark",
        email: "alexander.clark@example.com",
        phoneNumber: "456-789-0123",
        roleType: "Manager",
        jobTitle: "CEO",
        department: "Executive",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["New York"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: true,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 15,
        firstName: "Charlotte",
        lastName: "Lopez",
        email: "charlotte.lopez@example.com",
        phoneNumber: "567-890-1234",
         roleType: "Employee",
        jobTitle: "Product Manager",
        department: "Product Management",
        status: "Active",
      },
      organizationDetails: {
        organization: ["RetailSolutions"],
        corporate: ["Corporate F"],
        location: ["Miami"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: false,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 16,
        firstName: "Liam",
        lastName: "Gonzalez",
        email: "liam.gonzalez@example.com",
        phoneNumber: "678-901-2345",
         roleType: "Employee",
        jobTitle: "Data Analyst",
        department: "Analytics",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["FinanceInc"],
        corporate: ["Corporate E"],
        location: ["San Diego"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: false,
        optimise: true,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 17,
        firstName: "Amelia",
        lastName: "Martinez",
        email: "amelia.martinez@example.com",
        phoneNumber: "789-012-3456",
        roleType: "Manager",
        jobTitle: "Head of Marketing",
        department: "Marketing",
        status: "Active",
      },
      organizationDetails: {
        organization: ["HealthPlus"],
        corporate: ["Corporate C"],
        location: ["New York"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: true,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 18,
        firstName: "Ethan",
        lastName: "Perez",
        email: "ethan.perez@example.com",
        phoneNumber: "890-123-4567",
         roleType: "Employee",
        jobTitle: "UX Designer",
        department: "Design",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["Los Angeles"],
      },
      permissions: {
        collect: false,
        analyse: false,
        report: true,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        id: 19,
        firstName: "Harper",
        lastName: "White",
        email: "harper.white@example.com",
        phoneNumber: "901-234-5678",
        roleType: "Manager",
        jobTitle: "Head of Sales",
        department: "Sales",
        status: "Inactive",
      },
      organizationDetails: {
        organization: ["RetailSolutions"],
        corporate: ["Corporate F"],
        location: ["Boston"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: false,
        track: false,
      },
    },
    {
      personalDetails: {
        id: 20,
        firstName: "Elijah",
        lastName: "King",
        email: "elijah.king@example.com",
        phoneNumber: "012-345-6789",
         roleType: "Employee",
        jobTitle: "Software Developer",
        department: "Development",
        status: "Active",
      },
      organizationDetails: {
        organization: ["TechCorp"],
        corporate: ["Corporate A"],
        location: ["San Francisco"],
      },
      permissions: {
        collect: true,
        analyse: false,
        report: false,
        optimise: false,
        track: true,
      },
    },
    {
      personalDetails: {
        firstName: "Henry",
        lastName: "Scott",
        email: "henry.scott@example.com",
        phoneNumber: "123-456-7890",
        roleType: "Manager",
        jobTitle: "Chief Operating Officer",
        department: "Operations",
        status: "Active",
      },
      organizationDetails: {
        organization: ["RetailSolutions"],
        corporate: ["Corporate G"],
        location: ["Chicago"],
      },
      permissions: {
        collect: true,
        analyse: true,
        report: true,
        optimise: true,
        track: true,
      },
    },
  ],
  currentUser: {
    personalDetails: {},
    organizationDetails: {},
    permissions: {},
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      state.currentUser.personalDetails = action.payload;
    },
    setOrganizationDetails: (state, action) => {
      state.currentUser.organizationDetails = action.payload;
    },
    setPermissions: (state, action) => {
      state.currentUser.permissions = action.payload;
    },
    addUser: (state) => {
      const newUser = {
        ...state.currentUser,
        personalDetails: {
          ...state.currentUser.personalDetails,
          id: Date.now(),
        },
      };
      state.users.push(newUser);
      state.currentUser = {
        personalDetails: {},
        organizationDetails: {},
        permissions: {},
      };
    },
    
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload.updates,
        };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.personalDetails.id !== action.payload);
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const userIndex = state.users.findIndex((user) => user.personalDetails.id === userId);

      if (userIndex !== -1) {
        state.users[userIndex].personalDetails.status = status;
      }
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setPermissions,
  setPersonalDetails,
  setOrganizationDetails,
  updateUserStatus,
  setCurrentUser,
} = usersSlice.actions;
export default usersSlice.reducer;
