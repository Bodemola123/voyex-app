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

export function LocationDropdown({ locationInput }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null); // State for API error
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [noResults, setNoResults] = useState(false); // State for handling no results

  // Default locations
  const defaultLocations = [
    { value: "1", label: "Janpath Lane, Connaught Place, New Delhi, Delhi, 110001" },
    { value: "2", label: "Ahmadu Bello Way, Near Federal Secretariat, Abuja, FCT, 900001" },
    { value: "3", label: "Nanjing Road, Near People's Square, Huangpu District, Shanghai, 200001" },
    { value: "4", label: "George Street, Near Sydney Town Hall, Sydney, New South Wales, 2000" },
    { value: "5", label: "Gran Vía, Near Plaza de España, Madrid, 28013, Spain" },
  ];

  // Fetch locations from TomTom API
  const fetchLocations = useCallback(async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null); // Reset error
    setNoResults(false); // Reset no results state

    const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY; // Use environment variable for the API key
    const url = `https://api.tomtom.com/search/2/search/${query}.json?key=${apiKey}&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        if (data.results.length === 0) {
          setNoResults(true);
        } else {
          setLocations(
            data.results.map((location) => ({
              value: location.id,
              label: location.address.freeformAddress,
            }))
          );
        }
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to fetch locations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the fetch call to avoid excessive API requests
  const debouncedFetch = useMemo(() => debounce(fetchLocations, 500), [fetchLocations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select Location"
          aria-expanded={open}
          className="w-full justify-between rounded-[28px] bg-card/30 hover:bg-card/30 border-none text-fontlight/80 hover:text-fontlight h-[56px]"
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
        <Command className="bg-black text-fontlight p-3 border-none max-h-[250px] overflow-y-scroll">
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

          <CommandList className="mt-3">
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

            {/* Default locations */}
            {locations.length === 0 && !loading && !noResults && (
              <CommandGroup>
                {defaultLocations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    className="text-fontlight data-[selected='true']:bg-purple"
                    onSelect={() => {
                      setValue(location.label); // Update the selected value
                      locationInput(location.label); // Update the organization location
                      setOpen(false); // Close the dropdown
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
            {locations.length > 0 && (
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    className="text-fontlight data-[selected='true']:bg-purple"
                    onSelect={() => {
                      setValue(location.label); // Update the selected value
                      locationInput(location.label); // Update the organization location
                      setOpen(false); // Close the dropdown
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
