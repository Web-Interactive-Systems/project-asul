import { useEffect, useState } from 'react';

export function useScript(src) {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let scriptTag = document.querySelector(`script[src="${src}"]`);

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.src = src;
      scriptTag.async = true;
      scriptTag.setAttribute('data-status', 'loading');
      document.body.appendChild(scriptTag);

      const setAttributeFromEvent = (event) => {
        scriptTag.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
      };

      scriptTag.addEventListener('load', setAttributeFromEvent);
      scriptTag.addEventListener('error', setAttributeFromEvent);
    } else {
      setStatus(scriptTag.getAttribute('data-status'));
    }

    const setStateFromEvent = (event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    scriptTag.addEventListener('load', setStateFromEvent);
    scriptTag.addEventListener('error', setStateFromEvent);

    return () => {
      if (scriptTag) {
        scriptTag.removeEventListener('load', setStateFromEvent);
        scriptTag.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);

  return status;
}
