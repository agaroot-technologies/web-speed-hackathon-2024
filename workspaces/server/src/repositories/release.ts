import { HTTPException } from 'hono/http-exception';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

import type { GetReleaseListResponse } from '@wsh-2024/schema/src/api/releases/GetReleaseListResponse';
import type { GetReleaseRequestParams } from '@wsh-2024/schema/src/api/releases/GetReleaseRequestParams';
import type { GetReleaseResponse } from '@wsh-2024/schema/src/api/releases/GetReleaseResponse';

import { getDatabase } from '../database/drizzle';
import { GetReleaseRequestQuery } from '@wsh-2024/schema/src/api/releases/GetReleaseRequestQuery';

type ReleaseRepositoryInterface = {
  read(options: { params: GetReleaseRequestParams }): Promise<Result<GetReleaseResponse, HTTPException>>;
  readAll(): Promise<Result<GetReleaseListResponse, HTTPException>>;
};

class ReleaseRepository implements ReleaseRepositoryInterface {
  async readAll(): Promise<Result<GetReleaseListResponse, HTTPException>> {
    try {
      const data = await getDatabase().query.release.findMany({
        columns: {
          dayOfWeek: true,
          id: true,
        },
      });

      return ok(data);
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to read releases.` }));
    }
  }

  async read(options: { params: GetReleaseRequestParams, query: GetReleaseRequestQuery }): Promise<Result<GetReleaseResponse, HTTPException>> {
    try {
      const release = await getDatabase().query.release.findFirst({
        columns: {
          dayOfWeek: true,
          id: true,
        },
        where: (release, { eq }) => {
          return eq(release.dayOfWeek, options.params.dayOfWeek);
        },
      });
      if (release == null) {
        throw new HTTPException(404, { message: `Release:${options.params.dayOfWeek} is not found` });
      }

      const books = await getDatabase().query.book.findMany({
        columns: {
          id: true,
          name: true,
        },
        limit: options.query.limit,
        offset: options.query.offset,
        where(book, { eq }) {
          return eq(book.releaseId, release.id);
        },
        with: {
          author: {
            columns: {
              name: true,
            },
            with: {
              image: {
                columns: {
                  id: true,
                },
              },
            },
          },
          image: {
            columns: {
              alt: true,
              id: true,
            },
          },
        },
      });

      return ok({ ...release, books });
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to read release:${options.params.dayOfWeek}.` }));
    }
  }
}

export const releaseRepository = new ReleaseRepository();
