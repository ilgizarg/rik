import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserAction} from "./share/store/action/user-action";
import {Observable, ReplaySubject, map} from "rxjs";
import { userListSelector } from './share/store/selectors/user-selector';
import { userDataInterface, UserListInterface } from './share/interface/user-list';
import { FormControl, FormGroup } from '@angular/forms';
import { UserTableInterface } from './share/interface/user';
import { MatTable } from '@angular/material/table';

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
    login: new FormControl('', ),
    phone: new FormControl(''),
    createAt: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    modified: new FormControl(''),
  })

  dataSource!:UserTableInterface[];
  displayedColumns: string[] = ['action', 'name','phone', 'createAt', 'modified', 'email', 'status', 'role', 'ecp'];
  
  constructor(private readonly store: Store) {
   
  }

  ngOnInit() {
    console.log('App component');
    this.store.dispatch(UserAction());
    this.initValues();    
  }
  
  initValues(): void {
    this.store.select(userListSelector).pipe(map(res=>{
      console.log("RESPO", res);
      //@ts-ignore
      const data: UserTableInterface[] = [];
      res?.users?.forEach((cu, i, a) => {
        //@ts-ignore
        const userDate:userDataInterface = res.data.find((x: userDataInterface) =>x.user_id==cu.id);
        const item:UserTableInterface = {...cu, ...userDate};
       data.push(item);
     })
     return data;
    })).subscribe((res: UserTableInterface[])=>{
       this.dataSource = res;
      
    });
  }

  formSubmit(): void {
    console.log('form submit', this.filterForms.value);
  }
  
  formReset(): void {
    console.log('form reset');
  }

}

