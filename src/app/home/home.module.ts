import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    AddUserComponent,
    ListUserComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddUserComponent,
    ListUserComponent,
  ]

})
export class HomeModule { }
