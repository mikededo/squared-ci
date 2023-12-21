import React from 'react';

import { Label } from '@/aero';
import { JobDocs } from '@/editor/config';

import { CustomValues } from './custom-values';
import { GithubRunners } from './github-runners';
import { GroupLabel } from './group-label';
import { Section, SectionHeader } from '../../shared';

export const JobRunsOn: React.FC = () => (
  <Section>
    <SectionHeader
      title="Runs on"
      docs={JobDocs.jobRunsOn}
      subtitle="Specify in which machine type will the workflow be executed"
    />
    <Label className="mb-1.5">
      GitHub allows you to setup the configuration for the machin in multiple
      ways. Check the documentation for more information. In this case, the
      generator will allow you to define them all.
      <br />
      However, there&apos;s an established order of priority withing the
      builder: GitHub runners, your custom values and group/label pair.
    </Label>
    <GithubRunners />
    <CustomValues />
    <GroupLabel />
  </Section>
);
