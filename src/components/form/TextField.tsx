import { Input } from "@/components/ui/input";
import { FieldWrapper } from "./FieldWapper";
import { useFormContext } from "react-hook-form";

interface TextFieldProps {
    name: string;
    label: string;
  }
  
  export const TextField = ({ name, label }: TextFieldProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
  
    return (
      <FieldWrapper label={label} error={errors[name]?.message as string}>
        <Input {...register(name)} className={errors[name] ? "border-red-500" : ""} />
      </FieldWrapper>
    );
  };
  

TextField.displayName = "TextField";