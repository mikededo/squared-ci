import React from 'react';

type Props = { children: React.ReactNode };

const DataDraggableName = 'data-draggable';

export type DataDraggable = { 'data-draggable'?: boolean };

export const isEventFromDataDraggable = (e: React.MouseEvent) =>
  e.target instanceof Element && e.target.getAttribute(DataDraggableName);

export const DraggableWrapper: React.FC<Props> = ({ children }) => (
  <>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, { ...child.props, 'data-draggable': true })
        : undefined,
    )}
  </>
);
