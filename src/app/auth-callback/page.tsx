import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = async () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }: { success: boolean }) => {
      if (success) {
        //user is synced to db
        // Redirect to origin or home page
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
  });
};

export default Page;
