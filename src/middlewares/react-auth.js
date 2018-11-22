
var Auth = {
    isAuthenticated: false,
    user: {},
    authenticate(email, password, cb) {
      fetch('/login', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(response => {
        if(response.status === 200) {
          this.isAuthenticated = true;
          return response.json();
        }
      }).then(body => {
          this.user = body;
        cb(body);
      });
    },
  }

  module.exports = Auth;