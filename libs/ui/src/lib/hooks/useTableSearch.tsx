import { useEffect, useMemo, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export const useTableSearch = <T,>(data: T[], filterFn: (item: T, searchTerm: string) => boolean) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [isSearchTerm, setIsSearchTerm] = useState<boolean>(false);

  const searchSubject = useMemo(() => new Subject<string>(), []);

  useEffect(() => {
    const subscription = searchSubject.pipe(debounceTime(500)).subscribe((term) => {
      const lowerTerm = term.toLowerCase();
      const filtered = data.filter((item) => filterFn(item, lowerTerm));
      setFilteredData(filtered);
      setIsSearchTerm(term.length > 0);
    });

    return () => subscription.unsubscribe();
  }, [data, searchSubject, filterFn]);

  useEffect(() => {
    searchSubject.next(searchTerm);
  }, [searchTerm, searchSubject]);

  return { searchTerm, setSearchTerm, isSearchTerm, filteredData };
};
