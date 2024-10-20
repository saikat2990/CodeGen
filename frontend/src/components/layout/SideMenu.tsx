import { Link } from "react-router-dom";
import { ChevronDown, Flower, Home, Package2, BookKey, Settings } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ApplicationMenu } from "@/pages/ApplicationMenus";

// The menu items will be dynamic from API
// This can be string of array

const menuItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-6 w-6" />,
    link: "/",
  },
  {
    title: "Pages",
    icon: <BookKey className="h-6 w-6" />,
    link: "/demo-page-link",
    subItems: [
      {
        title: "generated-page-context",
        subItems: [
          // { title: "Page Management", link: "/pages" },
          // { title: "Page Menu", link: "/menus" },
        ],
      },
    ],
  },
  {
    title: "Design Settings",
    icon: <Flower className="h-6 w-6" />,
    subItems: [
      {
        title: "Page",
        subItems: [
          { title: "Page Management", link: "/pages" },
          { title: "Page Menu", link: "/menus" },
        ],
      },
    ],
  },
  {
    title: "Application Settings",
    icon: <Settings className="h-6 w-6" />,
    link: '/application-settings',
    // subItems: [
    //   {
    //     title: "Page",
    //     subItems: [
    //       // { title: "Page Management", link: "/pages" },
    //       // { title: "Page Menu", link: "/menus" },
    //     ],
    //   },
    // ],
  },
  {
    title: "Application URL", // This will be dynamic,
    icon: <Settings className="h-6 w-6" />,
    link: '/app-url/3', // These are dynamic
    // subItems: [
    //   {
    //     title: "Page",
    //     subItems: [
    //       // { title: "Page Management", link: "/pages" },
    //       // { title: "Page Menu", link: "/menus" },
    //     ],
    //   },
    // ],
  },
];

export default function SideMenu(props: { menus: ApplicationMenu[] }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-80 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-start gap-4 p-6">
        {/* <Link
          to="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary p-2 text-sm font-semibold text-primary-foreground"
        >
          <Package2 className="h-4 w-4" />
          <span className="sr-only">Acme Inc</span>
        </Link> */}
        <div>
          <img
            className="mb-4 p-2 text-center"
            src="https://cdn.vivasoftltd.com/wp-content/uploads/2024/03/Logo.svg"
          />
        </div>
        
        {[
          ...menuItems.slice(0, 1), // Get the first item
          ...props.menus.map((menu: ApplicationMenu) => ({
            title: menu.name,
            icon: <></>,
            link: menu.url,
            subItems: undefined,
          })), // Insert new items after the first item
          ...menuItems.slice(1), // Get the rest of the original array
        ].map((menu, index) => (
          <div className="w-full" key={index}>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                {!menu.subItems || menu.subItems.length === 0 ? (
                  <Link
                    className="flex items-center gap-2"
                    to={menu.link ?? "#"}
                  >
                    {menu.icon}
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      {menu.icon}
                      <span>{menu.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </CollapsibleTrigger>
              {menu.subItems && (
                <CollapsibleContent className="ml-6 mt-2">
                  {menu.subItems.map((subItem, subIndex) => (
                    <Collapsible key={subIndex}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left hover:bg-muted">
                        <span>{subItem.title}</span>
                        {subItem?.subItems && (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      {subItem?.subItems && (
                        <CollapsibleContent className="ml-6 mt-2 space-y-2">
                          {subItem?.subItems.map((linkItem, linkIndex) => (
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
