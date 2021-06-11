import { Fragment, ReactNode } from "react";
import styled from "styled-components";
import Header from "./header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Header />
      <Content>{children}</Content>
    </Fragment>
  );
}

export default Layout;
