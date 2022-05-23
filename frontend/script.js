const backendUrl = "http://localhost";
let user;

$(document).ready(function () {
  addCommentInputListener();
  getUser();
  getComments();
  createComment();
});

const getUser = () => {
  $.get(`${backendUrl}/api/users/login`, (data) => {
    $("#current-user").attr("src", data.photoUrl);
    user = {
      id: data.id,
      name: data.name,
      photoUrl: data.photoUrl,
    };
  }).fail((error) => {
    console.log(`error getting user. ${error}`);
  });
};

const getComments = () => {
  $.get(`${backendUrl}/api/comments`, (data) => {
    const comments = data.comments;
    let commentRows = "";
    comments.forEach((comment) => {
      commentRows += getCommentRow(
        comment.id,
        comment.user.photoUrl,
        comment.user.name,
        comment.createdAt,
        comment.comment
      );
    });
    $("#comments").append(commentRows);
  }).fail(function (error) {
    console.log(`error fetching comments. ${error}`);
  });
};

const createComment = () => {
  $("#create-comment").submit((event) => {
    event.preventDefault();
    const comment = $("#comment").val();
    $.ajax({
      type: "POST",
      url: `${backendUrl}/api/comments`,
      data: { comment },
      headers: {
        createdby: user.id,
      },
      dataType: "json",
      success: (data) => {
        const commentRow = getCommentRow(
          data.id,
          user.photoUrl,
          user.name,
          data.createdAt,
          comment
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

const getCommentRow = (
  commentId,
  userPhotoUrl,
  userName,
  commentCreatedAt,
  comment
) => {
  return `
      <div class="d-flex flex-row align-items-start mt-5" id="${commentId}">
        <div>
          <img
            class="rounded-circle"
            style="width: 41px"
            src="${userPhotoUrl}"
          />
        </div>
        <div class="flex-fill">
          <div class="d-flex flex-row align-items-start px-2">
            <div class="px-2">
              <h6 class="c-text-primary">
                ${userName}
                <span style="font-size: 0.89em" class="c-text-secondary"
                  >・ ${moment(commentCreatedAt).fromNow()}</span
                >
              </h6>
            </div>
          </div>
          <div class="d-flex flex-row align-items-start px-2">
            <div class="px-2">
              <p>
                ${comment}
              </p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-start">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link c-text-secondary" href="#"
                  ><i class="bi bi-caret-up-fill"></i> Upvote</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link c-text-secondary" href="#">Reply</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `;
};
