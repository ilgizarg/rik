import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserAction} from "./share/store/action/user-action";
import {Observable} from "rxjs";
import {UserList} from "./share/interface/user.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'rik';
  loading$ = Observable<boolean | false>;
  userList$ = Observable<UserList | null>;
  backendError$ = Observable<{} | null>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    console.log('App component');
    this.store.dispatch(UserAction());

  }
}
