import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  contectForm! : FormGroup;
  formbuilder: any;
  constructor(formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.contectForm = this.formbuilder.group([
    ])
  }

}
