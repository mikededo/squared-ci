/* eslint-disable @next/next/no-img-element */
import { DownloadIcon, StarIcon } from '@primer/octicons-react';
import React from 'react';

import { Row, VCol } from '@/aero';
import type { Summary } from '@/editor/domain/docker';

import { ImageSkeleton } from './skeleton';

type Props = {
  summary: Summary;
  onClick: (slug: string) => void;
};

export const ContainerImageItem: React.FC<Props> = ({ summary, onClick }) => {
  const {
    slug,
    publisher,
    logo_url: { small, large },
    pull_count,
    star_count,
  } = summary;

  const handleOnClick = () => {
    onClick(summary.slug);
  };

  return (
    <button className="w-full" onClick={handleOnClick}>
      <Row
        variant="lg"
        align="center"
        className="px-4 py-2 text-sm cursor-pointer hover:bg-muted-hover transition-colors"
        expand
      >
        {large || small ? (
          <img
            alt={`${slug} logo`}
            src={large ?? small}
            className="h-full w-8 rounded-sm bg-muted"
          />
        ) : (
          <ImageSkeleton />
        )}
        <VCol variant="none" expand>
          <Row className="text-xs" justify="between" expand>
            <p className="m-0">{slug}</p>
            <Row align="center">
              <DownloadIcon size={10} />
              <p>{pull_count}</p>
            </Row>
          </Row>
          <Row className="text-xs" justify="between" expand>
            <p>{publisher.name}</p>
            <Row align="center">
              <StarIcon size={10} />
              <p>{star_count}</p>
            </Row>
          </Row>
        </VCol>
      </Row>
    </button>
  );
};
