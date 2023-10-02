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
	
	fetch('https://sfka8hckge.execute-api.us-east-1.amazonaws.com/default/emailAppender', {
		method: 'POST',
        "headers": {
			'Content-Type': "application/json"
        },
		body: JSON.stringify(dataToSend),
	})
		.then(response => alert(response.text()))
		.then(data => alert(data))
		.catch(error => alert('Error:', error));
}