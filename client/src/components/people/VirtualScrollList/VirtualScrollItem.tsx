import { Person } from "@shared/types/person";
import { PersonCard } from "../PersonCard";
import { BackgroundElements } from "./BackgroundElements";
import { LoadingState } from "./LoadingState";

interface VirtualScrollItemProps {
  person?: Person;
  isLoadingRow: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function VirtualScrollItem({
  person,
  isLoadingRow,
  isLoading,
  onLoadMore,
}: VirtualScrollItemProps) {
  return (
    <div className="px-4 py-2 relative overflow-hidden">
      <BackgroundElements person={person} isLoadingRow={isLoadingRow} />
      
      <div className="relative z-10 flex justify-center">
        {isLoadingRow ? (
          <LoadingState isLoading={isLoading} onLoadMore={onLoadMore} />
        ) : person ? (
          <PersonCard person={person} />
        ) : null}
      </div>
    </div>
  );
}