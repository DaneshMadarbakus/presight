import { Person } from "@shared/types/person";

interface BackgroundElementsProps {
  person?: Person;
  isLoadingRow?: boolean;
}

export function BackgroundElements({ person, isLoadingRow }: BackgroundElementsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {person && (
        <>
          {/* Hobby-based shapes */}
          {person.hobbies.slice(0, 3).map((hobby, idx) => (
            <div
              key={hobby}
              className={`absolute w-12 h-12 rounded-full opacity-20 animate-pulse ${
                idx % 3 === 0
                  ? "bg-purple-300"
                  : idx % 3 === 1
                  ? "bg-green-300"
                  : "bg-orange-300"
              }`}
              style={{
                top: `${15 + idx * 20}%`,
                left: `${5 + (hobby.length % 4) * 25}%`,
                transform: `rotate(${hobby.length * 12}deg)`,
                animationDelay: `${idx * 0.5}s`,
              }}
            />
          ))}

          {/* Age-based decorative elements */}
          <div
            className="absolute w-16 h-16 border-2 border-blue-300/40 rounded-full animate-spin"
            style={{
              top: `${(person.age % 30) + 10}%`,
              right: `${(person.age % 25) + 5}%`,
              animationDuration: "20s",
            }}
          />

          {/* Nationality-based pattern */}
          <div
            className="absolute w-10 h-10 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-lg transform rotate-45 shadow-sm"
            style={{
              bottom: `${(person.nationality.length % 25) + 15}%`,
              left: `${(person.nationality.length % 30) + 5}%`,
            }}
          />

          {/* Additional floating elements */}
          <div
            className="absolute w-6 h-6 bg-pink-200/25 rounded-full blur-sm"
            style={{
              top: `${(person.first_name.length % 20) + 40}%`,
              right: `${(person.last_name.length % 15) + 40}%`,
            }}
          />
        </>
      )}

      {/* Generic floating dots for loading state */}
      {isLoadingRow && (
        <>
          <div
            className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-200/30 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-10 h-10 bg-purple-200/25 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-6 h-6 bg-green-200/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}
    </div>
  );
}