
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current && typeof window !== 'undefined') {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    }
  }, []);

  if (!elRef.current) {
    return null;
  }

  return createPortal(children, elRef.current);
};

export default Portal;
