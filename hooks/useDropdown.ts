import { useFetchRawData } from "./useFetchRawData";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "../interfaces/SelectOption";

// Don't add table type in generic
export const useDropdown = <T extends unknown>(endpoint: string) => {
  const { rawData: dropdownData } = useFetchRawData<T[]>(endpoint);
  const [dropdownOptions, setDropdownOptions] = useState<SelectOption[]>();

  const mapIntoLabelValue = useCallback(() => {
    if (dropdownData) {
      const newOptions = dropdownData.map((element) => (
        { label: element as string, value: element as string }
      ));
      newOptions.unshift(({ label: 'Wszystkie opcje', value: '' }))
      setDropdownOptions(newOptions);
    }
  }, [dropdownData, setDropdownOptions]);

  useEffect(() => {
    mapIntoLabelValue();
  }, [mapIntoLabelValue]);

  return dropdownOptions;
};
