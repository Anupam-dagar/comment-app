import Comment from "./Comment";

const CommentRow = ({ userPhotoUrl }) => {
  return (
    <>
      <div>
        <img
          className="rounded-circle"
          style={{ width: "41px" }}
          src={userPhotoUrl}
        />
      </div>
      <Comment />
    </>
  );
};

export default CommentRow;
