import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  isUserExist: boolean = true;
  copyYear: number = new Date().getFullYear();

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  onSubmit(): void {
    console.log(this.myForm);
    if (this.myForm.valid) {
      this.http.post<any>('http://localhost:3000/login', this.myForm.value,{ withCredentials: true }).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("userData", JSON.stringify(response));
          this.isUserExist = true;
          this.router.navigate(['/']); // Navigate to the home page or desired route
        },
        error: (err) => {
          console.log(err.message);
          this.isUserExist = false;
        }
      });
    }
  }
  closeAlertUserExist(): void {
    // Set isUserExist to false to hide the alert
    this.isUserExist = false;
  }
  ngOnDestroy(): void {}
}
