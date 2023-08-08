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
import { useOptionalSection, useWorkflowPermissions } from '@/stores';

import { Permission } from './box-permission';

// The content needs to be in a separated content as the visible and
// invisible render functions of Draggable are memoized and the component
// would not re-render on workflow permissions change
export const PermissionsContent = React.forwardRef<HTMLDivElement>((_, ref) => {
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

  return (
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
  );
});

export const BoxPermissions: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const { osPermissions } = useOptionalSection('osPermissions');

  return osPermissions ? (
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
        invisible={({ ref }) => <PermissionsContent ref={ref} />}
      />
    </DraggableWrapper>
  ) : null;
};
