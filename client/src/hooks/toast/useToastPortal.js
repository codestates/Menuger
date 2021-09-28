import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { BOX_TOP, BOX_RIGHT } from '../../components/common/ToastPortal/constants';

const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${uuid()}`);

  useEffect(() => {
    const portal = document.createElement('div');
    portal.id = portalId;
    portal.style = `position: fixed; top: ${BOX_TOP}px; right: ${BOX_RIGHT}px; z-index: 10`;
    const target = document.getElementById('root');
    target.parentNode.insertBefore(portal, target);
    setLoaded(true);

    return () => target.parentNode.removeChild(portal);
  }, [portalId]);

  return { loaded, portalId };
};

export default useToastPortal;
