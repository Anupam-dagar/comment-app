import config from "./constants/config";

$(document).ready(async function () {
  try {
    await getUser();
  } catch (error) {
    console.log(`Error fetching data: ${JSON.stringify(error)}`);
    alert("Error communicating with server. Please refresh to try again.");
  }
});

const getUser = async () => {
  return $.get(`${config.backendUrl}/api/users/login`, (data) => {
    $("#current-user").attr("src", data.photoUrl);
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("photoUrl", data.photoUrl);
  });
};
