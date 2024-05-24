import { createAction, props } from "@ngrx/store";
import { RoomModel } from "src/app/components/core/models/room-model";


export const cardsSelected = createAction(
  '[Room Component] Cards Selected',
  props<{ isCardsSelected: RoomModel }>(),
);

export const textCardsSelected = createAction(
  '[Room Component] Text Cards Selected',
  props<{ textCardsSelected: string[] }>(),
);
