import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StudyTopic {
  id: string
  name: string
  sourceJobId?: string
  isMastered: boolean
  progress: number
  content?: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
}

interface StudyState {
  topics: StudyTopic[]
  activeTopic: StudyTopic | null
  chatHistory: ChatMessage[]
  loading: boolean
}

const initialState: StudyState = {
  topics: [],
  activeTopic: null,
  chatHistory: [],
  loading: false,
}

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<StudyTopic[]>) => {
      state.topics = action.payload
    },
    addTopic: (state, action: PayloadAction<StudyTopic>) => {
      state.topics.push(action.payload)
    },
    setActiveTopic: (state, action: PayloadAction<StudyTopic | null>) => {
      state.activeTopic = action.payload
    },
    updateTopic: (state, action: PayloadAction<StudyTopic>) => {
      const index = state.topics.findIndex(topic => topic.id === action.payload.id)
      if (index !== -1) {
        state.topics[index] = action.payload
      }
    },
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chatHistory.push(action.payload)
    },
    clearChatHistory: (state) => {
      state.chatHistory = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { 
  setTopics, 
  addTopic, 
  setActiveTopic, 
  updateTopic, 
  addChatMessage, 
  clearChatHistory, 
  setLoading 
} = studySlice.actions
export default studySlice.reducer
