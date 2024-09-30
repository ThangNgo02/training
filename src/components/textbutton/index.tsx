interface ITextButton {
  text?: string;
  className?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function TextButton(props: ITextButton) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 text-[#2DB976] hover:opacity-85 ${props.className} `}
      {...props}>
      {props.iconStart} {props.text} {props.iconEnd}
    </button>
  );
}

export default TextButton;
