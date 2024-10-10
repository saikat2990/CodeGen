import React from 'react';
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
  Package2
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const SidebarItem = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children?: React.ReactNode }) => (
  <div className="w-full">
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-6 mt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-start gap-4 p-6">
        <Link
          to="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary p-2 text-sm font-semibold text-primary-foreground"
        >
          <Package2 className="h-4 w-4" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <SidebarItem icon={Home} title="Dashboard">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Overview</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Summary
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Analytics
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
        <SidebarItem icon={ShoppingCart} title="Orders">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Manage</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Recent Orders
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Pending Orders
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
        <SidebarItem icon={Package} title="Products">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Inventory</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Stock Levels
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Reorder Points
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
        <SidebarItem icon={Users2} title="Customers">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Segments</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                VIP Customers
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                New Customers
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
        <SidebarItem icon={LineChart} title="Analytics">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Reports</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Sales Report
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Customer Insights
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
      </nav>
      <div className="mt-auto p-6">
        <SidebarItem icon={Settings} title="Settings">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <span>Account</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2 space-y-2">
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Profile
              </Link>
              <Link to="#" className="block rounded-lg px-4 py-2 hover:bg-muted">
                Preferences
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
