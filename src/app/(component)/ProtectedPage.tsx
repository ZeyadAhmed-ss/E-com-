"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { data: _session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  return <>{children}</>;
}
