import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormSection } from '../FormSection';
import { FormProvider, useForm } from 'react-hook-form';
import type { FormSchemaSection } from '@/types/form';
import './setup';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormSection', () => {
  it('renders section title', () => {
    const section: FormSchemaSection = {
      type: 'object',
      properties: {
        n_fahrenheit_6c6175: {
          type: 'text',
          description: 'Temperature (°F)',
        }
      }
    };

    render(
      <TestWrapper>
        <FormSection sectionKey="VITAL_SIGNS" section={section} />
      </TestWrapper>
    );

    expect(screen.getByText('VITAL SIGNS')).toBeInTheDocument();
  });

  it('renders text field', () => {
    const section: FormSchemaSection = {
      type: 'object',
      properties: {
        n_fahrenheit_6c6175: {
          type: 'text',
          description: 'Temperature (°F)',
        }
      }
    };

    render(
      <TestWrapper>
        <FormSection sectionKey="VITAL_SIGNS" section={section} />
      </TestWrapper>
    );

    expect(screen.getByText('Temperature (°F)')).toBeInTheDocument();
  });

  it('renders multiselect field', () => {
    const section: FormSchemaSection = {
      type: 'object',
      properties: {
        m_have_67e23f: {
          type: 'multiselect',
          description: 'Select Options',
          items: ['Option 1', 'Option 2', 'Option 3']
        }
      }
    };

    render(
      <TestWrapper>
        <FormSection sectionKey="VITAL_SIGNS" section={section} />
      </TestWrapper>
    );

    expect(screen.getByText('Select Options')).toBeInTheDocument();
  });

  it('handles conditional rendering', () => {
    const section: FormSchemaSection = {
      type: 'object',
      properties: {
        r_measurement_71e031: {
          type: 'text',
          description: 'Measurement Method',
          enum: ['ORAL', 'AXILLARY'],
          hidden: true
        }
      },
      if: {
        properties: {
          r_measurement_71e031: { const: 'ORAL' }
        }
      },
      // biome-ignore lint/suspicious/noThenProperty: <explanation>
      then: {
        properties: {
          r_measurement_71e031: { hidden: true }
        }
      }
    };

    render(
      <TestWrapper>
        <FormSection sectionKey="VITAL_SIGNS" section={section} />
      </TestWrapper>
    );

    // Initially hidden
    expect(screen.queryByText('Measurement Method')).not.toBeInTheDocument();
  });
}); 