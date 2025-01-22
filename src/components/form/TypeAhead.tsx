import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, Controller } from "react-hook-form";
import { FieldWrapper } from "./FieldWapper";

interface TypeAheadProps {
    name: string;
    label: string;
    options: string[];
}

export const TypeAhead = ({ name, label, options }: TypeAheadProps) => {
    const [open, setOpen] = useState(false);
    const {
      control,
      formState: { errors },
    } = useFormContext();
  
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldWrapper label={label} error={errors[name]?.message as string}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  aria-label={label}
                  aria-expanded={open}
                  aria-controls="options"
                  className={`w-full justify-between ${
                    errors[name] ? "border-red-500" : ""
                  }`}
                >
                  {value || "Select option..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command id="options">
                  <CommandInput placeholder="Search options..." />
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          onSelect={() => {
                            onChange(option);
                            setOpen(false);
                          }}
                        >
                          {option}
                          {value === option && (
                            <Check className="ml-auto h-4 w-4" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FieldWrapper>
        )}
      />
    );
  };
  
TypeAhead.displayName = "TypeAhead";