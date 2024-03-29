import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user/UserSlice'
import roomsReducer from './reducers/rooms/RoomsSlice'
import currentRoomReducer from './reducers/currentRoom/CurrentRoomSlice'
import gameReducer from './reducers/game/gameSlice'

const rootReducer = combineReducers({
  userReducer,
  roomsReducer,
  currentRoomReducer,
  gameReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
