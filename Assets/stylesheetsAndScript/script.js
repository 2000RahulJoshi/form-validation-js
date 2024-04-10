function checkEmpty(inputVal){
    inputVal = inputVal + "";
    if(inputVal == ""){
        return true;
    }
}

function alertMessage(str){
    alert(str);
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

    
    // validation for full name
    if (checkEmpty(fullname)) {
        alert("Please enter your name")
        return;
    }

    else if(checkName(fullname)){
        alertMessage("please enter valid name");
        return;
    }

    // validation for email
    else if(checkEmpty(emailId)){
        alertMessage("please enter your email");
        return;
    }

    // validation for phoneNO
    else if(checkEmpty(phoneNo)){
        alertMessage("please enter your phoneNo");
        return;
    }

    else if(chekPhoneNo(phoneNo)){
        alertMessage("please enter valid phone no");
        return;
    }

    // validation for password
    else if(checkEmpty(password)){
        alertMessage("please enter your password");
        return;
    }

    else if(checkPassword(password)){
        alertMessage("your password should contain special charcter and the range should be (8-16)");
        return;
    }

    // validation for confirm password
    else if(checkEmpty(confirmPass)){
        alertMessage("please cofirm your password");
        return;
    }

    else if(confirmPassword(password,confirmPass)){

        alertMessage("your password is not matched");
        return;
    }

    let maskedPhoneNo = phoneNo.toString();
    let size = phoneNo.length-4;
    let starString = "";
    for(let i=0;i<size;i++){
        starString += '*';
    }
    maskedPhoneNo = starString + maskedPhoneNo.slice(size);
    formValues["phoneNo"] = maskedPhoneNo;

    delete formValues["password"];
    delete formValues["confirmPassword"]
    var jsonData = JSON.stringify(formValues);

    localStorage.setItem('formData', jsonData);

    document.getElementById("spin").style.display = "block"
    setTimeout(function(){
        myForm.reset();
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
        document.getElementById("userNameError").innerHTML = "** Name can not be empty";
        return true;
    }

    if(splitName.includes('')){
        document.getElementById("userNameError").innerHTML = "** Name can't have any extra spaces";
        return true;
    }
    
    for(let i=0;i<fullname.length;i++){
        let val = fullname[i];
        if((val>='a' && val<='z') || (val>='A' && val<='Z') || (val == ' ')){
            document.getElementById("userNameError").innerHTML = "";
        }
        else{
            document.getElementById("userNameError").innerHTML = "** Only alphabets are allowed in full name";
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
        if(!(phoneNo[i]>='0' && phoneNo[i]<='9' && phoneNo.length == 10 && (phoneNo[0] == '7' || phoneNo[8] == '8' || phoneNo[9] == '9'))){
            flag = true;
            document.getElementById("userPhoneNoError").innerHTML = "** Please enter valid phone no";
            break;
        }
        else{
            document.getElementById("userPhoneNoError").innerHTML = "";
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
        document.getElementById("userPasswordError").innerHTML = "** Minimum Length should be eight";
        return true;
    }
    else if(password.length > 16){
        document.getElementById("userPasswordError").innerHTML = "** Maximum length can be sixteen";
        return true;
    }
    else if(smallCh>=1 && capitalCh>=1 && numbers>=1 && specialCh>=1){
        document.getElementById("userPasswordError").innerHTML = "";
        return false;
    }
    else{
        document.getElementById("userPasswordError").innerHTML = "** Your password should contain uppercase, lowercase & special character";
        return true;
    }
}

function confirmPassword(userPassword,confirmPassword){
    if(userPassword == ""){
        document.getElementById("confirmUserPasswordError").innerHTML = "** Please create password first ";
        return true;
    }
    else if(userPassword !== confirmPassword){
        document.getElementById("confirmUserPasswordError").innerHTML = "** Wrong password";
        return true;
    }
    else{
        document.getElementById("confirmUserPasswordError").innerHTML = "";
        return false;
    }
}

function checkEmail(userEmail){
    const regexEmail = /^[0-9a-zA-Z_]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,6}$/;
    if(!regexEmail.test(userEmail)){

    }
    else{

    }
}


function checkValidation(event,inputField){
    let val = event.target.value;
    if(inputField === "fullName" && !checkName(val)){
        document.getElementById("userNameError").classList.add("text-danger");
    }
    else if(inputField === "phoneNo" && !chekPhoneNo(val)){
        document.getElementById("userPhoneNoError").classList.add("text-danger");
    }
    else if(inputField === "password" && !checkPassword(val)){
        document.getElementById("userPasswordError").classList.add("text-danger");
    }
    else if(inputField === "confirmPassword"){
        let userPass = document.getElementById("userPassword").value;
        if(!confirmPassword(val,userPass)){
            document.getElementById("confirmUserPasswordError").classList.add("text-danger");
        }
    }
    
}



