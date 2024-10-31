"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker() {
  const [date, setDate] = useState();

  return (
    <div className="w-1/2">
      <label className="text-sm font-medium mt-1 uppercase">release date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            // variant={"outline"}
            className={cn(
              "w-full h-14 justify-between text-left font-normal rounded-full bg-input hover:bg-input",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-input border-none">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="text-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
