import SideMenu from "./SideMenu";

export default function Container({ children }: { children: JSX.Element }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideMenu />
      {children}
    </div>
  );
}
