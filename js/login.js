$(document).ready(function() {

	// When login button is clicked.
    $('#login').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        if ($.trim(username).length > 0 && $.trim(password).length > 0) {
        	$.ajaxSetup({cache: false});
            var posting = $.post('php/login.php', {'username': username, 'password': password});
            posting.success(function(data) {
                window.location.href = 'index.html';
            });
            posting.fail(function(data) {
                $('#error').html('<span class="error">Error:</span> Invalid username or password.');
            });

        } else {
            $('#error').html('<span class="error">Error:</span> Please enter a username or password.');
        }
        return false;
    });
});