import { useHttp } from '@hooks/useHttp';

export function useTestAxios() {
  const [res, execute] = useHttp<{ data: { result: any } }>(
    {
      url: '/users',
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [execute, res] as const;
}
