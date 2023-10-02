function validateForm(inForm) {
	var noEmptyField = true;
	var emailIsValid = false;
	var formHasContent = false;
	var formFields = document.getElementById("signup-form").getElementsByClassName("inData");

	for (const field of formFields) {
		if (field.value.trim() == "") {
			field.setCustomValidity("Cannot be empty");
			noEmptyField = false;
		} else {
			if (field.name == "email") {
				emailValidation = validateEmail(field);
			} else {
				field.setCustomValidity('');
			}
			formHasContent = true;
		}


	}
	if (emailIsValid && noEmptyField && formHasContent) {
		alert(document.getElementById("fname"));
		subTheForm();
	}
}

function validateEmail(fieldE) {
	var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var domainBlocker = /.*@cra*/

	fieldE.setCustomValidity("");
	if (!pattern.test(fieldE.value)) {
		fieldE.setCustomValidity("Invalid Email Address");
	} else {
		if (domainBlocker.test(fieldE.value)) {
			fieldE.setCustomValidity("Do not use a CRA email address");
		} else {
			return true;
		}
	}
	return false;
}

function subTheForm() {
	const dataToSend = {
		"First_Name": document.getElementById("fname").value,
		"Last_Name": document.getElementById("lname").value,
		"Email": document.getElementById("email").value
	}

	fetch('https://dn3ngcdqdznsdiirr6j44yeptm0ugpsa.lambda-url.us-east-1.on.aws/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": "https://afs-summerside.github.io",

		},
		body: JSON.stringify(dataToSend),
	})
		.then(response => console.log(response.text()))
		.then(data => console.log(data))
		.catch(error => console.log('Error:', error));

		
}