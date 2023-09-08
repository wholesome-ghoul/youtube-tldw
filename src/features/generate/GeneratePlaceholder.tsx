import { Placeholder } from "@allaround/all-components";

const GeneratePlaceholder = () => (
  <Placeholder noGrid>
    <Placeholder.Line maxWidth="100%" styles={{ padding: "1rem" }} animate />
  </Placeholder>
);

export default GeneratePlaceholder;
