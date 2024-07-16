import { NextSearchParamsProp } from '@/types/wp/NextSearchParams';

export function hasPreviewProps(props: NextSearchParamsProp) {
  return props?.searchParams?.preview === 'true' && !!props?.searchParams?.p;
}
