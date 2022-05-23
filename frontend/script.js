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

  $.get(`${backendUrl}/api/comments`, function (data) {
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
              <h6>
                ${comment.user.name}
                <span style="color: gray; font-size: 0.89em"
                  >・ ${comment.createdAt}</span
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
                <a class="nav-link" href="#"
                  ><i class="bi bi-caret-up-fill"></i> Upvote ${comment.upvotes}</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Reply</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `;
    });
    $("#comments").append(commentRows);
  }).fail(function (error) {
    console.log(`error getting comments.`);
  });
});
