import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';

import createApp from '../utils/create-app';

describe('Server', () => {
  it('health check returns 200', async () => {
    await supertest(createApp())
      .get('/status')
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true);
      });
  });
});
