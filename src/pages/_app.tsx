import type { AppProps } from 'next/app';
import React from 'react';

import './globals.css';

export default function ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
