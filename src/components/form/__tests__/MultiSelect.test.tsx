import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MultiSelect } from '../MultiSelect';
import { FormProvider, useForm } from 'react-hook-form';
import './setup';

const TestWrapper = ({ children, defaultValues = {}, errors = {} }: { 
  children: React.ReactNode;
  defaultValues?: Record<string, string | string[]>;
  errors?: Record<string, { type: string; message: string; }>;
}) => {
  const methods = useForm({ defaultValues });
  if (Object.keys(errors).length > 0) {
    for (const [field, error] of Object.entries(errors)) {
      methods.setError(field, error);
    }
  }
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('MultiSelect', () => {
  it('renders with label', () => {
    render(
      <TestWrapper>
        <MultiSelect name="test_field" label="Test Label" options={mockOptions} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays options', () => {
    render(
      <TestWrapper>
        <MultiSelect name="test_field" label="Test Label" options={mockOptions} />
      </TestWrapper>
    );

    for (const option of mockOptions) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });
}); 