function validateEquals(original, target, message)
{
	original.keyup(function() {
		if ( target.val() != '' && original.val() != '' ) {
			if ( target.val() != original.val() ) {
				if ( !target.hasClass('error') ) target.addClass('error');
			} else {
				target.removeClass('error');
			}
		}
	});
	target.keyup(function() {
		if ( target.val() != '' && original.val() != '' ) {
			if ( target.val() != original.val() ) {
				if ( !target.hasClass('error') ) target.addClass('error');
			} else {
				target.removeClass('error');
			}
		}
	});
}

function validateEmail(target) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    target.keyup(function() {
	if ( target.hasClass('error') && re.test(target.val()) ) {
		target.removeClass('error');
	}
    });

    target.blur(function() {
	if ( !re.test(target.val()) ) {
		if ( !target.hasClass('error') ) target.addClass('error');
	} else {
		target.removeClass('error');
	}
    });
}

function signupValidation()
{
	var email = $('input[name=email]');
	var emailc = $('input[name=emailc]');
	var password = $('input[name=password]');
	var passwordc = $('input[name=passwordc]');

	validateEquals(password, passwordc);
	validateEquals(email, emailc);
	validateEmail(email);
	validateEmail(emailc);
}
