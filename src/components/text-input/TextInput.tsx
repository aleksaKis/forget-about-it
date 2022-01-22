import Picker, { IEmojiData } from "emoji-picker-react";
import styled from "styled-components";
import { IconButton } from "../buttons/icon";
import { ReactComponent as SmileIcon } from "../icons/smile-solid.svg";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styleConstants } from "../../styles/style-contatns";

const PICKER_STYLE =
{
  width: "250px",
    height: "200px",
  position: "absolute",
  bottom: "0",
}


const AddEmojiIconButton = styled(IconButton)`
  border: 0;
`;

const PickerWrapper = styled.div`
  position: absolute;
`;

const TextInputWrapper = styled.div`
  flex-grow: 1;
  background-color: ${(p) => p.theme.backgroundColor};
  border: 1px solid ${(p) => p.theme.border};
  padding-left: ${styleConstants.spacing.regular};
  border-radius: ${styleConstants.border.radius};
  height: ${styleConstants.spacing.triple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${styleConstants.spacing.half};

  &:focus {
    background-color: ${(p) => p.theme.backgroundAlt};
    transition: background-color 100ms ease-in-out;
  }

  &:hover {
    background-color: ${(p) => p.theme.backgroundAlt};
    transition: background-color 100ms ease-in-out;
  }
`;

const InputWrapper = styled.input`
  border: 0;
  outline: 0;
  flex-grow: 1;
  color: ${(p) => p.theme.textColor};
  font-size: ${styleConstants.font.size.bodyText};
  background: transparent;
`;

interface TextInputProps extends InputHTMLAttributes<any> {
  initialValue: string;
  onValueChange: (value: string) => void;
  focus?: boolean;
}

export const TextInput = (props: TextInputProps) => {
  const { initialValue, onValueChange, focus } = props;
  const [value, setValue] = useState(initialValue);
  const [useEmoji, setUseEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // TODO remove emoji picker or implement closing on outside click
  const handleMouseClick = useCallback(
    (_, emojiObject: IEmojiData) => {
      const newValue = value + emojiObject.emoji;
      setValue(newValue);
      onValueChange(newValue);
      setUseEmoji(false);
    },
    [value, onValueChange]
  );

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  const handleUseEmoji = useCallback((): void => {
    setUseEmoji(!useEmoji);
  }, [useEmoji]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    onValueChange(event.target.value);
  };

  const extendEmojiPicker = useEmoji ? (
    <PickerWrapper>
      <Picker
        pickerStyle={PICKER_STYLE}
        disableSearchBar={true}
        native={true}
        onEmojiClick={handleMouseClick}
      />
    </PickerWrapper>
  ) : (
    <AddEmojiIconButton onClick={handleUseEmoji} title="Select emoji">
      <SmileIcon />
    </AddEmojiIconButton>
  );

  return (
    <TextInputWrapper>
      <InputWrapper
        ref={inputRef}
        role="form"
        value={value}
        type="text"
        onChange={handleInputChange}
      />
      {extendEmojiPicker}
    </TextInputWrapper>
  );
};
