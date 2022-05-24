const CommentHeader = ({ commentCreatedAt, comment }) => {
  return (
    <>
      <div className="d-flex flex-row align-items-start px-2">
        <div className="px-2">
          <h6 className="c-text-primary">
            {userName}
            <span style="font-size: 0.89em" className="c-text-secondary">
              ・ {moment(commentCreatedAt).fromNow()}
            </span>
          </h6>
        </div>
      </div>
      <div className="d-flex flex-row align-items-start px-2">
        <div className="px-2">
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
};

export default CommentHeader;
