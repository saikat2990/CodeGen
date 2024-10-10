import { Outlet } from "react-router-dom";
import Container from "./Container";

export default function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
