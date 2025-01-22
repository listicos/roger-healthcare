import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FormSchema } from "@/types/form";

interface FormState {
	formData: FormSchema;
	isHydrated: boolean;
	setFormData: (data: FormSchema) => void;
	resetForm: () => void;
	setHydrated: () => void;
}

export const useFormStore = create<FormState>()(
	persist(
		(set) => ({
			formData: {} as FormSchema,
			isHydrated: false,
			setFormData: (data) => set((state) => ({ 
				formData: { ...state.formData, ...data } 
			})),
			resetForm: () => set({ formData: {} }),
			setHydrated: () => set({ isHydrated: true }),
		}),
		{
			name: "form-storage",
			storage: createJSONStorage(() => {
				// Check if window is defined (for SSR compatibility)
				if (typeof window !== "undefined") {
					return localStorage;
				}
				return {
					getItem: () => null,
					setItem: () => null,
					removeItem: () => null,
				};
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHydrated();
			},
		},
	),
);
