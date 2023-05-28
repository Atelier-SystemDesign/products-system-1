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
 * Main endpoint agregate test. Attempting to display id's between 900,000 and 910,000.
 */
export default () => {
  const page = Math.floor(Math.random() * 100 + 9000);
  const count = 100;
  const res = http.get(http.url`http://localhost:3021/api/products?page=${page}&count=${count}`);

  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
};
