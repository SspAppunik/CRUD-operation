import { Component , Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  contectForm!: FormGroup;
  actionBtn : string = 'Add'
  constructor(private fb: FormBuilder,
     private data: DataService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.contectForm = this.fb.group({
      'firstName': new FormControl('', [
        Validators.required,
      ]),
      'lastName': new FormControl('', [
        Validators.required,
      ])
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.contectForm.controls['firstName'].setValue(this.editData.firstName);
      this.contectForm.controls['lastName'].setValue(this.editData.lastName);
    }
  }

  saveData() {
    if(!this.editData){
    if (this.contectForm.valid) {
      this.data.postList(this.contectForm.value)
        .subscribe({
          next: (res) => {
            alert("user added sucessfully")
            this.contectForm.reset();
            this.dialogRef.close();
          },
          error: (res) => {
            alert("user not added")
          }
        })
    }
  }
  else{
    this.updateData()
  }
  }

  
   
  updateData(){
    this.data.putList(this.contectForm.value , this.editData.id)
    .subscribe({
      next : (res) =>{
        alert("user data updated");
        this.contectForm.reset();
        this.dialogRef.close("update");
      },
      error: (res) => {
        alert("user data not updated")
      }
    })  
  }
}
