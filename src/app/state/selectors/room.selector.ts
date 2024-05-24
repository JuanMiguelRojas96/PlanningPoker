import { RoomState } from "src/app/components/core/models/room.state";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";



export const selectIsCardsSelected = (state: AppState) => state.isCardsSelected
export const selectTextCardsSelected = (state: AppState) => state.textCardsSelected

export const selectIsCardsSelectedSelector = createSelector(
  selectIsCardsSelected,
  (state: RoomState) => state.isCardsSelected
)

export const selectTextCardsSelectedSelector = createSelector(
  selectTextCardsSelected,
  (state: RoomState) => state.textCardsSelected
)


