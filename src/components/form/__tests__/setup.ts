import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Mock UI components
vi.mock('@/components/ui/button', () => {
  return {
    Button: vi.fn(({ children, type = 'button', ...props }) => ({
      type: 'button',
      props: { type: type as 'button' | 'submit' | 'reset', ...props },
      children,
    })),
  };
});

vi.mock('@/components/ui/input', () => {
  return {
    Input: vi.fn((props) => ({
      type: 'input',
      props,
    })),
  };
});

vi.mock('@/components/ui/label', () => {
  return {
    Label: vi.fn(({ children, htmlFor, ...props }) => ({
      type: 'label',
      props: { htmlFor, ...props },
      children,
    })),
  };
});

vi.mock('@/components/ui/command', () => {
  return {
    Command: {
      Input: vi.fn((props) => ({
        type: 'input',
        props,
      })),
      List: vi.fn(({ children }) => ({
        type: 'select',
        props: { multiple: true },
        children,
      })),
      Empty: vi.fn(({ children }) => ({
        type: 'div',
        props: {},
        children,
      })),
      Group: vi.fn(({ children }) => ({
        type: 'fieldset',
        props: {},
        children,
      })),
      Item: vi.fn(({ children, ...props }) => ({
        type: 'option',
        props,
        children,
      })),
    },
  };
});

vi.mock('@/components/ui/popover', () => {
  const Popover = {
    Root: vi.fn(({ children }) => ({
      type: 'div',
      props: {},
      children,
    })),
    Trigger: vi.fn(({ children }) => ({
      type: 'div',
      props: {},
      children,
    })),
    Content: vi.fn(({ children }) => ({
      type: 'div',
      props: { role: 'listbox' },
      children,
    })),
  };

  return {
    Popover,
    PopoverTrigger: Popover.Trigger,
    PopoverContent: Popover.Content,
  };
});

vi.mock('sonner', () => {
  return {
    Toaster: vi.fn(() => null),
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

expect.extend(matchers); 