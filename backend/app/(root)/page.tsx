import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSidebar";
import { email } from "zod";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data || [];

  const appwriteItemId =
    (id as string) || accountsData[0]?.appwriteItemId || null;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home flex flex-row gap-4">
      {/* Main content */}
      <div className="home-content flex-1">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome "
            user={loggedIn?.firstName || "Guest"}
            subtext="This is your dashboard, where you can manage your account and settings."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      {/* Right sidebar */}
      <aside className="w-[280px]">
        <RightSideBar
          user={loggedIn}
          transactions={accounts?.transactions}
          banks={accountsData?.slice(0, 2)}
        />
      </aside>
    </section>
  );
};

export default Home;
