import StrawberryIcon from '@images/strawberry.component.svg';
import React from 'react';

import { stylesImage } from './App.module.scss';

export const App = (): React.ReactElement => (
  <div>
    <h1>
      Here is my React embedded content.{' '}
      <StrawberryIcon className={stylesImage} />
    </h1>
  </div>
);
