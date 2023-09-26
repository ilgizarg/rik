import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserAction, UserActionFailure, UserActionSuccess} from "../action/user-action";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {HttpService} from "../../service/http/http.service";
import {UserListInterface} from "../../interface/user-list";

@Injectable()
export class UserEffect {

  getUserEffect$ = createEffect(() => this.actions$.pipe(
      ofType(UserAction),
      switchMap(() => {
        return this.httpService.getUser().pipe(
          map((response: UserListInterface) => {
            return UserActionSuccess({userList: response})
          }),
          catchError(() => {
            return of(UserActionFailure({error: 'BAckend Eroor'}))
          })
        )
      })
    )

  );




  constructor (
    private actions$: Actions,
    private httpService: HttpService) {}
}
