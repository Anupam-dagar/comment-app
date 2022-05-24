const CommentActions = ({ hasUpvoted, totalUpvotes }) => {
  return (
    <div className="d-flex flex-row align-items-start">
      <ul className="nav">
        <li className="nav-item btn-upvote">
          <a className="nav-link nav-link-focus nav-link-btn c-text-secondary">
            <i className="bi bi-caret-up-fill"></i>
            <span className="totalUpvotes">{totalUpvotes}</span>
            <span className="upvoteText">
              {hasUpvoted ? "Remove Upvote" : "Upvote"}
            </span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-link-focus nav-link-btn c-text-secondary">
            Reply
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CommentActions;
