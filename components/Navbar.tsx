
"use client";

import { useState } from "react";
import NavButton from "./NavButton";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed left-6 top-4 z-50 rounded-md border border-neutral-700 bg-neutral-900/80 px-3 py-2 text-sm hover:bg-neutral-800"
      >
        {open ? "Hide" : "Menu"}
      </button>

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-56",
          "bg-neutral-900/90 backdrop-blur",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Solid 1px divider to avoid subpixel border gaps */}
        <span
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-px bg-neutral-700"
        />

        <div className="flex h-full flex-col px-4 py-6">
          <div className="py-8 mb-6 text-lg font-semibold">AI Auto Docs</div>

          
          <nav className="flex w-full flex-col gap-4">
            <NavButton className="w-full" href="/">Home</NavButton>
            <NavButton className="w-full" href="/dashboard">Dashboard</NavButton>
            <NavButton className="w-full" href="/settings">Settings</NavButton>
            <NavButton className="w-full" href="/repos">Repos</NavButton>
            <div className="mt-auto">
            <LogoutButton className="w-full" />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
