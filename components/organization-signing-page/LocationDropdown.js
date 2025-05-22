"use client";

import { useState, useCallback, useMemo } from "react";
import { Check } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import debounce from "lodash.debounce";

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
import axios from "axios";

export function LocationDropdown({ locationInput }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Default locations
  const defaultLocations = [
    { value: "1", label: "Janpath Lane, Connaught Place, New Delhi, Delhi, 110001" },
    { value: "2", label: "Ahmadu Bello Way, Near Federal Secretariat, Abuja, FCT, 900001" },
    { value: "3", label: "Nanjing Road, Near People's Square, Huangpu District, Shanghai, 200001" },
    { value: "4", label: "George Street, Near Sydney Town Hall, Sydney, New South Wales, 2000" },
    { value: "5", label: "Gran Vía, Near Plaza de España, Madrid, 28013, Spain" },
  ];

  // Fetch locations from Google Places API (only if query is at least 3 characters)
  const fetchLocations = useCallback(async (query) => {
    if (!query || query.length < 3) {
      setLocations([]); // Reset locations when query is less than 3 characters
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);

    const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const apiKey = GOOGLE_PLACES_API_KEY; // Replace with your actual Google Places API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data.predictions;

      if (data && data.length > 0) {
        setLocations(
          data.map((location) => ({
            value: location.place_id,
            label: location.description,
          }))
        );
        setNoResults(false);
      } else {
        setNoResults(true);
        setLocations([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to fetch locations. Please try again.");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce API call to limit requests
  const debouncedFetch = useMemo(() => debounce(fetchLocations, 500), [fetchLocations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Location"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-[#0A0A0B]  hover:bg-[#0A0A0B]  border-none text-fontlight/80 hover:text-fontlight h-[56px] scrollbar-hide"
        >
          {value || "Select location..."}
          <FaCaretDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[482px] p-0 text-fontlight border-none"
        side="top"
        align="center"
      >
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll scrollbar-hide">
          <CommandInput
            placeholder="Search for location"
            aria-label="Search Location"
            className="border border-gray/20 rounded-[28px]"
            onChange={(e) => debouncedFetch(e.target.value)}
            aria-describedby="locationSearchHint"
          />
          <div id="locationSearchHint" className="sr-only">
            Start typing to search for locations.
          </div>

          <CommandList className="mt-3 scrollbar-hide">
            {/* Loading indicator */}
            {loading && <div className="text-fontlight">Loading...</div>}

            {/* Error message */}
            {error && <div className="text-red-500">{error}</div>}

            {/* No results found */}
            {noResults && !loading && (
              <CommandEmpty>
                <span>No locations found</span>
              </CommandEmpty>
            )}

            {/* Default locations (Shown when query is empty or less than 3 characters) */}
            {locations.length === 0 && !loading && !noResults && (
              <CommandGroup>
                {defaultLocations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    className="text-fontlight data-[selected='true']:bg-purple"
                    onSelect={() => {
                      setValue(location.label);
                      locationInput(location.label); // Send the selected location to parent
                      setOpen(false);
                    }}
                  >
                    {location.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === location.label
                          ? "opacity-100 text-fontlight hover:text-black"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Search result locations */}
            {locations.length > 0 && !loading && (
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    className="text-fontlight data-[selected='true']:bg-purple"
                    onSelect={() => {
                      setValue(location.label);
                      locationInput(location.label);
                      setOpen(false);
                    }}
                  >
                    {location.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === location.label
                          ? "opacity-100 text-fontlight hover:text-black"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
