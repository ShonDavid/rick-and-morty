import {
  useCallback,
  type FunctionComponent,
  type ChangeEvent,
  useState,
} from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchBar: FunctionComponent<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    debounce((value: unknown) => {
      onSearch(value as string);
    }, 500),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search characters by name..."
          className="search-bar__input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
