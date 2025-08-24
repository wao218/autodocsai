"use client";
import { useRouter } from "next/navigation";    
import { supabase } from "@/lib/supabase/client";

type Props = { className?: string };

export default function LogoutButton({className}: Props) {
    const router = useRouter();
  const handleLogout = async () => {
    // End Supabase session
    await supabase.auth.signOut();

    // Redirect back to login page
     router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-xl border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  );
}
