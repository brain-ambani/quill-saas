"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        //user is synced to db
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/auth/signin");
      }
    },
    retry: true,
    retryDelay: 300,
  });
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="fex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 nimate-spin text-zinc-800" size={48} />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will redirected automatically</p>
      </div>
    </div>
  );
};

export default Page;
