import { Label } from "@radix-ui/react-label";

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
