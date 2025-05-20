'use client';

import { Check } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

const languages = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'russian', label: 'Russian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'german', label: 'German' },
  { value: 'french', label: 'French' },
  { value: 'italian', label: 'Italian' },
  { value: 'korean', label: 'Korean' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'vietnamese', label: 'Vietnamese' },
  { value: 'polish', label: 'Polish' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'persian', label: 'Persian' },
  { value: 'swahili', label: 'Swahili' },
  { value: 'thai', label: 'Thai' },
  { value: 'hebrew', label: 'Hebrew' },
  { value: 'malay', label: 'Malay' },
  { value: 'indonesian', label: 'Indonesian' },
  { value: 'greek', label: 'Greek' },
  { value: 'czech', label: 'Czech' },
  { value: 'urdu', label: 'Urdu' },
  { value: 'romanian', label: 'Romanian' },
  { value: 'ukrainian', label: 'Ukrainian' },
  { value: 'hungarian', label: 'Hungarian' },
  { value: 'tamil', label: 'Tamil' },
];

function LanguageDropdown({ setUserLanguage }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
        >
          {value
            ? languages.find((lang) => lang.value === value)?.label
            : 'Select language...'}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-full p-0 text-fontlight border-none">
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search language"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList className="mt-3">
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  className="text-fontlight data-[selected='true']:bg-purple"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setUserLanguage(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === lang.value
                        ? 'opacity-100 text-fontlight hover:text-black'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default LanguageDropdown;
