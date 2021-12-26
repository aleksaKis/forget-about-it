import { PrimaryButton } from "../buttons/primary";
import { SecondaryButton } from "../buttons/secondary";
import classes from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  children: JSX.Element;
  handleConfirm: Function;
  setModalState: Function;
}
// fix this a bit
export const ConfirmModal = (props: ConfirmModalProps) => {
  const handleCloseModal = () => {
    props.setModalState(false);
  };

  const handleConfirm = () => {
    props.handleConfirm();
  };

  return (
    <div className={classes.modal_background} onClick={handleCloseModal}>
      <div className={classes.confirm}>
        {props.children}
        <span className={classes.span}>Do you want to continue?</span>
        <div className={classes.modal_buttons}>
          <SecondaryButton
            className={classes.modal_buttons_no}
            onClick={handleCloseModal}
          >
            No
          </SecondaryButton>
          <PrimaryButton
            className={classes.modal_buttons_yes}
            onClick={handleConfirm}
          >
            Yes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
