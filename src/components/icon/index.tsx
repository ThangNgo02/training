import { renderICon } from '@/components/icon/renderICon';
import { type IconVariable } from '@/components/icon/types';

interface IIconComponentProps {
  icon: IconVariable;
  onClick?: VoidFunction;
}

function IconRoot(props: IIconComponentProps) {
  return (
    <div
      data-testid={'icon-root'}
      className='cursor-pointer'
      onClick={props.onClick}>
      {renderICon[props.icon]}
    </div>
  );
}

export default IconRoot;
