$(document).ready(function () {
  const backendUrl = "http://localhost";
  let user;
  $.get(`${backendUrl}/api/users/login`, function (data) {
    $("#current-user").attr("src", data.photoUrl);
    user = {
      id: data.id,
      name: data.name,
    };
  }).fail(function (error) {
    console.log(`error getting user.`);
  });
});
