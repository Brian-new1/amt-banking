import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
  const loggedIn = { firstName: "rex" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome "
            user={loggedIn?.firstName || "Guest"}
            subtext="This is your dashboard, where you can manage your account and settings."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000.0}
          />
        </header>
      </div>
      <section className="bg-red-500 p-10 text-white">
        If this is red with white text, Tailwind is working ✅
      </section>
    </section>
  );
};

export default Home;
