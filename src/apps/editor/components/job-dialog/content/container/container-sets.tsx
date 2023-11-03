import React from 'react';

import { Chip, ChipWrapper, Input } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useJobContainerSet } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

const EnvRegex = /^([a-zA-Z0-9_]+)=(.+)$/;

type Props = {
  setKey: Parameters<typeof useJobContainerSet>[1];
  title: string;
  docs: string;
  subtitle: string;
  placeholder: string;
  inputOptions?: Pick<
    Parameters<typeof useAdvancedInput>[1],
    'disableSpaces' | 'preventUppercase' | 'spaceAsUnderscore' | 'numOnly'
  >;
  validateValue?: (value: string) => boolean;
};

export const ContainerSet: React.FC<Props> = ({
  setKey,
  title,
  docs,
  subtitle,
  placeholder,
  inputOptions,
  validateValue,
}) => {
  const jobId = useSelectedJobId();
  const {
    [setKey]: values,
    onAdd,
    onDelete,
  } = useJobContainerSet(jobId ?? '', setKey);

  const [methods, { onResetInput }] = useAdvancedInput('', {
    ...inputOptions,
    onEnterPress: (value, { onResetInput }) => {
      if (validateValue && !validateValue(value)) {
        return;
      }

      onAdd(value);
      onResetInput();
    },
  });

  const handleOnAddValue = () => {
    if (validateValue && !validateValue(methods.value)) {
      return;
    }

    onAdd(methods.value);
    onResetInput();
  };

  const handleOnClick = (value: string) => () => {
    onDelete(value);
  };

  return (
    <Section>
      <SectionHeader as="h5" title={title} docs={docs} subtitle={subtitle} />
      {values?.size ? (
        <ChipWrapper variant="left" expand>
          {[...values].map((value) => (
            <Chip
              key={value}
              text={value}
              onClick={handleOnClick(value)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Input
        variant="plain"
        {...methods}
        placeholder={placeholder}
        button="Add"
        buttonDisabled={!methods.value}
        onButtonClick={handleOnAddValue}
      />
    </Section>
  );
};

export const ContainerEnv: React.FC = () => {
  const validateValue = (value: string) => EnvRegex.test(value);

  return (
    <ContainerSet
      setKey="env"
      title="Env"
      docs={JobDocs.jobContainerEnv}
      subtitle="Sets a map of environment variables in the service container."
      placeholder="ENV_NAME=ENV_VALUE"
      validateValue={validateValue}
    />
  );
};
export const ContainerPorts: React.FC = () => (
  <ContainerSet
    setKey="ports"
    title="Ports"
    docs={JobDocs.jobContainerPorts}
    subtitle="Sets an array of ports to expose on the service container."
    placeholder="8080:80"
    inputOptions={{ preventUppercase: true, disableSpaces: true }}
  />
);

export const ContainerVolumes: React.FC = () => (
  <ContainerSet
    setKey="volumes"
    title="Volumes"
    docs={JobDocs.jobContainerVolumes}
    subtitle="Sets an array of volumes for the service container to use."
    placeholder="my_docker_volume:/volume_mount"
    inputOptions={{ preventUppercase: true }}
  />
);

export const ContainerOptions: React.FC = () => (
  <ContainerSet
    setKey="options"
    title="Options"
    docs={JobDocs.jobContainerOptions}
    subtitle="Additional Docker container resource options."
    placeholder="--annotation"
    inputOptions={{ preventUppercase: true, disableSpaces: true }}
  />
);
