import { Image, Container, Navbar, Tooltip } from "@allaround/all-components";
import { useRef } from "react";

import CreditsAvailable from "../credits-available";
import ThemeToggler from "../theme-toggler";

const _Navbar = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <Navbar
      grid={{
        rows: 1,
        cols: "1fr 4fr 1fr",
      }}
      styles={{
        minHeight: "unset",
      }}
      autoVer
    >
      <Container
        styles={{
          width: "80px",
          justifySelf: "start",
        }}
        noGrid
      >
        <Image
          src="./logo/tldw.png"
          alt="tldw logo"
          innerRef={logoRef}
          noMargin
        />
        <Tooltip componentRef={logoRef} preferredPosition="right">
          Too Long; Didn't Watch
        </Tooltip>
      </Container>

      <Container noGrid>
        <CreditsAvailable />
      </Container>

      <ThemeToggler />
    </Navbar>
  );
};

export default _Navbar;
