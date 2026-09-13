import ThreadItem from './ThreadItem';

function ThreadList({ threads, users }) {
  if (threads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p className="text-slate-500">
          Belum ada thread.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => {
        const owner = users.find(
          (user) => user.id === thread.ownerId,
        );

        return (
          <ThreadItem
            key={thread.id}
            thread={thread}
            owner={owner}
          />
        );
      })}
    </div>
  );
}

export default ThreadList;