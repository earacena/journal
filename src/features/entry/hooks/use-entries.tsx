import { useContext } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { UserCredentialContext } from '@/features/auth';
import { entryService } from '../api/entry.service';
import type { Entries } from '../types/entry.types';

export function useEntries(): UseQueryResult<Entries> {
  const authUser = useContext(UserCredentialContext);

  const validAuth: boolean =
    authUser?.userId !== null && authUser?.token !== null;

  const entriesQuery = useQuery({
    queryKey: ['entries', authUser?.userId, authUser?.token],
    queryFn: async () =>
      entryService.findEntriesByUserId({
        userId: authUser?.userId ?? null,
        token: authUser?.token ?? null,
      }),
    enabled: validAuth,
  });

  return entriesQuery;
}
