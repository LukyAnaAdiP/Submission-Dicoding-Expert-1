import { Link } from 'react-router-dom';

import formatDate from '../../utils/formatDate';

function ThreadItem({ thread, owner }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          #{thread.category}
        </span>

        <time
          dateTime={thread.createdAt}
          className="text-xs text-slate-400"
        >
          {formatDate(thread.createdAt)}
        </time>
      </div>

      <Link to={`/threads/${thread.id}`}>
        <h2 className="text-xl font-bold text-slate-900 transition hover:text-blue-600">
          {thread.title}
        </h2>
      </Link>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
        {thread.body}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          {owner?.avatar ? (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              {owner?.name?.charAt(0) ?? '?'}
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-slate-800">
              {owner?.name ?? 'Unknown User'}
            </p>

            <p className="text-xs text-slate-400">
              Pembuat thread
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          {thread.totalComments} komentar
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;