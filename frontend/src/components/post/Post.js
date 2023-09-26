import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';
import LikeButton from '../likes/Likes';

const Post = ({post, token}) => {

  const postedAt = new Date(post.createdAt)
  const postedAtFormatted = postedAt.toLocaleString([], {day:'2-digit', month:'short', year: '2-digit' ,hour: '2-digit',minute:'2-digit'});

  return(
    <>
      <article data-cy="post" key={ post._id }>{ post.message }</article> 
      <div>
        <p className="datetime">{postedAtFormatted}</p>
      </div>
      <LikeButton />
      <CommentForm token ={ token } post={ post }/>
      <div>
        {post.comments.map(
            (comment) => ( <Comment comment={ comment } key={ comment._id } /> )
        )}
      </div>
      <div>
      </div>
    </>
  )
}
export default Post;