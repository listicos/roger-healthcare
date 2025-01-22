"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/form/FormSection";
import { useFormStore } from "@/store/formStore";
import { formSchema } from "@/constants/formSchema";
import type { FormSchema } from "@/types/form";

interface DynamicFormProps {
	defaultValues?: FormSchema;
}

export const DynamicForm = ({ defaultValues }: DynamicFormProps) => {
	const { setFormData, resetForm } = useFormStore();

	const methods = useForm({	
		mode: "onBlur",
		defaultValues: defaultValues,
	});

	const { reset, handleSubmit, watch, formState: { isSubmitting } } = methods;

	useEffect(() => {
		const subscription = watch((formValues) => {
			if (formValues) {
				setFormData(formValues as FormSchema);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setFormData]);

	const onSubmit = useCallback(async () => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			reset();
			resetForm()
			toast.success("Thank you for submitting the form!");
		} catch {
			toast.error("Failed to save form. Please try again.");
		} finally {
		}
	}, [reset, resetForm]);

	return (
		<div className="max-w-md mx-auto p-4">
			<Toaster />
			<h1 className="text-2xl font-bold mb-6">Patient Vital Signs</h1>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{Object.entries(formSchema).map(([sectionKey, section]) => (
						<FormSection
							key={sectionKey}
							sectionKey={sectionKey}
							section={section}
						/>
					))}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting ? "Saving..." : "Save Form"}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}