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
				emailIsValid = validateEmail(field);
			} else {
				field.setCustomValidity('');
			}
			formHasContent = true;
		}


	}
	if (emailIsValid && noEmptyField && formHasContent) {
		subTheForm();
		document.getElementById("signup-form").submit();
	}
}

function validateEmail(fieldE) {
	var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var domainBlocker = /.*@cra*/
	var emailIsValid = false
	fieldE.setCustomValidity("");
	if (!pattern.test(fieldE.value)) {
		fieldE.setCustomValidity("Invalid Email Address");
	} else {
		if (domainBlocker.test(fieldE.value)) {
			fieldE.setCustomValidity("Do not use a CRA email address");
		} else {
			return true
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
	console.log(dataToSend);
	var dataToSendString =  JSON.stringify(dataToSend) 
	console.log("Data being sent: " + dataToSend)

	fetch('https://dn3ngcdqdznsdiirr6j44yeptm0ugpsa.lambda-url.us-east-1.on.aws/default', {
		method: 'POST',
        "headers": {
			'Content-Type': "application/json"
        },
		body: dataToSendString,
	})
		.then(response => {
			console.log(response.text())
		})
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.log('Error:', error)
		});
}