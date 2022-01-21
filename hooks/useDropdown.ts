import { useFetchRawData } from './useFetchRawData';
import { SelectOption } from '../interfaces/SelectOption';

// Don't add table type in generic
export const useDropdown = <T extends unknown>(endpoint: string) => {
  const { rawData: dropdownData } = useFetchRawData<T[]>(endpoint);

  if (!dropdownData) {
    return [] as SelectOption[];
  }

  const newOptions: SelectOption[] = dropdownData.map((element) => (
    {
      label: element as string,
      value: element as string,
    }
  ));

  newOptions.unshift(({
    label: 'Wszystkie opcje',
    value: '',
  }));

  return newOptions;
};
