import { Person } from "@shared/types/person";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const displayHobbies = person.hobbies.slice(0, 2);
  const remainingCount = person.hobbies.length - 2;

  return (
    <Card className="p-2 sm:p-3 lg:p-3 max-w-full w-80 flex-shrink-0 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500 bg-white">
      <div className="flex gap-2 sm:gap-3 lg:gap-4">
        <div className="flex-shrink-0">
          <Image
            src={person.avatar}
            alt={`${person.first_name} ${person.last_name}`}
            width={48}
            height={48}
            className="rounded-full sm:w-14 sm:h-14 lg:w-16 lg:h-16"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate mb-1">
            {person.first_name} {person.last_name}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 truncate">
            {person.nationality} • {person.age}
          </p>

          <div className="flex flex-wrap gap-1 min-h-[24px]">
            {displayHobbies.length > 0 ? (
              <>
                {displayHobbies.map((hobby, index) => (
                  <Badge
                    key={hobby}
                    variant="secondary"
                    className={`text-xs px-1.5 py-0.5 sm:px-2 ${
                      index % 3 === 0
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        : index % 3 === 1
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                  >
                    {hobby}
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 sm:px-2"
                  >
                    +{remainingCount}
                  </Badge>
                )}
              </>
            ) : (
              <div className="text-xs text-muted-foreground/50">
                No hobbies listed
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
