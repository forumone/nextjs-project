import Constrain from '../source/02-layouts/Constrain/Constrain';

const withGlobalWrapper = Story => (
  <Constrain modifierClasses="spaced-4">
    <Story />
  </Constrain>
);

export { withGlobalWrapper };
