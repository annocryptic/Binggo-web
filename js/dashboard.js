window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
};
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("userAvatar").src =
      user.photoURL || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png";

    document.getElementById("userName").innerText =
      user.displayName || "Profile";
  }
});