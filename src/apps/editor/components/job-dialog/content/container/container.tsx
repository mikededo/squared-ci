import React from 'react';

import { VCol } from '@/aero';
import { JobDocs } from '@/editor/config';

import { ContainerCredentials } from './container-credentials';
import { ContainerImage } from './container-image';
import {
  ContainerEnv,
  ContainerOptions,
  ContainerPorts,
  ContainerVolumes,
} from './container-sets';
import { SectionHeader } from '../shared';

export const ContainerContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <SectionHeader
      title="Container"
      docs={JobDocs.jobContainer}
      subtitle="Define the container in which to run the each step. You can also specify each step's container."
    />
    <ContainerImage />
    <ContainerCredentials />
    <ContainerEnv />
    <ContainerPorts />
    <ContainerVolumes />
    <ContainerOptions />
  </VCol>
);
