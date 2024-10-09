import {uploadImages} from '@/api';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateImages(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOption,
  });
}

export default useMutateImages;
