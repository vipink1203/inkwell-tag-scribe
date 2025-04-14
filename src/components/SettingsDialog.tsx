import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/context/SettingsContext';
import { SettingsUpdate } from '@/types/settings';
import { Settings } from 'lucide-react';

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps = {}) => {
  const { settings, isLoading, updateSettings, resetSettings } = useSettings();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState<SettingsUpdate>({});

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled 
    ? onOpenChange 
    : setInternalOpen;

  React.useEffect(() => {
    if (settings && isOpen) {
      setFormValues({
        theme: settings.theme,
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
        lineHeight: settings.lineHeight,
        showLineNumbers: settings.showLineNumbers,
        autoSave: settings.autoSave,
        saveInterval: settings.saveInterval,
      });
    }
  }, [settings, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateSettings(formValues);
    setIsOpen(false);
  };

  const handleReset = async () => {
    await resetSettings();
    setIsOpen(false);
  };

  if (isLoading || !settings) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your note-taking experience
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">
              Theme
            </Label>
            <RadioGroup
              id="theme"
              className="col-span-3"
              value={formValues.theme}
              onValueChange={(value) => handleChange('theme', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fontFamily" className="text-right">
              Font
            </Label>
            <Input
              id="fontFamily"
              className="col-span-3"
              value={formValues.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fontSize" className="text-right">
              Font Size
            </Label>
            <Input
              id="fontSize"
              className="col-span-3"
              type="number"
              min="10"
              max="32"
              value={formValues.fontSize}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value, 10))}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lineHeight" className="text-right">
              Line Height
            </Label>
            <Input
              id="lineHeight"
              className="col-span-3"
              type="number"
              min="1"
              max="3"
              step="0.1"
              value={formValues.lineHeight}
              onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="showLineNumbers" className="text-right">
              Line Numbers
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch
                id="showLineNumbers"
                checked={formValues.showLineNumbers}
                onCheckedChange={(checked) => handleChange('showLineNumbers', checked)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autoSave" className="text-right">
              Auto Save
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch
                id="autoSave"
                checked={formValues.autoSave}
                onCheckedChange={(checked) => handleChange('autoSave', checked)}
              />
            </div>
          </div>
          
          {formValues.autoSave && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="saveInterval" className="text-right">
                Save Interval (s)
              </Label>
              <Input
                id="saveInterval"
                className="col-span-3"
                type="number"
                min="5"
                max="300"
                value={formValues.saveInterval}
                onChange={(e) => handleChange('saveInterval', parseInt(e.target.value, 10))}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
