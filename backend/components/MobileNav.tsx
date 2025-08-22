"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    // 👇 Only visible on small/medium screens
    <nav className="block lg:hidden w-full flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          width={30}
          height={30}
          alt="ATM Bank Logo"
          priority
        />
      </Link>

      {/* Right: Hamburger menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={28}
            height={28}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        {/* Sidebar content */}
        <SheetContent
          side="left"
          className="w-[264px] p-4 border-none bg-white"
        >
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>

          {/* Logo inside sidebar */}
          <Link
            href="/"
            className="px-4 flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="ATM Bank Logo"
              priority
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              ATM Bank
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              {/* Sidebar links */}
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                <div className="flex flex-col gap-4">
                  {sidebarLinks.map((item) => {
                    const isActive =
                      pathname === item.route ||
                      pathname.startsWith(`${item.route}/`);
                    return (
                      <SheetClose asChild key={item.route}>
                        <Link
                          href={item.route}
                          key={item.label}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 transition",
                            {
                              "bg-gradient-to-r from-[#0179FE] to-[#4893FF] text-white":
                                isActive,
                            }
                          )}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                              "brightness-[3] invert-0": isActive,
                            })}
                          />
                          <span
                            className={cn("text-16 font-semibold text-black", {
                              "text-white": isActive,
                            })}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
