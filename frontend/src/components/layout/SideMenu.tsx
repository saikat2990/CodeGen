import { Link } from "react-router-dom";
import {
  ChevronDown,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

export default function SideMenu() {
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
        <div className="w-full">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                  <span>Overview</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-2 space-y-2">
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Summary
                  </Link>
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Analytics
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="w-full">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Orders</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                  <span>Manage</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-2 space-y-2">
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Recent Orders
                  </Link>
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Pending Orders
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="w-full">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                  <span>Inventory</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-2 space-y-2">
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Stock Levels
                  </Link>
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Reorder Points
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="w-full">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4" />
                <span>Customers</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                  <span>Segments</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-2 space-y-2">
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    VIP Customers
                  </Link>
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    New Customers
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="w-full">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Analytics</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 mt-2">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                  <span>Reports</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-2 space-y-2">
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Sales Report
                  </Link>
                  <Link
                    to="#"
                    className="block rounded-lg px-4 py-2 hover:bg-muted"
                  >
                    Customer Insights
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>
      <div className="mt-auto p-6">
        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-6 mt-2">
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                <span>Account</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-6 mt-2 space-y-2">
                <Link
                  to="#"
                  className="block rounded-lg px-4 py-2 hover:bg-muted"
                >
                  Profile
                </Link>
                <Link
                  to="#"
                  className="block rounded-lg px-4 py-2 hover:bg-muted"
                >
                  Preferences
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
}
