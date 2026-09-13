import formatDate from '../../utils/formatDate';

function CommentItem({ comment }) {
  return (
    <article className="border-b border-slate-100 py-5 last:border-b-0">
      <div className="flex gap-3">
        {comment.owner?.avatar ? (
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600">
            {comment.owner?.name?.charAt(0) ?? '?'}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-slate-800">
              {comment.owner?.name ?? 'Unknown User'}
            </p>

            <span className="text-xs text-slate-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="mt-2 leading-6 text-slate-600">
            {comment.content}
          </p>
        </div>
      </div>
    </article>
  );
}

export default CommentItem;