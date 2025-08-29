import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="relative w-full max-w-[360px] h-[240px] mx-auto">
      {/* Second card (behind, slightly visible) */}
      <div className="absolute top-8 left-6 w-full h-[200px] rounded-2xl shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 z-10">
        <div className="absolute bottom-6 left-6 right-6">
          <p className="tracking-widest text-lg font-semibold">
            **** **** ****{" "}
            <span className="text-xl">{account.mask || 5678}</span>
          </p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <h1 className="text-sm font-semibold uppercase">{userName}</h1>
              <p className="text-xs">11 / 27</p>
            </div>
            <Image
              src="/icons/mastercard.svg"
              width={50}
              height={35}
              alt="MasterCard"
            />
          </div>
        </div>
      </div>

      {/* First card (front) */}
      <Link
        href={`/transaction-history?id=${account.appwriteItemId}`}
        className="absolute top-0 left-0 flex h-[200px] w-full rounded-2xl shadow-lg bg-gradient-to-r from-[#0a2a6c] to-[#0f5edd] text-white p-6 z-20"
      >
        <div className="relative flex flex-col justify-between w-full">
          {/* Top: chip + name + balance */}
          <div>
            <Image src="/icons/chip.svg" width={40} height={30} alt="Chip" />

            <h1 className="mt-4 text-base font-semibold uppercase">
              {userName}
            </h1>

            {showBalance && (
              <div className="mt-1">
                <p className="text-xs font-light">Balance</p>
                <p className="text-lg font-bold">
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            )}
          </div>

          {/* Bottom info row: name (left) + balance (right) */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs uppercase">{userName}</p>
            {showBalance && (
              <p className="text-xs font-medium">
                {formatAmount(account.currentBalance)}
              </p>
            )}
          </div>

          {/* Card Number */}
          <p className="tracking-widest text-lg font-semibold">
            **** **** ****{" "}
            <span className="text-xl">{account.mask || 1273}</span>
          </p>

          {/* Bottom: expiry (right) + logo */}
          <div className="flex justify-between items-center">
            <div />{" "}
            {/* empty spacer keeps number left and pushes expiry right */}
            <p className="text-sm font-medium">12 / 26</p>
            <Image
              src="/icons/mastercard.svg"
              width={50}
              height={35}
              alt="MasterCard"
            />
          </div>
        </div>
      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
