import { formatAmount } from "@/lib/utils";
import React from "react";
import CountUp from "react-countup";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

function TotalBalanceBox({ accounts = [], totalBanks, totalCurrentBalance }) {
  return (
    <section className="bg-white rounded-xl shadow-md  border border-gray-200 flex items-center gap-6 p-8">
      {/* Doughnut Chart */}
      <div className="w-20 h-20 flex-shrink-0 ">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-1 ">
        <h2 className="text-sm font-medium text-gray-700">
          Bank Accounts: {totalBanks}
        </h2>
        <p className="text-xs text-gray-500">Total Current Balance:</p>
        <div className="text-lg font-semibold text-gray-900">
          <AnimatedCounter amount={totalCurrentBalance} />
        </div>
      </div>
    </section>
  );
}

export default TotalBalanceBox;
