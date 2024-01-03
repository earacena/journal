import { zErrorResponse, type ServiceProps } from '@/common.types';
import { AuthError } from '@/utils/errors';
import type { Entries } from '../types/entry.types';
import { zEntriesFetchByUserIdResponse } from '../types/entry.types';

type FindEntriesByUserIdProps = ServiceProps;

async function findEntriesByUserId({
  userId,
  token,
}: FindEntriesByUserIdProps): Promise<Entries> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch('/Api/Entries/User/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json());
    throw new AuthError(errorResponse.errorMessage);
  }

  const userEntriesResponse = zEntriesFetchByUserIdResponse.parse(
    await response.json(),
  );

  return userEntriesResponse.data.userEntries;
}

export const entryService = {
  findEntriesByUserId,
};
