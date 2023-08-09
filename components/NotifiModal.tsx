import { NotifiSubscriptionCard } from "@notifi-network/notifi-react-card";
import React, { SetStateAction, useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import { useXmtpStore } from "../store/xmtp";
import { NotifiContextWrapper } from "./contexts/NotifiContextWrapper";
import { Modal } from "./Modal";
type Props = {
  show: boolean;
  setShowNotifiModal: React.Dispatch<SetStateAction<boolean>>;
};

export const NotifiModal = ({ setShowNotifiModal, show }: Props) => {
  const { conversations } = useXmtpStore();
  const { address } = useAccount();

  const buildContentTopic = (name: string): string => `/xmtp/0/${name}/proto`;

  const buildUserInviteTopic = useCallback((): string => {
    return buildContentTopic(`invite-${address}`);
  }, [address]);

  const buildUserIntroTopic = useCallback((): string => {
    return buildContentTopic(`intro-${address}`);
  }, [address]);

  let topics = useMemo<string[]>(
    () => [buildUserInviteTopic(), buildUserIntroTopic()],
    [buildUserIntroTopic, buildUserInviteTopic],
  );

  const addTopic = (topicName: string) => {
    if (!topics.includes(topicName)) {
      topics.push(topicName);
    }
  };

  conversations.forEach((c) => {
    addTopic(c.topic);
  });

  return (
    <Modal
      title=""
      size="sm"
      show={show}
      onClose={() => setShowNotifiModal(false)}>
      {!address ? (
        <>Loading...</>
      ) : (
        <NotifiContextWrapper>
          <NotifiSubscriptionCard
            inputs={{ XMTPTopics: topics }}
            cardId="62f835e4d2e1463cb56f228eb2c84f4a"
          />
        </NotifiContextWrapper>
      )}
    </Modal>
  );
};
