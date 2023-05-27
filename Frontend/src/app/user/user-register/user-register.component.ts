import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import * as alertify from 'alertifyjs';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;

  user: any = {};

  userSumitted!: boolean;

  constructor(private fb:FormBuilder,
              private userService:UserServiceService,
              private alertify: AlertifyService){ }

  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(11)])
    // },{ validators: this.passwordMatchingValidator});

    this.createRegisterationForm();
  }

  createRegisterationForm()
  {
    this.registerationForm = this.fb.group({
      userName:[null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null,[Validators.required, Validators.maxLength(11)]]
    },{ validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  {
   const password = control.get('password');
   const confirmPassword = control.get('confirmPassword');

   return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  // ---------------------------------------
  // Getter Methods for all form controls
  // ---------------------------------------

  get userName()
  {
    return this.registerationForm.get('userName') as FormControl;
  }
  get email()
  {
    return this.registerationForm.get('email') as FormControl;
  }
  get password()
  {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword()
  {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile()
  {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit()
  {
    this.user = Object.assign(this.user, this.registerationForm.value);
    this.userSumitted = true;
    if(this.registerationForm.valid)
    {
      this.userSumitted = false;
      localStorage.setItem('Users',JSON.stringify(this.user));
      this.alertify.success('Congrats, you are successfully registered');
    }
    else
    {
      this.alertify.error('Kindly, provide the required fields!');
    }
  }

  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

}
