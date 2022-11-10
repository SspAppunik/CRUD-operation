import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  contectForm!: FormGroup;
  constructor(private fb: FormBuilder, private data: DataService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.contectForm = this.fb.group({
      'firstName': new FormControl('', [
        Validators.required,
      ]),
      'lastName': new FormControl('', [
        Validators.required,
      ])
    })
  }

  saveData() {
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

}
