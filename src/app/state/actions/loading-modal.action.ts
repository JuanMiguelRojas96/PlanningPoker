import { createAction, props } from "@ngrx/store";

export const startLoading = createAction(
  '[Loading Modal Component] Start Loading',
);

export const stopLoading = createAction(
  '[Loading Modal Component] Stop Loading',
);
