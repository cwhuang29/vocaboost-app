import { useEffect, useRef } from 'react';

import { isObjectEmpty } from 'shared/utils/misc';
import { getLocalDate } from 'shared/utils/time';

const useStudyScreenMonitor = value => {
  const words = useRef();
  const startTime = useRef();

  useEffect(() => {
    words.current = new Set();
    startTime.current = getLocalDate();
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(value) && Object.hasOwn(value, 'id')) {
      words.current.add(value.id);
    }
  }, [JSON.stringify(value)]);

  const wordCount = words.current?.size || 0;
  const timeElapsed = (getLocalDate() - startTime.current || 0) / 1000;

  return { wordCount, timeElapsed };
};

export default useStudyScreenMonitor;
