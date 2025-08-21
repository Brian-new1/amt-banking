import { formatAmount } from '@/lib/utils'
import React from 'react'

function TotalBalanceBox( {
    accounts = [],
    totalBanks ,
    totalCurrentBalance,
}) {
  return (
    <section className="total-balance">
      <div className='total-balance-chart' >
        {/* DoughnutChart */}
      </div>
      <div className='flex flex-col gap-6' >
        <h2 className='header-2' >
          Bank Accounts: {totalBanks} 
        </h2>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='total-balance-label' >
          Total Current Balance: 
        </p>

        <p className='total-balance-amount flex-center gap-2' >
          {formatAmount (totalCurrentBalance)}
        </p>
      </div>
      <section className="bg-red-500 p-10 text-white">
  If this is red with white text, Tailwind is working ✅
</section>

    </section>
    
  )
}

export default TotalBalanceBox