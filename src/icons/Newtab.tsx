import { Icons } from "@allaround/all-components";
import type { SVGProps } from "react";

const { NewtabIcon } = Icons;

type Props = SVGProps<SVGSVGElement>;

const Newtab = (props: Props) => (
  <NewtabIcon {...props} viewBox={"0 0 1024 1024"} />
);

export default Newtab;
