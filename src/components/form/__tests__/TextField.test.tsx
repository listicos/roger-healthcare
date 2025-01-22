import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextField } from '../TextField';
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

describe('TextField', () => {
  it('renders with label', () => {
    render(
      <TestWrapper>
        <TextField name="test_field" label="Test Label" />
      </TestWrapper>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(
      <TestWrapper>
        <TextField name="test_field" label="Test Label" />
      </TestWrapper>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(input).toHaveValue('test value');
  });
}); 