import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {DataSource} from '@angular/cdk/collections';
import {UserAction} from "./share/store/action/user-action";
import {Observable, ReplaySubject, map} from "rxjs";
import { userListSelector } from './share/store/selectors/user-selector';
import { UserListInterface } from './share/interface/user-list';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInterface } from './share/interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'rik';
  loading$?: Observable<boolean | false>;
  userList$?: Observable<UserListInterface | null>;
  backendError$?: Observable<{} | null>;
  filterForms = new FormGroup({
    login: new FormControl(''),
    phone: new FormControl(''),
    createAt: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    modified: new FormControl(''),
  })

  dataSource!:UserInterface[];
  displayedColumns: string[] = ['action', 'name','phone', 'createAt', 'modified', 'email', 'status', 'role', 'ecp'];

  constructor(private readonly store: Store) {
   
  }

  ngOnInit() {
    console.log('App component');
    this.store.dispatch(UserAction());
    this.initValues();    
  }
  
  initValues(): void {
    this.userList$ = this.store.select(userListSelector).pipe(map(res=>{
      console.log("RESPO", res);
      return res
    }))
    this.userList$.subscribe((res)=>{
      this.dataSource = res?.users!=null?res?.users:[];
    });
  }

  formSubmit(): void {
    console.log('form submit');
  }
  
  formReset(): void {
    console.log('form reset');
  }

}

