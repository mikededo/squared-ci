import React from 'react';

import {
  Chip,
  ChipWrapper,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import type { ComplexTagsCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexTagsCustomizationKeys;
};

export const Tags: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerTag, getComplexTriggerTags } =
    useWorkflowTriggersStore();

  const tags = getComplexTriggerTags(trigger, false);
  const ignoredTags = getComplexTriggerTags(trigger, true);

  const [tagsMethods] = useAdvancedInput('', {
    tabCount: [0, tags.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerTag(trigger, value, false);
      onResetInput();
    },
  });
  const [ignoredMethods] = useAdvancedInput('', {
    tabCount: [0, ignoredTags.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerTag(trigger, value, true);
      onResetInput();
    },
  });

  const handleOnRemoveTag = (tag: string, ignore: boolean) => () => {
    toggleComplexTriggerTag(trigger, tag, ignore);
  };

  return (
    <VCol variant="md">
      <DraggableWrapper>
        <Label className="w-[280px]">Tags</Label>
        {tags.size > 0 ? (
          <ChipWrapper variant="left">
            {[...tags].map((tag) => (
              <Chip
                key={tag}
                text={tag}
                onClick={handleOnRemoveTag(tag, false)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type tag name" {...tagsMethods} />
        <Label className="w-[280px]">Ignored tags</Label>
        {ignoredTags.size > 0 ? (
          <ChipWrapper variant="left">
            {[...ignoredTags].map((tag) => (
              <Chip
                key={tag}
                text={tag}
                onClick={handleOnRemoveTag(tag, true)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type tag to ignore" {...ignoredMethods} />
      </DraggableWrapper>
    </VCol>
  );
};
