"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function VersionNumber() {
  return (
    <div className="flex flex-col gap-1 w-1/2">
      <label className="text-sm font-medium mt-1 text-left uppercase">
        version number
      </label>

      <Select>
        <SelectTrigger className="w-full h-14 bg-input rounded-full outline-none border-none">
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent className="bg-input text-fontlight border-none rounded-3xl">
          <SelectGroup>
            <SelectLabel>Versions</SelectLabel>
            <SelectItem value="v1.0">v1.0</SelectItem>
            <SelectItem value="v1.5">v1.5</SelectItem>
            <SelectItem value="v2">v2</SelectItem>
            <SelectItem value="v2.1">v2.1</SelectItem>
            <SelectItem value="v2.1.2">v2.1.2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default VersionNumber;
