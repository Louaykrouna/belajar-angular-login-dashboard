import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

import { Subscription } from 'rxjs';

import { inputPasswordValidator } from '../validator/input-validator';
import { UserObjType } from '../type/type-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  copyYear: number;
  myForm!: FormGroup;
  varSub!: null | Subscription;
  userData$;
  isUserExist;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    let tgl = new Date();
    this.copyYear = tgl.getFullYear();

    this.userData$ = this.http.get<UserObjType[]>('/assets/user-data.json');
    this.isUserExist = true;
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
      this.varSub = this.userData$.subscribe({
        next: (response) => {         
          let tempUE = false; 
          for (let i = 0; i < response.length; i++) {
            if (response[i].email === this.myForm.value.floatingEmail && response[i].password === this.myForm.value.floatingPassword) {
              tempUE = true;
              localStorage.setItem("isLogin", "true");
              let userData: UserObjType = {...response[i]};
              delete userData.password;
              localStorage.setItem("userData", JSON.stringify(userData));
              break;
            }
          }
          if (tempUE) {
            this.isUserExist = true;
            this.router.navigate(['/']);
          }
          else this.isUserExist = false;
        },
        error: (err) => {
          console.log(err.message);
        },
        complete: () => console.log('Complete!')
      });
    }
  }

  closeAlertUserExist(): void{
    this.isUserExist = true;
  }

  ngOnDestroy(): void {
    if (this.varSub) this.varSub.unsubscribe();
  }
}