import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  contectForm!: FormGroup;
  constructor(private fb: FormBuilder, private data: DataService) { }

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
          },
          error: (res) => {
            alert("user not added")
          }
        })
    }
  }

}
