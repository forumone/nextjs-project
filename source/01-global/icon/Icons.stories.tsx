import { Meta, StoryObj } from '@storybook/nextjs';
import Icon from './Icon';
import iconManifest from './manifest';

const meta: Meta = {
  title: 'Global/Icons',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    isHidden: {
      type: 'boolean',
      description: 'True if the icon should be hidden from screenreaders.',
    },
    title: {
      type: 'string',
      description:
        'Text label for icon to be read by screenreaders. Must be included if isHidden is false.',
    },
  },
};

const Icons: StoryObj = {
  render: () => {
    const names = Object.keys(iconManifest) as (keyof typeof iconManifest)[];
    return (
      <>
        {names.map(name => (
          <p key={name}>
            <Icon name={name} isHidden={false} title={name} /> {name}
          </p>
        ))}
      </>
    );
  },
};

export default meta;
export { Icons };
