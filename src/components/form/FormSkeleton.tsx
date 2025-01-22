import { Skeleton } from "@/components/ui/skeleton";

export const FormSkeleton = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <Skeleton key={j} className="h-10" />
              ))}
            </div>
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};