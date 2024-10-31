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

function PrimaryPurpose() {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <label className="text-sm font-medium text-left uppercase">
        primary purpose
      </label>

      <Select>
        <SelectTrigger className="w-full h-14 bg-input rounded-full outline-none border-none">
          <SelectValue placeholder="Select purpose" />
        </SelectTrigger>
        <SelectContent className="bg-input text-fontlight border-none rounded-3xl max-w-[350px] w-full">
          <SelectGroup>
            <SelectLabel>Versions</SelectLabel>
            <SelectItem value="purpose 1">purpose 1</SelectItem>
            <SelectItem value="purpose 2">purpose 2</SelectItem>
            <SelectItem value="purpose 3">purpose 3</SelectItem>
            <SelectItem value="purpose 4">purpose 4</SelectItem>
            <SelectItem value="purpose 5">purpose 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default PrimaryPurpose;
