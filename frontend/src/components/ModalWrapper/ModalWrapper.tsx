import { Modal } from "antd";
import React, { FC } from "react";

interface Props {
  title?: string;
  opened: boolean;
  confirmLoading?: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
}

export const ModalWrapper: FC<Props> = ({
  opened,
  title,
  onCancel,
  confirmLoading = false,
  children,
}) => {
  return (
    <section className="modal-wrapper">
      <Modal
        title={title}
        open={opened}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={null}
      >
        {children}
      </Modal>
    </section>
  );
};
