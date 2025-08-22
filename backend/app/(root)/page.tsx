import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSidebar";
import { email } from "zod";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home flex flex-row gap-4">
      {/* Main content */}
      <div className="home-content flex-1">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome "
            user={loggedIn?.name || "Guest"}
            subtext="This is your dashboard, where you can manage your account and settings."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000.0}
          />
        </header>
        <p className="mt-6 font-medium">RECENT TRANSACTIONS</p>
      </div>

      {/* Right sidebar */}
      <aside className="w-[280px]">
        <RightSideBar
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 123.5 }]}
        />
      </aside>
    </section>
  );
};

export default Home;
