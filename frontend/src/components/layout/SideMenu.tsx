import { Link } from "react-router-dom";
import { ChevronDown, Flower, Home, Package2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const menuItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    link: "/",
  },
  {
    title: "Design Settings",
    icon: <Flower className="h-4 w-4" />,
    subItems: [
      {
        title: "Page",
        subItems: [
          { title: "Page Management", link: "#" },
          { title: "Page Menu", link: "#" },
        ],
      },
    ],
  },
];

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
        {menuItems.map((menuItem, index) => (
          <div className="w-full" key={index}>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                {!menuItem.subItems || menuItem.subItems.length === 0 ? (
                  <Link
                    className="flex items-center gap-2"
                    to={menuItem.link ?? "#"}
                  >
                    {menuItem.icon}
                    <span>{menuItem.title}</span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      {menuItem.icon}
                      <span>{menuItem.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </CollapsibleTrigger>
              {menuItem.subItems && (
                <CollapsibleContent className="ml-6 mt-2">
                  {menuItem.subItems.map((subItem, subIndex) => (
                    <Collapsible key={subIndex}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                        <span>{subItem.title}</span>
                        {subItem.subItems && (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      {subItem.subItems && (
                        <CollapsibleContent className="ml-6 mt-2 space-y-2">
                          {subItem.subItems.map((linkItem, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={linkItem.link}
                              className="block rounded-lg px-4 py-2 hover:bg-muted"
                            >
                              {linkItem.title}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
        ))}
      </nav>
    </aside>
  );
}
