import { motion } from "framer-motion";
import { MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";

import formatDate from "../../utils/formatDate";

function ThreadItem({ thread, owner }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          #{thread.category}
        </span>

        <time dateTime={thread.createdAt} className="text-xs text-slate-400">
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
              {owner?.name?.charAt(0) ?? "?"}
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-slate-800">
              {owner?.name ?? "Unknown User"}
            </p>

            <p className="text-xs text-slate-400">Pembuat thread</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MessageSquareMore className="h-4 w-4" />
          <span>{thread.totalComments} komentar</span>
        </div>
      </div>
    </motion.article>
  );
}

export default ThreadItem;
