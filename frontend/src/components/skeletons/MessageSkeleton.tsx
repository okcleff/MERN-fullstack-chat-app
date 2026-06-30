const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-line animate-pulse shrink-0" />
        <div className="h-9 w-44 rounded-2xl bg-line animate-pulse" />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <div className="h-9 w-32 rounded-2xl bg-line animate-pulse" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
