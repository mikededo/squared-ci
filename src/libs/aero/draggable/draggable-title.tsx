import { KebabHorizontalIcon, QuestionIcon } from '@primer/octicons-react';
import React from 'react';

import { DraggableWrapper, IconButton, Row } from '@/aero';

type Props = {
  title: string;
  docsHref?: string;
  onExpand?: React.MouseEventHandler<HTMLButtonElement>;
};

export const DraggableTitle = React.forwardRef<HTMLDivElement, Props>(
  ({ title, docsHref, onExpand }, ref) => (
    <DraggableWrapper>
      <div ref={ref} className="flex justify-between w-100 px-3 py-1.5">
        <DraggableWrapper>
          <p className="font-semibold">{title}</p>
          <Row variant="md" align="center">
            {docsHref ? (
              <a
                href={docsHref}
                target="_blank"
                rel="noopener"
                className="flex"
              >
                <QuestionIcon className="hover:fill-extra transition-colors" />
              </a>
            ) : null}
            {onExpand ? (
              <IconButton
                variant="plain"
                className="h-6 w-6"
                onClick={onExpand}
              >
                <KebabHorizontalIcon />
              </IconButton>
            ) : null}
          </Row>
        </DraggableWrapper>
      </div>
    </DraggableWrapper>
  ),
);
