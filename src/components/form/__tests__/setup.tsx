import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: (data: Record<string, unknown>) => void) => fn,
    register: () => ({}),
    formState: { errors: {} },
    watch: (name?: string) => name ? [] : {},
    setValue: () => {},
    getValues: () => ({}),
  }),
  Controller: ({ render, name, ...props }: { render: (props: { field: { value: string | string[]; onChange: (value: string | string[]) => void; onBlur: () => void; name: string } }) => React.ReactElement; name: string } & Record<string, unknown>) => {
    const field = { 
      value: Array.isArray(props.defaultValue) ? props.defaultValue : '', 
      onChange: (value: string | string[]) => {
        if (props.onChange) {
          (props.onChange as (value: string | string[]) => void)(value);
        }
      }, 
      onBlur: () => {}, 
      name 
    };
    return React.createElement('div', { className: 'form-field' }, render({ field }));
  },
  FormProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  useFormContext: () => ({
    control: {},
    handleSubmit: (fn: (data: Record<string, unknown>) => void) => fn,
    register: () => ({}),
    formState: { errors: {} },
    watch: () => ({}),
    setValue: () => {},
    getValues: () => ({}),
  }),
  useWatch: () => [],
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: React.ComponentProps<'button'>) => (
    React.createElement('button', { type: 'button', ...props }, children)
  ),
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: React.ComponentProps<'input'>) => (
    React.createElement('input', props)
  ),
}));

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: React.ComponentProps<'label'>) => (
    React.createElement('label', props, children)
  ),
}));

vi.mock('@/components/ui/command', () => ({
  Command: {
    Input: (props: React.ComponentProps<'input'>) => (
      React.createElement('input', props)
    ),
    List: ({ children }: { children: React.ReactNode }) => (
      React.createElement('select', { multiple: true }, children)
    ),
    Empty: ({ children }: { children: React.ReactNode }) => (
      React.createElement('div', null, children)
    ),
    Group: ({ children }: { children: React.ReactNode }) => (
      React.createElement('fieldset', null, children)
    ),
    Item: ({ children, onSelect, ...props }: React.ComponentProps<'option'> & { onSelect?: () => void }) => {
      const isSelected = props['aria-selected'] === true;
      return React.createElement('option', {
        ...props,
        onClick: () => {
          onSelect?.();
          if (props.onClick) {
            props.onClick({} as React.MouseEvent<HTMLOptionElement>);
          }
        },
        'aria-checked': isSelected,
      }, children);
    },
  },
  CommandInput: (props: React.ComponentProps<'input'>) => (
    React.createElement('input', props)
  ),
  CommandList: ({ children }: { children: React.ReactNode }) => (
    React.createElement('select', { multiple: true }, children)
  ),
  CommandEmpty: ({ children }: { children: React.ReactNode }) => (
    React.createElement('div', null, children)
  ),
  CommandGroup: ({ children }: { children: React.ReactNode }) => (
    React.createElement('fieldset', null, children)
  ),
  CommandItem: ({ children, onSelect, ...props }: React.ComponentProps<'option'> & { onSelect?: () => void }) => {
    const isSelected = props['aria-selected'] === true;
    return React.createElement('option', {
      ...props,
      onClick: () => {
        onSelect?.();
        if (props.onClick) {
          props.onClick({} as React.MouseEvent<HTMLOptionElement>);
        }
      },
      'aria-checked': isSelected,
    }, children);
  },
}));

vi.mock('@/components/ui/popover', () => ({
  Popover: {
    Root: ({ children }: { children: React.ReactNode }) => (
      React.createElement('div', null, children)
    ),
    Trigger: ({ children }: { children: React.ReactNode }) => (
      React.createElement('div', null, children)
    ),
    Content: ({ children }: { children: React.ReactNode }) => (
      React.createElement('div', null, children)
    ),
  },
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    React.createElement('div', null, children)
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    React.createElement('div', null, children)
  ),
}));

vi.mock('sonner', () => ({
  Toaster: () => null,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

expect.extend(matchers); 