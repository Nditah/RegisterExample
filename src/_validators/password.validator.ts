import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static MatchPassword(ac: AbstractControl) {
    let password = ac.get('password').value;
    let confirmPassword = ac.get('confirmPassword').value ;
    if( password != confirmPassword){
      return {matchPassword : true}; // 比對失敗
    }
    return null;
  }
}
