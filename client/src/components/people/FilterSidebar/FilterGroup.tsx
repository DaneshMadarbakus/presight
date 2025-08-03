import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface FilterGroupProps {
  title: string;
  type: "hobbies" | "nationality";
  options: { name: string; count: number }[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}

export function FilterGroup({
  title,
  type,
  options,
  selectedValues,
  onChange,
}: FilterGroupProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base text-foreground">{title}</h3>
        {selectedValues.length > 0 && (
          <Badge
            variant="default"
            className="text-xs bg-accent hover:bg-accent/80"
          >
            {selectedValues.length} selected
          </Badge>
        )}
      </div>

      <div className="space-y-4 max-h-72 overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
        {options.map(({ name, count }) => (
          <div
            key={name}
            className="flex items-center justify-between group py-1"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Checkbox
                id={`${type}-${name}`}
                checked={selectedValues.includes(name)}
                onCheckedChange={(checked) =>
                  onChange(name, checked as boolean)
                }
                className="cursor-pointer"
              />
              <label
                htmlFor={`${type}-${name}`}
                className="text-sm font-medium leading-5 group-hover:text-primary cursor-pointer truncate"
              >
                {name}
              </label>
            </div>
            <Badge variant="secondary" className="text-xs ml-3 flex-shrink-0">
              {count}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
