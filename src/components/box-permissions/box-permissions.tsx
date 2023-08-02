import React, { useRef } from 'react';

import { Positions } from '@/config';
import { PermissionsList } from '@/domain/permissions';
import { Draggable, DraggableTitle, DraggableWrapper, VCol } from '@/sd';

import { Permission } from './box-permission';

export const BoxPermissions: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
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
            {PermissionsList.map((permission) => (
              <Permission key={permission} permission={permission} />
            ))}
          </VCol>
        )}
      />
    </DraggableWrapper>
  );
};
