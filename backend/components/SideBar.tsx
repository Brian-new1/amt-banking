"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { is } from "zod/locales";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const SideBar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center hidden md:flex flex-col w-64 justify-between">
      {/* 👆 Added justify-between so nav stays at the top and footer at the bottom */}

      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="ATM Bank Logo"
            className="w-[24px] h-[24px] xl:w-[34px] xl:h-[34px]"
            priority
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden text-xl ">
            ATM Bank
          </h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                {
                  "bg-gradient-to-r from-[#0179FE] to-[#4893FF] ": isActive,
                }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-black-2 max-xl:hidden",
                  { "!text-white": isActive }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>

      {/* 👇 Footer is now forced to bottom */}
      <Footer user={user} />
    </section>
  );
};

export default SideBar;
