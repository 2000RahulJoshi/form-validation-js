let userNameError = document.getElementById("userNameError");
let phoneNoError = document.getElementById("userPhoneNoError");
let passwordError = document.getElementById("userPasswordError");
let confirmPasswordError = document.getElementById("confirmUserPasswordError");
let userEmailError = document.getElementById("userEmailError");
let userOccupationError = document.getElementById("userOccupationError");
let userGenderError = document.getElementById("userGenderError");
let submitButton = document.getElementById("submitBtn");

function checkEmpty(inputVal){
    inputVal = inputVal + "";
    if(inputVal == ""){
        return true;
    }
}

function removeError(event,field){
    event.preventDefault();

    if(field == 'userOccupationError'){
        userOccupationError.innerHTML = "";
    }

    else if(field == 'userGenderError'){
        userGenderError.innerHTML = "";
    }

}

function displayPassword(event,passwordType){
    event.preventDefault();
    let fieldOne = document.getElementById("userPassword");
    let fieldTwo = document.getElementById("confirmPassword")
    let userPassType = fieldOne.type;
    let confirmPassType = fieldTwo.type;
    
    if(passwordType == "userPassword"){
        if(userPassType == "password"){
            fieldOne.type = "text";
        }
        else{
            fieldOne.type = "password";
        }
    }
    
    else{
        if(confirmPassType == "password"){
            fieldTwo.type = "text";
        }
        else{
            fieldTwo.type = "password";
        }
    }
}

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    var formValues = {};
    formData.forEach(function(value, key){
        formValues[key] = value;
    });

    const fullname = formValues["Full Name"]
    const emailId = formValues['Email Id'];
    const phoneNo = formValues['Phone No'];
    const password = formValues["password"];
    const confirmPass = formValues['confirmPassword'];
    let userProfession = formValues['Job Profile'];
    let userGender = formValues['Gender'];
    
    let emptyField = false;
    
    // validation for full name
    if(checkEmpty(fullname)) {
        userNameError.innerHTML = "** Name can not be empty"
        emptyField = true;
    }

    // validation for email
    if(checkEmpty(emailId)){
        userEmailError.innerHTML = "** Email can not be empty"
        emptyField = true;
    }

    // validation for jobProfile
    if(checkEmpty(userProfession)){
        userOccupationError.innerHTML = "** Please select your job profile";
        userOccupationError.classList.add("text-danger");
        emptyField = true;
    }

    // validation for phoneNO
    if(checkEmpty(phoneNo)){
        phoneNoError.innerHTML = "** Phone no. can not be empty"
        emptyField = true;
    }

    // validation for gender
    if(checkEmpty(userGender)){
        userGenderError.innerHTML = "** please select your gender"
        emptyField = true;
    }

    // validation for password
    if(checkEmpty(password)){
        passwordError.innerHTML = "** Enter your password first"
        emptyField = true;
    }

    // validation for confirm password
    if(checkEmpty(confirmPass)){
        confirmPasswordError.innerHTML = "** Confirm password can not be empty"
        emptyField = true;
    }

    if(emptyField){
        submitButton.disabled = true;
        return;
    }

    else if(checkName(fullname)){
        return;
    }

    else if(chekPhoneNo(phoneNo)){
        return;
    }

    else if(checkPassword(password)){
        return;
    }

    else if(confirmPassword(password,confirmPass)){
        return;
    }

    let maskedPhoneNo = phoneNo.toString();
    let size = phoneNo.length-4;
    let starString = "";
    for(let i=0;i<size;i++){
        starString += '*';
    }
    maskedPhoneNo = starString + maskedPhoneNo.slice(size);
    formValues["Phone No"] = maskedPhoneNo;

    delete formValues["password"];
    delete formValues["confirmPassword"]
    var jsonData = JSON.stringify(formValues);

    localStorage.setItem('formData', jsonData);

    document.getElementById("spin").style.display = "block"
    setTimeout(function(){
        myForm.reset();
        document.getElementById("spin").style.display = "none"
        window.location.href = "display.html";
    },1000);
});


function checkName(fullname){
    // const regexFullName = /^[a-zA-Z\s.]{1,30}$/; 
    // if (!regexFullName.test(fullname)) {
    //     document.getElementById("userNameError").innerHTML = "** Invalid User Name";
    //     return true;
    // }
    // else{
    //     document.getElementById("userNameError").innerHTML = "";
    //     return false;
    // }
    fullname = fullname.trimEnd()
    let splitName = fullname.split(' ');

    if(splitName == ''){
        userNameError.innerHTML = "** Name can not be empty";
        return true;
    }

    if(splitName.includes('')){
        userNameError.innerHTML = "** Name can't have any extra spaces";
        return true;
    }
    
    for(let i=0;i<fullname.length;i++){
        let val = fullname[i];
        if((val>='a' && val<='z') || (val>='A' && val<='Z') || (val == ' ')){
            userNameError.innerHTML = "";
        }
        else{
            userNameError.innerHTML = "** Only alphabets are allowed in full name";
            return true;
        }
    }
    return false;
}

function chekPhoneNo(phoneNo){
    // const regexPhoneNo = /^[789][0-9]{9}$/;
    // if(!regexPhoneNo.test(phoneNo)){
    //     document.getElementById("userPhoneNoError").innerHTML = "** Please enter valid phone"
    //     return true;
    // }
    // else{
    //     document.getElementById("userPhoneNoError").innerHTML = "";
    //     return false;
    // }
    let flag = false;
    phoneNo = phoneNo.toString();
    phoneNo = phoneNo.trimEnd();
    // console.log(typeof phoneNo)
    for(let i=0;i<phoneNo.length;i++){
        if(!(phoneNo[i]>='0' && phoneNo[i]<='9') || phoneNo.length !== 10){
            flag = true;
            phoneNoError.innerHTML = "** Please enter valid phone no";
            break;
        }
        else{
            phoneNoError.innerHTML = "";
        }
    }
    return flag;
}

function checkPassword(password){
    // const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    // if(password.length < 8){
    //     document.getElementById("userPasswordError").innerHTML = "** Minimum Length should be eight";
    //     return true;
    // }
    // else if(!regexPassword.test(password)){
    //     document.getElementById("userPasswordError").innerHTML = "** Your password should contain special character";
    //     return true;
    // }
    // else{
    //     document.getElementById("userPasswordError").innerHTML = "";
    //     return false;
    // }
    let smallCh = 0;
    let capitalCh = 0;
    let numbers = 0;
    let specialCh = 0;
    let specialChString = "!@#$%^&*";
    for(let i=0;i<password.length;i++){
        if(password[i]>='a' && password[i]<='z'){
            smallCh++;
        }
        else if(password[i]>='A' && password[i]<='Z'){
            capitalCh++;
        }

        else if(password[i]>='0' && password[i]<='9'){
            numbers++;
        }
        else if(specialChString.includes(password[i])){
            specialCh++;
        }
    }
    // console.log(password)
    // console.log(`small ch ${smallCh} capital ${capitalCh} number ${numbers} specialCh ${specialCh}`);
    if(password.length < 8){
        passwordError.innerHTML = "** Minimum Length should be eight";
        return true;
    }
    else if(password.length > 16){
        passwordError.innerHTML = "** Maximum length can be sixteen";
        return true;
    }
    else if(smallCh>=1 && capitalCh>=1 && numbers>=1 && specialCh>=1){
        passwordError.innerHTML = "";
        return false;
    }
    else{
        passwordError.innerHTML = "** Your password should contain uppercase, lowercase & special character";
        return true;
    }
}

function confirmPassword(userPassword,confirmPassword){
    if(userPassword == ""){
        confirmPasswordError.innerHTML = "** Please create password first ";
        return true;
    }
    else if(userPassword !== confirmPassword){
        confirmPasswordError.innerHTML = "** Wrong password";
        return true;
    }
    else{
        confirmPasswordError.innerHTML = "";
        return false;
    }
}

function checkEmail(userEmail){
    // const regexEmail = /^[0-9a-zA-Z_]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,6}$/;
    // if(!regexEmail.test(userEmail)){
    //     document.getElementById("userEmail").innerHTML = "** invalid email id";
    //     return true;
    // }
    // else{
    //     document.getElementById("userEmail").innerHTML = "";
    //     return false;
    // }

    let dotCount = 0;
    let error = false;
    let splicedEmail = userEmail.split('@');
    if(splicedEmail.length != 2 || splicedEmail.includes('')){
        userEmailError.innerHTML = "** Invalid email id"
        return false;
    }

    let splicedEmailLeft = splicedEmail[0].split('.');
    let splicedEmailRight = splicedEmail[1].split('.');

    if(splicedEmailLeft.includes('') || splicedEmailRight.includes('')){
        userEmailError.innerHTML = "** invalid email id"
        return false;
    }

    for(let i=0;i<splicedEmail[0].length;i++){
        let ch = splicedEmail[0].at(i).toLowerCase();
        if(!((ch>='a' && ch<='z') || (ch>='0' && ch<='9') || ch == '.') ){
            userEmailError.innerHTML = "no special character allowed except @"
            error = true;
            break;
        }
    }

    for(let i=0;i<splicedEmail[1].length;i++){
        let ch = splicedEmail[1].at(i).toLowerCase();
        if(ch == '.'){
            dotCount++;
        }

        if(!((ch>='a' && ch<='z') || (ch>='0' && ch<='9') || ch == '.')){
            error=true;
            break;
        }
    }
    if(error || dotCount == 0){
        userEmailError.innerHTML = "** invalid email id";
        return false;
    }
    userEmailError.innerHTML = "";
    return true;
}

function chekPhoneNoInput(e,val){
    let key = e.key;
    let backSpace = (e.which == 8)
    let enter = (e.which == 13)
    if( !((key >='0' && key <='9') || backSpace || enter ) && val.length !== 10 ){
        phoneNoError.innerHTML = "** Only digits are allowed";
        return false;
    }
    else{
        phoneNoError.innerHTML = "";
    }
    
    return true;
}

function checkValidation(event,inputField){
    let val = event.target.value;
    submitButton.disabled = false;
    if(inputField === "fullName" && !checkName(val)){
        userNameError.classList.add("text-danger");
    }
    else if(inputField == "email" && !checkEmail(val)){
        userEmailError.classList.add("text-danger");
    }
    else if(inputField === "phoneNo" && !chekPhoneNoInput(event,val)){
        event.preventDefault();
        phoneNoError.classList.add("text-danger");
    }
    else if(inputField === "password" && !checkPassword(val)){
        passwordError.classList.add("text-danger");
    }
    else if(inputField === "confirmPassword"){
        let userPass = document.getElementById("userPassword").value;
        if(!confirmPassword(val,userPass)){
            confirmPasswordError.classList.add("text-danger");
        }
    }
    
}



