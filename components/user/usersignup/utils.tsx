export const passwordValidationErrorMessage = "1. Password should be atleast 8 character long\n2. Must contain a capital letter\n3. Must contain a special character";
export const inputMode = "outlined";
export const activeOutlineColor = "purple";
export const buttonTextColor = "purple";
export const errorMsgColor = "red";
export const invalidUserNamePasswordErrorMessage = "invalid username or password";
export const invalidUserNameErrorMessage = "not a valid username";
export const buttonWidth = 300;

function checkPassword(str: any) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    console.log(re.test(str));
    return re.test(str);
}

export default checkPassword;
