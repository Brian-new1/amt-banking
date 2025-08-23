"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import BankCard from "./BankCard";

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className=" md:block h-screen max-h-screen w-[270px] border-l border-gray-200 overflow-y-auto flex flex-col">
      {/* Profile Section - Now with proper spacing */}
      <div className="flex-none">
        {" "}
        {/* Changed to flex-none to prevent shrinking */}
        <section className="relative h-[200px]">
          <div className="h-[120px] w-full bg-[url('/icons/gradient.jpg')] bg-cover bg-center"></div>
          <div className="absolute left-1/2 top-[80px] transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-8 border-white shadow-lg">
              <span className="text-4xl font-bold text-blue-500">
                {user?.firstName?.[0] ?? "?"}
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 w-full px-4 text-center">
            <h1 className="text-xl font-bold text-gray-900">
              {user?.firstName ?? "Guest"}
              {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              {user?.email ?? "No email available"}
            </p>
          </div>
        </section>
      </div>

      {/* Banks Section - Now with guaranteed spacing */}
      <div className="flex-grow overflow-auto">
        {" "}
        <div className="h-[60px]"></div>
        {/* Changed to flex-grow */}
        <section className="flex flex-col px-6 pt-8 pb-4">
          {" "}
          {/* Changed to pt-6 */}
          <div className="flex w-65 justify-between mb-6">
            <h2 className="text-lg font-semibold">My Banks</h2>
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="Add bank"
              />
              <span className="text-sm font-semibold text-gray-600">
                Add Bank
              </span>
            </Link>
          </div>
          {banks?.length > 0 && (
            <div className="relative flex flex-col gap-4 min-h-[200px]">
              <div className="z-10 w-full">
                <BankCard
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
              {banks[1] && (
                <div className="w-[90%] self-end -mt-4 z-0">
                  <BankCard
                    key={banks[1].$id}
                    account={banks[1]}
                    userName={`${user.firstName} ${user.lastName}`}
                    showBalance={false}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </aside>
  );
};

export default RightSideBar;
