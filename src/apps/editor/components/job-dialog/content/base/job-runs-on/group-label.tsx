import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { Button, Input, Row, VCol } from '@/aero';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobRunsOnActive, useJobRunsOnGroup } from '@/editor/stores';

import { SectionHeader } from '../../shared';

export const GroupLabel: React.FC = () => {
  const jobId = useSelectedJobId();
  const { group, onChangeGroup, onChangeLabel, onClear } = useJobRunsOnGroup(
    jobId ?? '',
  );
  const active = useJobRunsOnActive(jobId ?? '') === 'group';

  const [groupValue, setGroupValue] = useAtom(
    useMemo(() => atom(group?.group), [group?.group]),
  );
  const [labelValue, setLabelValue] = useAtom(
    useMemo(() => atom(group?.label), [group?.label]),
  );

  const handleOnBlur =
    (cb: typeof onChangeLabel | typeof onChangeGroup) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      cb(e.currentTarget.value);
    };

  const handleOnChange =
    (cb: typeof setGroupValue | typeof setLabelValue) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      cb(e.currentTarget.value);
    };

  const disableClear = !group?.group && !group?.label;

  return (
    <>
      <SectionHeader
        as="h5"
        title="Group and label"
        subtitle="Specify the group and label of runners."
        headerLabel={active ? 'Active' : undefined}
      />
      <Row expand>
        <VCol expand>
          <p className="text-xs font-semibold">Group</p>
          <Input
            variant="plain"
            value={groupValue}
            placeholder="ubuntu-runners"
            onChange={handleOnChange(setGroupValue)}
            onBlur={handleOnBlur(onChangeGroup)}
          />
        </VCol>
        <VCol expand>
          <p className="text-xs font-semibold">Label</p>
          <Input
            variant="plain"
            value={labelValue}
            placeholder="ubuntu-20.04-16core"
            onChange={handleOnChange(setLabelValue)}
            onBlur={handleOnBlur(onChangeLabel)}
          />
        </VCol>
      </Row>
      <Button
        variant="text"
        className="self-end"
        disabled={disableClear}
        onClick={onClear}
        condensed
      >
        Clear
      </Button>
    </>
  );
};
