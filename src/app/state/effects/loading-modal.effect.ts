import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, of, switchMap } from "rxjs";
import { startLoading, stopLoading } from "../actions/loading-modal.action";


@Injectable()
 export class LoadingModalEffect {
   constructor(private actions$: Actions){}

   startLoading$ = createEffect(() => this.actions$.pipe(
     ofType(startLoading),
     switchMap(() => of(stopLoading()).pipe(delay(5000))),
   )
  );

 }
