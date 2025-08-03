import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder = "Search by name..." }: SearchBoxProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}