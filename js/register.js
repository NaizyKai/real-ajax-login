// Object to track errors.
var regerrors = {};

// Function to hide or show tracked errors, and enable or disable registration button.
function checkErrors(regerrorsObject) {
	$('#error').html('');
	if(regerrorsObject.usernamelen) {
		$('#error').append('<span class="error">Error:</span> This username should be longer.<br>');
		$('#regsubmit').prop('disabled', true);
	}
	if(regerrorsObject.username) {
		$('#error').append('<span class="error">Error:</span> This username is unavailable.<br>');
		$('#regsubmit').prop('disabled', true);
	}
	if(regerrorsObject.passlen) {
		$('#error').append('<span class="error">Error:</span> Password should be at least 6 characters.<br>');
		$('#regsubmit').prop('disabled', true);
	}
	if(regerrorsObject.passconfirm) {
		$('#error').append('<span class="error">Error:</span> Passwords do not match.<br>');
		$('#regsubmit').prop('disabled', true);
	}
	if(regerrorsObject.displayname) {
		$('#error').append('<span class="error">Error:</span> Display name should be at least 3 characters.<br>');
		$('#regsubmit').prop('disabled', true);
	}
	if(regerrorsObject.email) {
		$('#error').append('<span class="error">Error:</span> Invalid email address.<br>');
		$('#regsubmit').prop('disabled', true);
	}

	// To enabled registration button.
	var check = [];
	for(var each in regerrorsObject) {
		check.push(!regerrorsObject[each]);
	}
	if(check.length > 5 && check.every(function(el) { return el })) {
		$('#regsubmit').prop('disabled', false);
	}
}

$(document).ready(function() {

	// Username length and availability validation.
	$('#username').on('focus focusout keyup', function() {
		if($(this).val().length < 3) {
			regerrors.usernamelen = true;
		} else {
			regerrors.usernamelen = false;
		}
		var posting = $.post('php/register.php', {'case': 'check', 'username': $('#username').val()});
		posting.success(function(data) {
			if(!data) {
				regerrors.username = true;
			} else {
				regerrors.username = false;
			}
		});
		posting.always(function() {
			checkErrors(regerrors);
		});
	});

	// Password length validation.
	$('#password').on('focus focusout keyup', function() {
		if($(this).val().length < 6) {
			regerrors.passlen = true;
		} else {
			regerrors.passlen = false;
		}
		checkErrors(regerrors);
	});

	// Password confirmation match validation.
	$('#passconfirm').on('focus focusout keyup', function() {
		if($(this).val() !== $('#password').val()) {
			regerrors.passconfirm = true;
		} else {
			regerrors.passconfirm = false;
		}
		checkErrors(regerrors);
	});

	// Display name length validation.
	$('#displayname').on('focus focusout keyup', function() {
		if($(this).val().length < 3) {
			regerrors.displayname = true;
		} else {
			regerrors.displayname = false;
		}
		checkErrors(regerrors);
	});

	// Email format validation.
	$('#email').on('focus focusout keyup', function() {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test($(this).val())) {
			regerrors.email = true;
		} else {
			regerrors.email = false;
		}
		checkErrors(regerrors);
	});
	

	// Submitting the form.
    $('#regsubmit').click(function() {		    	
    	console.log($('#regform').serialize()  + '&case=register')
        var posting = $.post('php/register.php', $('#regform').serialize()  + '&case=register');
        posting.always(function(data) {
			window.location.href = 'login.html';
        });
    	return false;
    });
});