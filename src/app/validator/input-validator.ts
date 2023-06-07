import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function inputPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passVal = control.value;
        if(!passVal) return null;
        let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
        let result = pattern.test(passVal);
        return result ? null : {passwordStrength: true};
    }
}