import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { FieldWrapper } from "./FieldWapper";
import { Controller } from "react-hook-form";

interface MultiSelectProps {
    name: string;
    label: string;
    options: string[];
  }
  
  export const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
  
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FieldWrapper label={label} error={errors[name]?.message as string}>
            <div className="space-y-2 border rounded-md p-4">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${name}-${option}`}
                    checked={(field.value || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      const newValue = checked
                        ? [...currentValue, option]
                        : currentValue.filter((value: string) => value !== option);
                      field.onChange(newValue);
                    }}
                  />
                  <Label
                    htmlFor={`${name}-${option}`}
                    className="text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </FieldWrapper>
        )}
      />
    );
  }; 