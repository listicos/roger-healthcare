This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dynamic Form System

This project implements a flexible and dynamic form system with the following features:

- **Schema-Driven Forms**: Forms are generated from a JSON schema defined in `src/constants/formSchema.ts`
- **Multiple Field Types**: Supports various field types including:
  - Text inputs
  - Type-ahead selectors
  - Multi-select fields
- **Conditional Logic**: Fields can be shown/hidden based on other field values
- **Real-time Updates**: Form state is managed through a central store using Zustand
- **Form Validation**: Built-in validation using React Hook Form
- **State Persistence**: Form data is automatically saved to local storage and restored on page reload
- **Responsive Design**: Mobile-friendly UI components

### Form Components

The form system is built using several reusable components:

- `DynamicForm`: The main container component that handles form state and submission
- `FormSection`: Renders individual form sections based on the schema
- `TextField`: Custom text input component
- `TypeAhead`: Autocomplete input component
- `MultiSelect`: Multiple selection component

### Usage

To create a new form:

1. Define your form schema in `formSchema.ts`, this schema is hardcoded for now, but will be dynamically generated from the backend and should be passed in as a prop.
2. Use the `DynamicForm` component with optional default values:

```tsx
<DynamicForm defaultValues={initialData} />
```

The form data is automatically managed through the form store and persisted in local storage, allowing users to retain their progress even if they close the browser.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
