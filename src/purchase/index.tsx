import { useContext, useState } from "react";
import { Container, Input, Heading, Button } from "@allaround/all-components";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.css";
import { amountToCredits } from "../helpers";
import { PAYPAL_BUTTON_URL } from "../constants";
import Context from "../context";
import LocalIcons from "../icons";

const DollarSign = <div className={styles.dollarSign}>$</div>;

const Purchase = () => {
  const { customerInfo, setCustomerInfo } = useContext(Context.CustomerContext);
  const [amount, setAmount] = useState(1);
  const [potentialCredits, setPotentialCredits] = useState(() =>
    amountToCredits(1)
  );

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.abs(Number(e.target.value));

    setAmount(value);
    setPotentialCredits(amountToCredits(value));
  };

  const onCheckout = () => {
    let temporaryID = customerInfo?.temporaryID;
    if (!temporaryID) {
      temporaryID = uuidv4();

      setCustomerInfo({
        ...customerInfo,
        temporaryID,
      });
    }

    const rawPayload = {
      service: "youtube-tldr",
      credits: potentialCredits,
      customerID: customerInfo?.customerID,
      temporaryID,
      amount,
    };

    const payload = encodeURIComponent(btoa(JSON.stringify(rawPayload)));

    const url = `${PAYPAL_BUTTON_URL}/?payload=${payload}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Heading.h4>Purchase {potentialCredits} Credits</Heading.h4>
      <Container className={styles.container} noGrid>
        <Input
          placeholder="Amount USD"
          onChange={onAmountChange}
          type="number"
          value={amount.toString()}
          icon={DollarSign}
          fill
        />

        {amount >= 1 && (
          <Button onClick={onCheckout} icon={<LocalIcons.Newtab />}>
            Checkout {potentialCredits} Credits
          </Button>
        )}
      </Container>
    </>
  );
};

export default Purchase;
