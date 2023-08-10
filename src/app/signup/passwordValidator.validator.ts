import { ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control) => {
    console.log(control);
    const password = control?.value;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const length = password?.length;
    const valid = hasNumber && hasUpper && hasLower && hasSpecial && length > 8;
    if (!valid) {
      return {
        passwordStrength: {
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial,
          length,
        },
      };
    }
    return null;
  };
}

export function passwordMatchValidator(
  controlName: string,
  compareControlName: string
): ValidatorFn {
  return (control) => {
    const password = control.parent?.get(controlName)?.value;
    const passwordConfirm = control.parent?.get(compareControlName)?.value;
    const valid = password === passwordConfirm;

    if (!valid) {
      return {
        passwordMatch: "Passwords don't match",
      };
    }
    return null;
  };
}
