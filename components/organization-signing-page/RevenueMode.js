"use client";

import { Check } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const revenueModels = [
  { value: "sales", label: "Sales Revenue" },
  { value: "subscription", label: "Subscription" },
  { value: "freemium", label: "Freemium" },
  { value: "licensing", label: "Licensing" },
  { value: "advertising", label: "Advertising" },
  { value: "transactionFee", label: "Transaction Fee" },
  { value: "affiliate", label: "Affiliate" },
  { value: "data", label: "Data Revenue" },
  { value: "franchise", label: "Franchise" },
  { value: "commission", label: "Commission" },
  { value: "leasing", label: "Leasing" },
  { value: "crowdfunding", label: "Crowdfunding" },
  { value: "payPerUse", label: "Pay-Per-Use" },
  { value: "donation", label: "Donation" },
  { value: "auction", label: "Auction" },
  { value: "professionalServices", label: "Professional Services" },
];

export function RevenueMode({ revenueInput, initialValue = "" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const selectedRevenueModel = useMemo(
    () => revenueModels.find((model) => model.value === value)?.label,
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Revenue Model"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-white/80 hover:text-white h-[56px]"
        >
          {selectedRevenueModel || "Select revenue model..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 text-white border-none">
        <Command className="bg-black text-white p-3 border-none max-h-[250px] overflow-y-scroll">
          <CommandInput
            placeholder="Search for revenue model"
            aria-label="Search Revenue Model"
            className="border border-gray/20 rounded-[28px]"
          />
          <CommandList className="mt-3">
            <CommandEmpty>No revenue model found.</CommandEmpty>
            <CommandGroup>
              {revenueModels.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  className="text-white data-[selected='true']:bg-[#c088fb]"
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    revenueInput(newValue); // ✅ Send selected revenue model to parent
                    setOpen(false);
                  }}
                >
                  {model.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === model.value
                        ? "opacity-100 text-white hover:text-black"
                        : "opacity-0"
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
