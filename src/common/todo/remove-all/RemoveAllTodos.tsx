import { useState } from "react";
import { ConfirmModal } from "../../../components/confirm-modal/ConfirmModal";
import React from "react";
import { SecondaryButton } from "../../../components/buttons/secondary";

interface RemoveAllTodoProps {
  onRemoveAll: () => void;
}

const RemoveAllTodos = (props: RemoveAllTodoProps) => {
  const [openModal, setOpenModal] = useState(false);

  function handleModal(isOpen: boolean): void {
    setOpenModal(isOpen);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  function handleModalConfirm() {
    props.onRemoveAll();
    setOpenModal(false);
  }

  const confirmModal = openModal && (
    <ConfirmModal
      handleConfirm={handleModalConfirm}
      setModalState={handleModal}
    >
      <span>
        <h4>WARNING!</h4>
        This action will remove <strong>ALL</strong> your todos including the{" "}
        <strong>LOCKED </strong>
        ones.
      </span>
    </ConfirmModal>
  );

  return (
    <React.Fragment>
      {confirmModal}
      <SecondaryButton onClick={handleOpenModal}>Delete all</SecondaryButton>
    </React.Fragment>
  );
};

export default RemoveAllTodos;
