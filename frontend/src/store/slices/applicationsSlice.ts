import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ApplicationStatus {
  INTERESTED = 'interested',
  APPLIED = 'applied',
  INTERVIEWING = 'interviewing',
  OFFER = 'offer',
  REJECTED = 'rejected',
}

interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: ApplicationStatus
  deadline?: string
  appliedDate?: string
  notes: string
  outcome?: string
  shortcomings?: string
}

interface ApplicationsState {
  applications: Application[]
  loading: boolean
}

const initialState: ApplicationsState = {
  applications: [],
  loading: false,
}

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload)
    },
    updateApplication: (state, action: PayloadAction<Application>) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id)
      if (index !== -1) {
        state.applications[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setApplications, addApplication, updateApplication, setLoading } = applicationsSlice.actions
export default applicationsSlice.reducer
