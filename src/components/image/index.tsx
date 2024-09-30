export interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  loading?: 'eager' | 'lazy';
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

function ImageRoot(props: IImage) {
  return (
    <img
      src={props.src}
      width={props.width}
      height={props.height}
      loading={props.loading}
      alt={props.alt}
    />
  );
}

export default ImageRoot;
