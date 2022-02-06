function checkPassword(str: any) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    console.log(re.test(str));
    return re.test(str);
  }


export default checkPassword;