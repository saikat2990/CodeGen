import SideMenu from "./SideMenu";
import { ApplicationMenu } from "@/pages/ApplicationMenus";

export default function Container({
  children,
  menus,
}: {
  children: JSX.Element;
  menus: ApplicationMenu[];
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideMenu menus={menus} />
      {children}
    </div>
  );
}
