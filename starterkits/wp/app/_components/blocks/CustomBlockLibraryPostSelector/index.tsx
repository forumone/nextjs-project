import { CustomBlockLibraryPostSelectorFragmentFragment } from '@/types/__generated__/graphql';
import fragments from './fragments';

function CustomBlockLibraryPostSelector({
  post,
}: CustomBlockLibraryPostSelectorFragmentFragment): JSX.Element {
  const imgSrc = post?.featuredImage?.node.sourceUrl;
  return (
    <div>
      <div>CustomBlockLibraryPostSelector</div>
      {post ? <h3>{post.title}</h3> : <strong>No post selected.</strong>}
      {imgSrc ? <img alt="" src={imgSrc} /> : null}
    </div>
  );
}

CustomBlockLibraryPostSelector.config = {
  name: 'CustomBlockLibraryPostSelector',
};
CustomBlockLibraryPostSelector.displayName = 'CustomBlockLibraryPostSelector';
CustomBlockLibraryPostSelector.fragments = fragments;

export default CustomBlockLibraryPostSelector;
