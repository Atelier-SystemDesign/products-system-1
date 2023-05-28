import { sleep, check } from 'k6';    // eslint-disable-line
import http from 'k6/http';           // eslint-disable-line

export const options = {
  stages: [
    { durations: '30s', target: 2000 },
    { duration: '30s', target: 2000 },
    { duration: '30s', target: 0 },
  ],
};

/**
 * One product aggregate test. Attempting to display id's between 910,000 and 940,000.
 */
export default () => {
  const randomId = Math.floor(Math.random() * 30000 + 910000);
  const res = http.get(http.url`http://localhost:3021/api/products/${randomId}`);

  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
};
