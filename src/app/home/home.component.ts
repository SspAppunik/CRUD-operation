import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { IModel } from '../model.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  displayedColumns: string[] = ['id','firstName', 'lastName','action'];
  dataSource!: MatTableDataSource<IModel>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private data: DataService, public dialog: MatDialog ) {   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser() {
    this.data.getList()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<IModel>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  openDialog() {
    this.dialog.open(DialogComponent).afterClosed().subscribe(
      val => {
        if(val === "save"){
          this.getListUser();
        }
      }
    );
  }

  editUser(row: any){
    this.dialog.open(DialogComponent,{
     data : row
    }).afterClosed().subscribe(val =>{
      if(val === "update"){
        this.getListUser();
      }
    })
  }

  deleteUser(id : number){
    this.data.deleteUser(id)
    .subscribe({
      next : (res)=>{
       alert("user deleted");
       this.getListUser()
      },
      error: (res)=>{
        console.log("user not deleted")
      }
    }) 
  }

}

