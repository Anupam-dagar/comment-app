const backendUrl = "http://localhost";
let user;

$(document).ready(async function () {
  addCommentInputListener();
  createComment();
  try {
    await getUser();
    await getComments();
  } catch (error) {
    console.log(`Error fetching data: ${JSON.stringify(error)}`);
  }
  handleUpvote();
});

const getUser = async () => {
  return $.get(`${backendUrl}/api/users/login`, (data) => {
    $("#current-user").attr("src", data.photoUrl);
    user = {
      id: data.id,
      name: data.name,
      photoUrl: data.photoUrl,
    };
  });
};

const getComments = async () => {
  return $.ajax({
    type: "GET",
    url: `${backendUrl}/api/comments`,
    headers: {
      user: user.id,
    },
    dataType: "json",
    success: (data) => {
      const comments = data.comments;
      let commentRows = "";
      comments.forEach((comment) => {
        commentRows += getCommentRow(
          comment.id,
          comment.user.photoUrl,
          comment.user.name,
          comment.createdAt,
          comment.comment,
          comment.totalUpvotes,
          comment.hasUpvoted
        );
      });
      $("#comments").append(commentRows);
    },
  });
};

const createComment = async () => {
  $("#create-comment").submit((event) => {
    event.preventDefault();
    const comment = $("#comment").val();
    $.ajax({
      type: "POST",
      url: `${backendUrl}/api/comments`,
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

const getCommentRow = (
  commentId,
  userPhotoUrl,
  userName,
  commentCreatedAt,
  comment,
  totalUpvotes,
  hasUpvoted
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
              <li class="nav-item btn-upvote" data-upvoted=${hasUpvoted} data-commentId="${commentId}">
                <a class="nav-link nav-link-focus nav-link-btn c-text-secondary"
                  ><i class="bi bi-caret-up-fill"></i> <span class="totalUpvotes">${totalUpvotes}</span> <span class="upvoteText">${
    hasUpvoted ? "Remove Upvote" : "Upvote"
  }</span> </a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link nav-link-focus nav-link-btn c-text-secondary">Reply</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `;
};

const handleUpvote = () => {
  $(`#comments`).on("click", ".btn-upvote", function (event) {
    const commentId = $(this).attr("data-commentId");
    const hasUpvoted = $(this).attr("data-upvoted");
    const upvoteNode = $(this).find(".totalUpvotes");
    const upvotes = Number(upvoteNode.text());
    $.ajax({
      type: "POST",
      url: `${backendUrl}/api/comments/upvote/${commentId}`,
      headers: {
        user: user.id,
      },
      dataType: "json",
      success: () => {
        const text = hasUpvoted === "true" ? "Upvote" : "Remove Upvote";
        const newUpvotes = hasUpvoted === "true" ? upvotes - 1 : upvotes + 1;
        $(this).find(".upvoteText").text(text);
        $(this).attr("data-upvoted", `${hasUpvoted === "true" ? false : true}`);
        upvoteNode.text(newUpvotes);
      },
      error: function () {
        alert(
          "There was an error upvoting the comment. Please try again in a while."
        );
      },
    });
  });
};
