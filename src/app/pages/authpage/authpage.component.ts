import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsService} from "../../services/forms.service";
import {AuthService} from "../../services/auth.service";
import {AuthResponseData} from "../../services/auth.response.model";

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.scss']
})
export class AuthpageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formsService: FormsService, private authService: AuthService) { }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit():void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.minLength(3)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  getErrorMsgFromControl(formControlLabel: string, formControl: FormControl): string {
    return this.formsService.getErrorMsgFromControl(formControlLabel, formControl);
  }

  submitForm() {

    if(!this.loginForm.valid) {
      return;
    }

    const email = this.email.value;
    const password = this.password.value;

    this.authService.login(email, password).subscribe((responseData: AuthResponseData) => {
      console.log(responseData);
    }, error => {
      console.log('Error: ', error);
    });

    this.loginForm.reset();
  }
}
