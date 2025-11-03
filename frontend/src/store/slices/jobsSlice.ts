import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  url: string
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
  postedDate: string
}

interface JobsState {
  jobs: Job[]
  loading: boolean
  filters: {
    role: string
    location: string
    minSalary: number
  }
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  filters: {
    role: '',
    location: '',
    minSalary: 0,
  },
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setJobs, setLoading, updateFilters } = jobsSlice.actions
export default jobsSlice.reducer
