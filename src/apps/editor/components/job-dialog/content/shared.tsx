import { QuestionIcon } from '@primer/octicons-react';
import React from 'react';
import type { PropsWithChildren } from 'react';

import { Label, Row, VCol } from '@/aero';

type SectionProps = {
  title: string;
  docs?: string;
  subtitle?: string;
};

export const Section: React.FC<PropsWithChildren> = ({ children }) => (
  <VCol variant="md" expand>
    {children}
  </VCol>
);

export const SectionHeader: React.FC<SectionProps> = ({
  title,
  docs,
  subtitle,
}) => (
  <VCol variant="xs" expand>
    <Row align="center" justify="between" expand>
      <p className="font-semibold">{title}</p>
      {docs ? (
        <a
          href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id"
          target="_blank"
          rel="noopener"
          className="flex"
        >
          <QuestionIcon className="hover:fill-extra transition-colors" />
        </a>
      ) : null}
    </Row>
    {subtitle ? <Label>{subtitle}</Label> : null}
  </VCol>
);
