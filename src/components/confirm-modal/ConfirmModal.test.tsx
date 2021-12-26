import { render, screen } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";
import userEvent from "@testing-library/user-event";

const fakeProps = {
  handleConfirm: jest.fn(),
  setModalState: jest.fn(),
};

describe("ConfirmModal", () => {
  beforeEach(() => {
    render(
      <ConfirmModal
        handleConfirm={fakeProps.handleConfirm}
        setModalState={fakeProps.setModalState}
      >
        <span>content</span>
      </ConfirmModal>
    );
  });

  it("should display content in confirm modal", () => {
    const message = screen.getByText("content");
    expect(message).toBeInTheDocument();
  });

  it("should display yes && no buttons", () => {
    expect(screen.getByText(/yes/i)).toBeInTheDocument();
    expect(screen.getByText(/no/i)).toBeInTheDocument();
  });

  it("should emit confirm when yes button is clicked", () => {
    userEvent.click(screen.getByText(/yes/i));
    expect(fakeProps.handleConfirm).toHaveBeenCalled();
  });
});
