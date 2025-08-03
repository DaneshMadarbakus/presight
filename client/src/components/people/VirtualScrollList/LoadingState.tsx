interface LoadingStateProps {
  isLoading: boolean;
  onLoadMore: () => void;
}

export function LoadingState({ isLoading, onLoadMore }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center h-20 text-muted-foreground w-full">
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Loading more...
        </div>
      ) : (
        <button
          onClick={onLoadMore}
          className="text-primary hover:underline"
        >
          Load more
        </button>
      )}
    </div>
  );
}