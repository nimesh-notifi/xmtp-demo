import { NotifiContext } from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";

import { arrayify } from "ethers/lib/utils.js";
import { ReactNode } from "react";

import { useAccount, useSignMessage } from "wagmi";
type Props = {
  children: React.ReactNode;
};

export const NotifiContextWrapper = ({ children }: Props) => {
  const { address } = useAccount();

  const { signMessageAsync } = useSignMessage();

  return (
    <NotifiContext
      dappAddress="notifixmtpdemo"
      env="Production"
      signMessage={async (message: Uint8Array) => {
        const result = await signMessageAsync({ message });
        return arrayify(result);
      }}
      walletPublicKey={address ?? ""}
      walletBlockchain="ETHEREUM">
      {children}
    </NotifiContext>
  );
};
