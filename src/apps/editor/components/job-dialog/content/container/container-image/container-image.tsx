import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { Input, Label, Select } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useJobContainerImage } from '@/editor/stores';

import { ContainerImageItem } from './container-image-item';
import { SelectSkeleton } from './skeleton';
import { Section, SectionHeader } from '../../shared';
import { useDockerHub } from '../use-docker-hub';

export const ContainerImage: React.FC = () => {
  const jobId = useSelectedJobId();
  const { image, onChange } = useJobContainerImage(jobId ?? '');
  const [imageInputMethods, { onResetInput }] = useAdvancedInput(
    image ?? '',
    {},
  );
  const [searchInput, setSearchInput] = useAtom(useMemo(() => atom(''), []));
  const { data, isLoading } = useDockerHub(searchInput);

  const handleOnClick = (slug: string) => {
    onChange(slug);
    onResetInput(slug);
    setSearchInput(slug);
  };

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <Section>
      <SectionHeader
        title="Image"
        docs={JobDocs.jobContainerImage}
        subtitle="Image used to run the container"
        as="h5"
      />
      <Label>You can write the image:tag here directly</Label>
      <Input variant="plain" placeholder="node:latest" {...imageInputMethods} />
      <Label>Or you can search in Docker&apos;s repository</Label>
      <Select
        inputProps={{
          onChange: handleOnChangeSearch,
          variant: 'plain',
        }}
        loading={isLoading}
        defaultValue={searchInput}
        skeleton={SelectSkeleton}
        skeletonCount={5}
        maxHeight="max-h-64"
      >
        {data?.summaries?.map((summary) => (
          <ContainerImageItem
            key={summary.slug}
            summary={summary}
            onClick={handleOnClick}
          />
        )) ?? []}
      </Select>
    </Section>
  );
};
