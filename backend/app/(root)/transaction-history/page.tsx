import HeaderBox from "@/components/HeaderBox";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data || [];

  const appwriteItemId =
    (id as string) || accountsData[0]?.appwriteItemId || null;

  const account = await getAccount({ appwriteItemId });
  return (
    <section className="flex max-h-screen w-[1300px] flex-col align-middle justify-center gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-lg border-y bg-blue-600 px-[10px] py-[15px] md:flex-row">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white ">
              {" "}
              {account?.data.name}{" "}
            </h2>
            <p className="text-14 text-blue-100">
              {account?.data.officialName}
            </p>
            <p className="tracking-widest text-lg font-semibold text-white">
              **** **** ****{" "}
              <span className="text-xl">{account.mask || 1273}</span>
            </p>
          </div>
          <div className="transsction-account-balance">
            <p className="text-14 text-white">Current Balance</p>
            <p className="text-24 text-center font-bold text-white">
              {" "}
              {formatAmount(account?.data.currentBalance)}{" "}
            </p>
          </div>
        </div>
      </div>

      {/* <section className="flex-full flex-col gap-6">
        <TransactionsTable transactions={accounts?.transactions} />
      </section> */}
    </section>
  );
};
export default TransactionHistory;
