import {getPost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {useQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

function useGetPost(
  id: number | null,
  queryOption?: useQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOption,
  });
}

export default useGetPost;
