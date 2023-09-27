import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserAction} from "./share/store/action/user-action";
import {Observable, ReplaySubject, map} from "rxjs";
import { userListSelector } from './share/store/selectors/user-selector';
import { userDataInterface, UserListInterface } from './share/interface/user-list';
import { FormControl, FormGroup } from '@angular/forms';
import { UserTableInterface } from './share/interface/user';
import { MatTable, MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';

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
    name: new FormControl('', ),
    phone: new FormControl(''),
    createAt: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    modified: new FormControl(''),
  })

  dataSource!: UserTableInterface[];
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
    
    const filterObject = Object.keys(this.filterForms.value).filter((c,i,a)=> {
      return this.filterForms.get(c)?.value.trim()!==''?this.filterForms.get(c):null;
      });
    filterObject.forEach((c: string,i,a)=>{
      console.log(this.filterForms.get(c)?.value.trim().toLowerCase());
      this.dataSource = this.dataSource.filter((cc,i)=>{
        console.log(c);
        console.log(cc);
        //@ts-ignore
        console.log(cc[c]);
        //@ts-ignore
        return cc[c].toLowerCase().includes(this.filterForms.get(c)?.value.trim().toLowerCase())
        
      });
    })
    //const filterValue = (event.target as HTMLInputElement).value;
    
  }
  
  formReset(): void {
    console.log('form reset');
  }

}

