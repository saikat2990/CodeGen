import { Outlet } from "react-router-dom";
import Container from "./Container";
import { ApplicationMenu } from "@/pages/ApplicationMenus";

export default function Layout(props: { menus: ApplicationMenu[] }) {
  return (
    <Container menus={props.menus}>
      <Outlet />
    </Container>
  );
}
