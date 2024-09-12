// eslint-disable-next-line @typescript-eslint/naming-convention
// import DOMPurify from 'dompurify';

export interface IHeadingProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  content?: string;
  className?: string;
  children?: string;
}

function Heading({ type = 'h2', content, className, children }: IHeadingProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Element = type;
  return (
    <>
      {content ? (
        <Element
          className={className}
          //   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      ) : (
        <Element className={className}>{children}</Element>
      )}
    </>
  );
}

export default Heading;
