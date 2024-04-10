var jsonData = localStorage.getItem('formData');
var formValues = JSON.parse(jsonData);

var displayInfoDiv = document.getElementById("displayInfo");
// displayInfoDiv.innerHTML = "<p>Name: " + formValues.fullName + "</p>" +
//                            "<p>Email: " + formValues.email + "</p>" +
//                            "<p>phone No: " + formValues.phoneNo + "</p>" +
//                            "<p>Gender: " + formValues.gender + "</p>" +
//                            "<p>Job Profile: " + formValues.jobProfile + "</p>";

for (key in formValues){
    let para = document.createElement("p");
    let val = `${key} : ${formValues[key]}`;
    para.innerText = val;
    displayInfoDiv.appendChild(para);
}


