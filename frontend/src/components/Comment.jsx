import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";

const Comment = () => {
  return (
    <div className="flex-fill">
      <CommentHeader commentCreatedAt={new Date()} comment="lorem ipsum" />
      <CommentActions hasUpvoted="true" totalUpvotes="2" />
    </div>
  );
};

export default Comment;
