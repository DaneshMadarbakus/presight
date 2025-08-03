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
    <div className="relative w-full h-[calc(100vh-15rem)]">
      {/* Background pattern that stays fixed behind the scroll container */}
      <div className="absolute inset-0 pointer-events-none opacity-70 z-0">
        <div className="absolute top-[10%] left-[8%] w-20 h-20 bg-purple-300/40 rounded-full" />
        <div className="absolute top-[25%] right-[12%] w-16 h-16 bg-green-300/35 rounded-lg rotate-45" />
        <div className="absolute top-[45%] left-[15%] w-24 h-24 border-2 border-blue-300/50 rounded-full" />
        <div className="absolute top-[65%] right-[8%] w-18 h-18 bg-orange-300/40 rounded-full" />
        <div className="absolute top-[80%] left-[10%] w-14 h-14 bg-pink-300/35 rounded-full blur-sm" />
        <div className="absolute top-[35%] right-[25%] w-12 h-12 bg-indigo-300/30 rounded-full" />
        <div className="absolute top-[55%] left-[5%] w-10 h-10 bg-cyan-300/40 rounded-full" />
        <div className="absolute top-[15%] left-[40%] w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-lg rotate-12" />
      </div>
      
      <div
        ref={parentRef}
        className="w-full h-full overflow-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none relative z-10"
      >
        <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {items.map((virtualItem) => {
          const isLoadingRow = virtualItem.index >= people.length;
          const person = people[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={(node) => virtualizer.measureElement(node)}
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${virtualItem.start}px)` }}
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
    </div>
  );
}
