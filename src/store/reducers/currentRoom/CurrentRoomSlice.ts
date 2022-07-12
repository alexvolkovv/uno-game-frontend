import { RoomType } from '../../../models/RoomType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentRoom } from './actionCreators'

type CurrentRoomState = {
  currentRoom: RoomType | null
  isLoading: boolean
  error: string
}

const initialState: CurrentRoomState = {
  currentRoom: null,
  isLoading: false,
  error: '',
}

export const currentRoomSlice = createSlice({
  name: 'currentRoom',
  initialState,
  reducers: {
    setCurrentRoom(state, action: PayloadAction<RoomType>) {
      state.currentRoom = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentRoom.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(
      getCurrentRoom.fulfilled,
      (state, action: PayloadAction<RoomType>) => {
        if (action.payload.maxCount > action.payload.count) {
          state.currentRoom = action.payload
          state.error = ''
        } else {
          state.currentRoom = null
          state.error = 'Достигнуто максимальное количество игроков'
        }

        state.isLoading = false
      }
    )

    builder.addCase(
      getCurrentRoom.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      }
    )
  },
})

export const { setCurrentRoom } = currentRoomSlice.actions

export default currentRoomSlice.reducer
