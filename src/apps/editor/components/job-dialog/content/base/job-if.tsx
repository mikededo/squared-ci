import React from 'react';

import { Input, Label, Tag, TagWrapper, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobCondition } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

const IF_CONDITIONS = {
  repository: {
    text: 'On repository',
    value: "github.repository == '<repo-name>'",
  },
  schedule: {
    text: 'On schedule',
    value: "github.event_name == 'schedule'",
  },
  pullRequest: {
    text: 'On pull request',
    value: "github.event_name == 'pull_request'",
  },
  tagCreation: {
    text: 'On tag creation',
    value:
      "github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')",
  },
  pushToBranch: {
    text: 'On push to branch',
    value:
      "github.event_name == 'push' && github.ref == 'refs/heads/<branch-name>'",
  },
  statusSuccess: { text: 'Job status success', value: 'success()' },
  statusCancelled: { text: 'Job status cancelled', value: 'cancelled()' },
  statusFailure: { text: 'Job status failure', value: 'failure()' },
  statusAlways: { text: 'Job status always', value: 'always()' },
  specificEvents: {
    text: 'On specific event types',
    value:
      "github.event_name == 'issues' || github.event_name == 'pull_request'",
  },
  pushExcludeTags: {
    text: 'On push event (exclude tags)',
    value: "github.event_name == 'push' && github.ref_type != 'tag'",
  },
  pushSpecificAuthor: {
    text: 'On push event (specific author)',
    value: "github.event_name == 'push' && github.actor == 'username'",
  },
  pushExcludeBranch: {
    text: 'On push event (exclude specific branch)',
    value:
      "github.event_name == 'push' && github.ref != 'refs/heads/<excluded-branch>'",
  },
  forkedPullRequest: {
    text: 'On pull request from forked repository',
    value:
      "github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork == true",
  },
  pushSpecificPath: {
    text: 'On push event (specific path)',
    value:
      "github.event_name == 'push' && (contains(github.event.commits.*.added, 'path/to/your/file') || contains(github.event.commits.*.modified, 'path/to/your/file'))",
  },
  pullRequestSpecificBase: {
    text: 'On pull request event (specific base branch)',
    value:
      "github.event_name == 'pull_request' && github.event.pull_request.base.ref == '<base-branch>'",
  },
};

export const JobIf: React.FC = () => {
  const jobId = useSelectedJobId();
  const { condition, onChange } = useJobCondition(jobId ?? '');

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleOnClickTemplate = (value: string) => () => {
    onChange(value);
  };

  return (
    <Section>
      <SectionHeader
        title="If (conditon)"
        docs={JobDocs.jobIf}
        subtitle="Prevent a job from running unless this condition is met"
      />
      <Input
        variant="plain"
        placeholder="Job condition"
        value={condition}
        onChange={handleOnChangeInput}
        multiline
      />
      <VCol variant="md" align="center" expand>
        <Label>
          In need of inspiration? Here are some helpers to save you time
        </Label>
        <TagWrapper>
          {Object.entries(IF_CONDITIONS).map(([key, { text, value }]) => (
            <Tag key={key} text={text} onClick={handleOnClickTemplate(value)} />
          ))}
        </TagWrapper>
      </VCol>
    </Section>
  );
};
