import type { AppProps } from 'next/app';
import React from 'react';

import './globals.css';

const _App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default _App;
