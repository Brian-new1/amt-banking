"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const Copy = ({ id }: { id: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant="secondary"
      className="mt-3 flex max-w-[320px] items-center gap-2"
    >
      {/* Show the Plaid shareable ID */}
      <p className="truncate w-full text-xs font-medium text-black-2">{id}</p>

      {!hasCopied ? (
        // 📋 Copy icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      ) : (
        // ✅ Checkmark icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </Button>
  );
};

export default Copy;
