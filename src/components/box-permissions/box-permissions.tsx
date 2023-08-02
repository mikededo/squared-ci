import React, { useRef } from 'react';

import { Positions } from '@/config';
import type { Permissions } from '@/domain/permissions';
import {
  Draggable,
  DraggableTitle,
  DraggableWrapper,
  Toggle,
  VCol,
} from '@/sd';
import { useFeatureSwitch, useWorkflowPermissions } from '@/stores';

import { Permission } from './box-permission';

export const BoxPermissions: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const { fsWorkflowPermissions } = useFeatureSwitch('fsWorkflowPermissions');
  const {
    permissions,
    disableAll,
    readAll,
    writeAll,
    toggleDisableAll,
    toggleWriteAll,
    toggleReadAll,
    togglePermission,
  } = useWorkflowPermissions();

  return fsWorkflowPermissions ? (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxPermissionsX}
        initialY={Positions.BoxPermissionsY}
        visible={({ ref, onExpand }) => (
          <DraggableWrapper>
            <div ref={ref}>
              <DraggableTitle title="Permissions" onExpand={onExpand} />
            </div>
          </DraggableWrapper>
        )}
        invisible={({ ref }) => (
          <VCol ref={ref} className="relative px-3 pb-3">
            <Toggle
              text="Read all"
              value={readAll}
              onClick={toggleReadAll}
              condensed
            />
            <Toggle
              text="Write all"
              value={writeAll}
              onClick={toggleWriteAll}
              condensed
            />
            <Toggle
              text="Disable all"
              value={disableAll}
              onClick={toggleDisableAll}
              condensed
            />
            {Object.entries(permissions).map(([permission, statuses]) => (
              <Permission
                key={permission}
                permission={permission as Permissions}
                statuses={statuses}
                onClick={togglePermission}
              />
            ))}
          </VCol>
        )}
      />
    </DraggableWrapper>
  ) : null;
};
