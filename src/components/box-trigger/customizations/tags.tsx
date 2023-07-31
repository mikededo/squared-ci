import React from 'react';

import type { ComplexTagsCustomizationKeys } from '@/domain/trigger';
import { useAdvancedInput } from '@/hooks';
import { Chip, ChipWrapper, Input, VCol } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

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
      {/* TODO: Extract into specific component in SD */}
      <p className="font-mono italic text-xs text-gray-400">Tags</p>
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
