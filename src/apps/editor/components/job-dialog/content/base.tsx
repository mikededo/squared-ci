import { QuestionIcon } from '@primer/octicons-react';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Input, Label, Row, Toggle, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';

type Props = {
  title: string;
  docs?: string;
  subtitle?: string;
};

// TODO:: Extract into shared component
const Section: React.FC<PropsWithChildren> = ({ children }) => (
  <VCol variant="md" expand>
    {children}
  </VCol>
);

const SectionHeader: React.FC<Props> = ({ title, docs, subtitle }) => (
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

const InputSection: React.FC<Props> = ({ title, docs, subtitle }) => (
  <Section>
    <SectionHeader title={title} subtitle={subtitle} docs={docs} />
    <Input placeholder="my_job_id" variant="plain" />
  </Section>
);

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <InputSection
      title="Job id"
      docs={JobDocs.jobId}
      subtitle="Job unique identifier"
    />
    <InputSection
      title="Job name"
      docs={JobDocs.jobName}
      subtitle="Name of the job that will be displayed in the GitHub UI"
    />
    <Section>
      <SectionHeader
        title="Needs"
        docs={JobDocs.jobNeeds}
        subtitle="Set up the job or list of jobs that must complete successfully before running this job"
      />
      <VCol variant="xs" expand>
        <p className="text-sm font-medium">Workflow jobs</p>
        <Label>
          You have not created any other job. Create other jobs and they will
          appear here.
        </Label>
      </VCol>
    </Section>
    {/* TODO: Add recommendations of if conditions */}
    <InputSection
      title="Job conditions (if)"
      docs={JobDocs.jobIf}
      subtitle="Prevent a job from running unless this condition is met"
    />
    <Section>
      <SectionHeader
        title="Environment"
        docs={JobDocs.jobEnv}
        subtitle="Define the environment that the job references"
      />
      <VCol expand>
        <p className="text-sm">Name</p>
        <Input placeholder="production_environment" variant="plain" />
      </VCol>
      <VCol expand>
        <p className="text-sm">Url (optional)</p>
        <Input placeholder="https://your-domain.com" variant="plain" />
      </VCol>
    </Section>
    <InputSection
      title="Timeout minutes"
      docs={JobDocs.jobTimeoutMinutes}
      subtitle="The maximum number of minutes to let a job run before it is automatically cancelled"
    />
    <Section>
      <SectionHeader
        title="Continue on error"
        docs={JobDocs.jobContinueOnError}
        subtitle="Prevents a workflow run from failing when a job fails."
      />
      <div className="w-full">
        <Toggle text="Enabled" value={false} onClick={console.log} />
      </div>
    </Section>
  </VCol>
);
