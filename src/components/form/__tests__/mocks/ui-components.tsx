import type React from "react";
import { vi } from 'vitest';

// Mock UI components
export const Button = ({
	children,
	...props
}: React.ComponentProps<"button">) => <button {...props}>{children}</button>;

export const Input = (props: React.ComponentProps<"input">) => (
	<input {...props} />
);

export const Label = ({
	children,
	htmlFor,
	...props
}: React.ComponentProps<"label">) => (
	<label htmlFor={htmlFor} {...props}>
		{children}
	</label>
);

export const Command = {
	Input: (props: React.ComponentProps<"input">) => <input {...props} />,
	List: ({ children }: { children: React.ReactNode }) => (
		<select tabIndex={0} multiple>{children}</select>
	),
	Empty: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	Group: ({ children }: { children: React.ReactNode }) => (
		<fieldset>{children}</fieldset>
	),
	Item: ({ children, ...props }: React.ComponentProps<"option">) => (
		<option {...props}>{children}</option>
	),
};

export const Popover = {
	Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	Trigger: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	Content: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
};

export const Toaster = () => null;

export const toast = {
	success: vi.fn(),
	error: vi.fn(),
};
