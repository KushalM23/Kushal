"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

const PRESERVE_HOME_SCROLL_KEY = "home:preserve-scroll";

interface PreserveScrollBackButtonProps {
  label: string;
  className?: string;
}

export default function PreserveScrollBackButton({
  label,
  className,
}: PreserveScrollBackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        sessionStorage.setItem(PRESERVE_HOME_SCROLL_KEY, "1");
        router.back();
      }}
      className={className}
    >
      <IconArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  );
}
