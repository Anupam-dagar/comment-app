import config from "./constants/config";

$(document).ready(async function () {
  addCommentInputListener();
  createComment();
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

const createComment = async () => {
  const user = {
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    photoUrl: localStorage.getItem("photoUrl"),
  };

  $("#create-comment").submit((event) => {
    event.preventDefault();
    const comment = $("#comment").val();
    $.ajax({
      type: "POST",
      url: `${config.backendUrl}/api/comments`,
      data: { comment },
      headers: {
        user: user.id,
      },
      dataType: "json",
      success: (data) => {
        const commentRow = getCommentRow(
          data.id,
          user.photoUrl,
          user.name,
          data.createdAt,
          comment,
          0,
          false
        );
        $("#comments").append(commentRow);
        $("#comment").val("");
        $("#create-comment-button").attr("disabled", true);
      },
      error: (error) => {
        console.log(`error creating comment. ${error}`);
        alert("Error making comment. Please try again in a while.");
      },
    });
  });
};

const addCommentInputListener = () => {
  $("#comment").on("input", () => {
    const input = $("#comment").val();
    if (input.length == 0) {
      $("#create-comment-button").attr("disabled", true);
    } else {
      $("#create-comment-button").attr("disabled", false);
    }
  });
};
