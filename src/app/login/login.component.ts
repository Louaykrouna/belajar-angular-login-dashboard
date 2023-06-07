import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inputPasswordValidator } from '../validator/input-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  copyYear: number;
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    let tgl = new Date();
    this.copyYear = tgl.getFullYear();
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      floatingEmail: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }
      ],
      floatingPassword: [
        '',
        {
          validators: [Validators.required, inputPasswordValidator()],
          updateOn: 'submit'
        }
      ]
    });
  }

  get floatingEmail() {
    return this.myForm.get('floatingEmail');
  }
  get floatingPassword() {
    return this.myForm.get('floatingPassword');
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Perform further actions with the form data
    }
  }

  ngOnDestroy(): void {
    
  }
}
interface UserObj {
  id: number;
  name: string;
  email: string;
  password: string;
}