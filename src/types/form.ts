export interface VitalSignsForm {
  VITAL_SIGNS: {
    n_fahrenheit_6c6175: string;
    r_measurement_71e031: 'ORAL' | 'AXILLARY' | 'OTIC' | 'TEMPORAL';
    m_have_67e23f: string[];
    n_pulse_rate_34e2f1?: string;
  }
}

export interface FormSchemaProperty {
  type: string;
  description: string;
  enum?: string[];
  items?: string[];
  hidden?: boolean;
}

export interface FormSchemaSection {
  type: string;
  properties: Record<string, FormSchemaProperty>;
  if?: {
    properties: Record<string, { const: string }>;
  };
  then?: {
    properties: Record<string, { hidden: boolean }>;
  };
}

export interface FormSchema {
  [key: string]: FormSchemaSection;
}

export interface FormData {
  [key: string]: string | string[];
} 