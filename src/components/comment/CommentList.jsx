import CommentItem from './CommentItem'

function CommentList ({ comments }) {
  if (comments.length === 0) {
    return (
      <div className='py-8 text-center'>
        <p className='text-slate-500'>
          Belum ada komentar.
        </p>
      </div>
    )
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  )
}

export default CommentList
