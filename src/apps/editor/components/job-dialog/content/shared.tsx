import { QuestionIcon } from '@primer/octicons-react';
import React from 'react';
import type { PropsWithChildren } from 'react';

import { AppearTransition, Label, Row, VCol } from '@/aero';

type SectionProps = {
  title: string;
  docs?: string;
  subtitle?: string;
  headerLabel?: string;
  as?: 'h4' | 'h5';
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
  headerLabel,
  as: Header = 'h4',
}) => (
  <VCol variant="xs" expand>
    <Row align="center" justify="between" expand>
      <Row align="center" variant="md">
        <Header className={Header === 'h4' ? 'font-semibold text-lg' : 'font-semibold' }>{title}</Header>
        <AppearTransition show={!!headerLabel} as={React.Fragment}>
          <span className="bg-extra text-[8px] px-2 rounded-full text-extra-foreground font-mono font-semibold uppercase">
            Active
          </span>
        </AppearTransition>
      </Row>
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
