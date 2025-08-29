import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSidebar";
import { email } from "zod";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$ID });

  if (!accounts) return;

  const accountsData = accounts?.Data || [];

  const appwriteItemId =
    (id as string) || accountsData[0]?.appwriteItemId || null;

  const account = await getAccount({ appwriteItemId });

  console.log({
    accountsData,
    account,
  });

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
        <p className="mt-6 font-medium">RECENT TRANSACTIONS</p>
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
