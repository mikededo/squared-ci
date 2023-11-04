import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { Button, Input, Row, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobContainerCredentials } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const ContainerCredentials: React.FC = () => {
  const jobId = useSelectedJobId();
  const { credentials, onChangeName, onChangePassword } =
    useJobContainerCredentials(jobId ?? '');
  const [showPassword, setShowPassword] = useAtom(
    useMemo(() => atom(false), []),
  );

  const [nameValue, setNameValue] = useAtom(
    useMemo(() => atom(credentials?.name), [credentials?.name]),
  );
  const [passwordValue, setPasswordValue] = useAtom(
    useMemo(() => atom(credentials?.password), [credentials?.password]),
  );

  const handleOnBlur =
    (cb: typeof onChangeName | typeof onChangePassword) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      cb(e.currentTarget.value);
    };

  const handleOnChange =
    (cb: typeof setNameValue | typeof setPasswordValue) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      cb(e.currentTarget.value);
    };

  const handleOnClear = () => {
    onChangeName('');
    onChangePassword('');
  };

  const handleOnToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const disableClear = !credentials?.name && !credentials?.password;

  return (
    <Section>
      <SectionHeader
        as="h5"
        title="Registry credentials"
        docs={JobDocs.jobContainerCredentials}
        subtitle="If the image's container requires authentication to pull the image, specify the credentials here."
      />
      <Row expand>
        <VCol expand>
          <p className="text-xs font-semibold">Username</p>
          <Input
            variant="plain"
            value={nameValue}
            placeholder="username"
            onChange={handleOnChange(setNameValue)}
            onBlur={handleOnBlur(onChangeName)}
          />
        </VCol>
        <VCol expand>
          <p className="text-xs font-semibold">Password</p>
          <Input
            variant="plain"
            value={passwordValue}
            type={showPassword ? 'text' : 'password'}
            placeholder="**********"
            onChange={handleOnChange(setPasswordValue)}
            onBlur={handleOnBlur(onChangePassword)}
            icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            onIconClick={handleOnToggleShowPassword}
          />
        </VCol>
      </Row>
      <Button
        variant="text"
        className="self-end"
        disabled={disableClear}
        onClick={handleOnClear}
        condensed
      >
        Clear
      </Button>
    </Section>
  );
};
