window.loginTwitter = function () {
  console.log("Login button clicked");

  const provider = new firebase.auth.TwitterAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Login success");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};