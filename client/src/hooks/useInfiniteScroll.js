import { useState, useRef, useEffect, useCallback } from 'react';

const useInfiniteScroll = fetchMoreRef => {
  const observerRef = useRef();
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries =>
        setIntersecting(entries.some(entry => entry.isIntersecting)),
      );
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    if (fetchMoreRef?.current) {
      getObserver().observe(fetchMoreRef.current);
    }

    return () => getObserver().disconnect();
  }, [fetchMoreRef, getObserver]);

  return intersecting;
};

export default useInfiniteScroll;
