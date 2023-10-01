function validateForm(inForm) {
	var emptyField = false;
	var emailValidation = false;
	var formIsEmpty = true;
	var formFields = document.getElementById("signup-form").getElementsByClassName("inData");

	for (const field of formFields) {
		if (field.value.trim() == "") {
			field.setCustomValidity("Cannot be empty");
			emptyField = true;
		} else {
			if (field.name == "email") {
				emailValidation = validateEmail(field);
			} else {
				field.setCustomValidity('');
			}
			formIsEmpty = false;
		}


	}
	if (emailValidation && emptyField && !formIsEmpty) {
		inForm.submit();
		console.log("Submitted")
	} else {

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