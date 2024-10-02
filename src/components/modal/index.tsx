import Button from '../button';

interface IModalProps {
  icon?: React.ReactNode;
  title?: string;
  content?: string;
  className?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
}

function Modal({ isOpenModal = false, setIsOpenModal, ...props }: IModalProps) {
  const handleClose = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      {isOpenModal && (
        <div
          className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-overlay-modal'
          onClick={handleClose}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className={`flex h-[234px] w-[400px] flex-col items-center justify-between rounded-xl bg-white px-4 py-6 ${props.className}`}>
            {props.icon && (
              <div className='text-24x24 text-neutral-80 flex items-center justify-center gap-2'>{props.icon}</div>
            )}
            <div>
              <p className='mb-3 text-center text-[18px] font-semibold leading-[28px]'>{props.title}</p>
              <p className='mb-2 text-center text-sm font-normal leading-[18px] text-[#616161]'>{props.content}</p>
            </div>
            <div className='flex w-full items-center justify-center gap-4'>
              {props.onConfirm && (
                <Button
                  text='OK'
                  onClick={props.onConfirm}
                  className='flex w-full items-center justify-center rounded-md bg-[#2DB976] px-4 py-2 text-white hover:bg-[#21794e]'
                />
              )}
              {props.onClose && (
                <Button
                  text='HỦY'
                  onClick={() => {
                    props.onClose?.();
                    handleClose();
                  }}
                  className='flex w-full items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
