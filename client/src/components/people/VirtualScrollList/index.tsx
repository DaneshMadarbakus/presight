"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";
import { Person } from "@shared/types/person";
import { VirtualScrollItem } from "./VirtualScrollItem";

interface VirtualScrollListProps {
  people: Person[];
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export function VirtualScrollList({
  people,
  isLoading,
  hasNextPage,
  onLoadMore,
}: VirtualScrollListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const itemCount = people.length + (hasNextPage ? 1 : 0);

  const virtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
    measureElement: (element) => element?.getBoundingClientRect().height ?? 200,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const last = items.at(-1);

    const isAtEnd = last && last?.index >= people.length - 1;
    const shouldLoad = isAtEnd && hasNextPage && !isLoading;

    if (shouldLoad) {
      onLoadMore();
    }
  }, [items, people.length, hasNextPage, isLoading, onLoadMore]);

  return (
    <div
      ref={parentRef}
      className="w-full overflow-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none"
      style={{ height: "calc(100vh - 240px)" }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {items.map((virtualItem) => {
          const isLoadingRow = virtualItem.index >= people.length;
          const person = people[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={(node) => virtualizer.measureElement(node)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <VirtualScrollItem
                person={person}
                isLoadingRow={isLoadingRow}
                isLoading={isLoading}
                onLoadMore={onLoadMore}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
