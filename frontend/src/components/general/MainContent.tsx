import React from 'react';
import OrderSummaryCards from './OrderSummaryCards';
import RecentOrdersTable from './RecentOrdersTable';

const MainContent = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <OrderSummaryCards />
        <RecentOrdersTable />
      </div>
      <div>
        {/* You can add the order details card here if needed */}
      </div>
    </main>
  );
};

export default MainContent;
