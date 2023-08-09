import React from 'react';

import { Chip, ChipWrapper, Input, Label, VCol } from '@/aero';
import type { ComplexTagsCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexTagsCustomizationKeys;
};

export const Tags: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerTag, getComplexTriggerTags } =
    useWorkflowTriggersStore();

  const tags = getComplexTriggerTags(trigger);

  const methods = useAdvancedInput('', {
    tabCount: [0, tags.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerTag(trigger, value);
      onResetInput();
    },
  });

  const handleOnRemoveTag = (tag: string) => () => {
    toggleComplexTriggerTag(trigger, tag);
  };

  return (
    <VCol variant="md">
      <Label className="w-[280px]">Tags</Label>
      {tags.size > 0 ? (
        <ChipWrapper variant="left">
          {[...tags].map((tag) => (
            <Chip
              key={tag}
              text={tag}
              onClick={handleOnRemoveTag(tag)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Input placeholder="Type tag name" {...methods} />
    </VCol>
  );
};
