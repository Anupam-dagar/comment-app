$(document).ready(function () {
  const backendUrl = "http://localhost";
  let user;
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

  $.get(`${backendUrl}/api/comments`, (data) => {
    const comments = data.comments;
    let commentRows = "";
    comments.forEach((comment) => {
      commentRows += `
      <div class="d-flex flex-row align-items-start mt-5" id="${comment.id}">
        <div>
          <img
            class="rounded-circle"
            style="width: 41px"
            src="${comment.user.photoUrl}"
          />
        </div>
        <div class="flex-fill">
          <div class="d-flex flex-row align-items-start px-2">
            <div class="px-2">
              <h6 class="c-text-primary">
                ${comment.user.name}
                <span style="font-size: 0.89em" class="c-text-secondary"
                  >・ ${moment(comment.createdAt).fromNow()}</span
                >
              </h6>
            </div>
          </div>
          <div class="d-flex flex-row align-items-start px-2">
            <div class="px-2">
              <p>
                ${comment.comment}
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
    });
    $("#comments").append(commentRows);
  }).fail(function (error) {
    console.log(`error fetching comments. ${error}`);
  });

  $("#comment").on("input", () => {
    const input = $("#comment").val();
    if (input.length == 0) {
      $("#create-comment-button").attr("disabled", true);
    } else {
      $("#create-comment-button").attr("disabled", false);
    }
  });

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
        const commentRow = `
      <div class="d-flex flex-row align-items-start mt-5" id="${data.id}">
        <div>
          <img
            class="rounded-circle"
            style="width: 41px"
            src="${user.photoUrl}"
          />
        </div>
        <div class="flex-fill">
          <div class="d-flex flex-row align-items-start px-2">
            <div class="px-2">
              <h6 class="c-text-primary">
                ${user.name}
                <span style="font-size: 0.89em" class="c-text-secondary"
                  >・ ${moment(data.createdAt).fromNow()}</span
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
        $("#comments").append(commentRow);
      },
      error: (error) => {
        console.log(`error creating comment. ${error}`);
        alert("Error making comment. Please try again in a while.");
      },
    });
  });
});
