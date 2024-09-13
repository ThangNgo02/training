import { renderICon } from '@/components/icon/renderICon';
import { type IconVariable } from '@/components/icon/types';

interface IIconComponentProps {
  icon: IconVariable;
  onClick?: VoidFunction;
  className?: string;
}

function IconRoot(props: IIconComponentProps) {
  return (
    <div
      data-testid={'icon-root'}
      style={{ cursor: 'pointer' }}
      className={props.className}
      onClick={props.onClick}>
      {renderICon[props.icon]}
    </div>
  );
}

export default IconRoot;
