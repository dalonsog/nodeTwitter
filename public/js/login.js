(function () {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200)
      console.log(JSON.parse(xhttp.response).token);
  };

  if (document.getElementById('login-button'))
    document.getElementById('login-button')
            .addEventListener('click', login);
  
  if (document.getElementById('register-button'))
    document.getElementById('register-button')
            .addEventListener('click', register);

  function login() {
    var userData = {
      email: document.getElementById('email-input').value,
      password: document.getElementById('password-input').value
    };

    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(userData));
  }

  function register() {
    var userData = {
      name: document.getElementById('name-input').value,
      email: document.getElementById('email-input').value,
      password: document.getElementById('password-input').value
    };

    xhttp.open("POST", "/register", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(userData));
  }

})();