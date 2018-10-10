import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../_validators/password.validator';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: any;
  formErrors = {
    'email': '',
    'displayName': '',
    'password': '',
    'confirmPassword': '',
    'matchPassword': ''
  };
  validatorMessages = {
    'email': {
      'required': '必填欄位',
      'email': '請照電子郵件格式填入'
      /*'pattern':'電子郵件格式不符'*/
    },
    'displayName': {
      'required': '必填欄位',
      'minlength': '長度至少為3',
      'maxlength': '長度最多為32'
    },
    'password': {
      'required': '必填欄位',
      'pattern': '至少須包含一字母一數字',
      'minlength': '長度至少為6',
      'maxlength': '長度最多為15'
    },
    'confirmPassword': {
      'required': '必填欄位',
    },
    'matchPassword': '密碼不相符'
  }

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  signUp() {
    let form = this.registerForm.value;
    const data = {
      email: form.email,
      password: form.passwordGroup.password,
      displayName: form.displayName,
    }
    this.auth.signUp(data).then(()=>{
      console.log('註冊成功')
      this.router.navigate(['/home']);
      this.registerForm.reset();
    });
  }

  buildForm() {
    this.registerForm = this.builder.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      displayName: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)]
      ],
      passwordGroup: new FormGroup({
        password: new FormControl('',
          [Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(15)]
        ),
        confirmPassword: new FormControl('',
          [Validators.required]
        )
      }, { validators: PasswordValidator.MatchPassword }),
    }
    );

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // reset messages
    this.onValueChanged();
  }

  // Update validation messages of the form
  private onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      switch (field) {
        case 'email':
        case 'displayName':
          var control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validatorMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
          break;
        case 'password':
        case 'confirmPassword':
          var group = form.get('passwordGroup');
          var control = group.get(field);

          if (control && control.dirty && !control.valid) {
            const messages = this.validatorMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
          break;
        case 'matchPassword':
          var group = form.get('passwordGroup');
          if (group.get('password').dirty && group.get('confirmPassword').dirty
            && group.errors && group.errors.matchPassword) {
            this.formErrors[field] = this.validatorMessages[field];
          }
          break;
      }
    }
  }
}
