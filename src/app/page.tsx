"use client";

import { useFormStore } from "@/store/formStore";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormSkeleton } from "@/components/form/FormSkeleton";

const Page = () => {
	const { isHydrated, formData } = useFormStore();

	if (!isHydrated) {
		return <FormSkeleton />;
	}

	return <DynamicForm defaultValues={formData}/>;
};

export default Page;
