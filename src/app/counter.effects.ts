import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SetInitialCount, Types } from './counter.actions';

@Injectable()
export class CounterEffects {
  @Effect()
  loadMovies$ = this.actions$.pipe(
    ofType(Types.GetInitialCount),
    mergeMap(() =>
      this.http
        .get<{ users: Array<any> }>(
          'https://jsonplaceholder.typicode.com/users',
        )
        .pipe(
          tap(console.log),
          map(({ users: { length: count } }) => new SetInitialCount({ count })),
          catchError(() => EMPTY),
        ),
    ),
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
