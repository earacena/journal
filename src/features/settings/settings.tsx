import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function Settings(): JSX.Element {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center w-80">
      <h2 className="text-4xl font-bold my-3 underline">Settings</h2>
      <ul className="flex flex-col m-3">
        <li className="flex flex-row w-80">
          Dark Theme
          <Switch
            checked={darkModeEnabled}
            className="ml-auto"
            onCheckedChange={(checked: boolean) => {
              setDarkModeEnabled(checked);
            }}
          />
        </li>
      </ul>
    </div>
  );
}
