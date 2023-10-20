import { BrowserIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { AppearTransition, IconButton, Row, VCol } from '@/aero';
import type { ExtraColors } from '@/chain';
import { useExtraModifier } from '@/chain';

const COLORS: Record<ExtraColors, `bg-extra-${ExtraColors}`> = {
  default: 'bg-extra-default',
  red: 'bg-extra-red',
  orange: 'bg-extra-orange',
  green: 'bg-extra-green',
  purple: 'bg-extra-purple',
  magenta: 'bg-extra-magenta',
};

type Props = {
  active: boolean;
  color: ExtraColors;
  colorClass: `bg-extra-${ExtraColors}`;
  onClick: (color: ExtraColors) => void;
};

const ExtraButton: React.FC<Props> = ({
  active,
  color,
  colorClass,
  onClick,
}) => {
  const parsedColorClass =
    colorClass === 'bg-extra-default' ? 'bg-extra-def' : colorClass;

  const handleOnClick = () => {
    onClick(color);
  };

  return (
    <button
      className={twMerge(
        'h-4 w-4 rounded-full transition-all ring-2 ring-transparent ring-offset-2 ring-offset-transparent',
        parsedColorClass,
        active && 'ring-offset-white dark:ring-offset-background ring-extra',
      )}
      onClick={handleOnClick}
    />
  );
};

export const ExtraColorOption: React.FC = () => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));
  const { extra, onExtraChange } = useExtraModifier();

  const handleOnClick = () => {
    setOpened((prev) => !prev);
  };

  const handleOnColorChange = (newExta: ExtraColors) => {
    if (newExta === extra) {
      return;
    }
    onExtraChange(newExta);
  };

  return (
    <>
      <IconButton
        className="!p-2"
        selected={opened}
        onClick={handleOnClick}
        tooltip="Change primary color"
      >
        <BrowserIcon />
      </IconButton>
      <AppearTransition as={React.Fragment} show={opened}>
        <VCol className="absolute transition-all top-14 bg-card p-3 pt-1.5 pb-4 border rounded-lg translate-x-1/4 gap-2">
          <p className="font-semibold">Primary color</p>
          <Row className="w-full gap-4">
            {Object.entries(COLORS).map(([color, colorClass]) => (
              <ExtraButton
                key={color}
                active={color === extra}
                color={color as ExtraColors}
                colorClass={colorClass}
                onClick={handleOnColorChange}
              />
            ))}
          </Row>
        </VCol>
      </AppearTransition>
    </>
  );
};
