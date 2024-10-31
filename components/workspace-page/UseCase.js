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

function UseCase() {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <label className="text-sm font-medium text-left uppercase">
        specific use case
      </label>

      <Select>
        <SelectTrigger className="w-full h-14 bg-input rounded-full outline-none border-none">
          <SelectValue placeholder="Select use cases" />
        </SelectTrigger>
        <SelectContent className="bg-input text-fontlight border-none rounded-3xl max-w-[350px] w-full">
          <SelectGroup>
            <SelectLabel>Versions</SelectLabel>
            <SelectItem value="use case 1">use case 1</SelectItem>
            <SelectItem value="use case 2">use case 2</SelectItem>
            <SelectItem value="use case 3">use case 3</SelectItem>
            <SelectItem value="use case 4">use case 4</SelectItem>
            <SelectItem value="use case 5">use case 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default UseCase;
