import React from 'react';

import { Label } from '@/aero';

import { DialogMenuItem } from './dialog-menu-item';

export const DialogMenu: React.FC = () => (
  <>
    <p className="text-lg font-semibold p-4 pl-6 min-h-[64px] flex items-end">
      Properties
    </p>
    <div className="pl-4">
      <Label className="mt-1 pl-2 mb-3">
        Customise the properties of the job &quot;job-name&quot;. You can check
        the help section if you are lost!
      </Label>
      <ul className="flex flex-col w-full gap-2">
        <DialogMenuItem paramValue="b">
          <p>Base</p>
          <p className="text-xs mb-0.5">
            Name, needs, if, runs-on, environment, uses, timeout minutes, with,
            continue on error
          </p>
        </DialogMenuItem>
        <DialogMenuItem paramValue="p">Permissions</DialogMenuItem>
        <DialogMenuItem paramValue="coc">Concurrency</DialogMenuItem>
        <DialogMenuItem paramValue="o">Outputs</DialogMenuItem>
        <DialogMenuItem paramValue="e">Env</DialogMenuItem>
        <DialogMenuItem paramValue="d">Defaults</DialogMenuItem>
        <DialogMenuItem paramValue="ste">Steps</DialogMenuItem>
        <DialogMenuItem paramValue="str">Strategy</DialogMenuItem>
        <DialogMenuItem paramValue="con">Container</DialogMenuItem>
        <DialogMenuItem paramValue="ser">Services</DialogMenuItem>
        <DialogMenuItem paramValue="h">Help</DialogMenuItem>
      </ul>
    </div>
  </>
);
