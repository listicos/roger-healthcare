import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TextField } from "@/components/form/TextField";
import { TypeAhead } from "@/components/form/TypeAhead";
import { MultiSelect } from "@/components/form/MultiSelect";
import type { FormSchemaProperty } from '@/types/form';

interface FormSectionProps {
  sectionKey: string;
  section: {
    type: string;
    properties: Record<string, FormSchemaProperty>;
    if?: {
      properties: Record<string, { const: string }>;
    };
    then?: {
      properties: Record<string, { hidden: boolean }>;
    };
  };
}

export const FormSection = memo(({ sectionKey, section }: FormSectionProps) => {
  const { control } = useFormContext();
  
  const watchPath = section.if ? `${sectionKey}.${Object.keys(section.if.properties)[0]}` : '';
  const conditionalValue = useWatch({
    control,
    name: watchPath,
  });

  const renderField = (fieldName: string, fieldConfig: FormSchemaProperty) => {
    const fullFieldName = `${sectionKey}.${fieldName}`;

    // Handle conditional rendering
    if (fieldConfig.hidden && section.if && section.then) {
      if (!conditionalValue) return null;
      const shouldShow = conditionalValue.includes(section.if.properties[Object.keys(section.if.properties)[0]].const);
      if (!shouldShow) return null;
    }
    
    switch (fieldConfig.type) {
      case 'text':
        return (
          <TextField
            key={fullFieldName}
            name={fullFieldName}
            label={fieldConfig.description}
          />
        );
      case 'typeahead':
        return (
          <TypeAhead
            key={fullFieldName}
            name={fullFieldName}
            label={fieldConfig.description}
            options={fieldConfig.enum || []}
          />
        );
      case 'multiselect':
        return (
          <MultiSelect
            key={fullFieldName}
            name={fullFieldName}
            label={fieldConfig.description}
            options={fieldConfig.items || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {sectionKey.replace(/_/g, ' ')}
      </h2>
      <div className="space-y-4">
        {Object.entries(section.properties).map(([fieldName, fieldConfig]) =>
          renderField(fieldName, fieldConfig)
        )}
      </div>
    </div>
  );
});

FormSection.displayName = 'FormSection';