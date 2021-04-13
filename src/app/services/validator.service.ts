import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  passMatch( pass1 : string , pass2 : string) {

    return (form : FormGroup) => {
      const pass = form.controls[pass1];
      const pass_confirm = form.controls[pass2];

      if (pass.value === pass_confirm.value) {
        pass_confirm.setErrors(null);
      } else {
        pass_confirm.setErrors({notEqual : true});
      }
    }
  }
}
