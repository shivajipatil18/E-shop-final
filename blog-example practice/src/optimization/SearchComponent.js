import React, { useState, useTransition, Suspense } from "react";

const dummyData = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
];

const SearchResults = React.lazy(() => import("./SearchResults"));

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    startTransition(() => {
      const filteredResults = dummyData.filter((item) =>
        item.toLowerCase().includes(newQuery.toLowerCase())
      );
      setResults(filteredResults);
    });
  };

  return (
    <div>
      <h1 style={{ color: "green" }}>Concurent Rendering Example</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
      {isPending && <div>Loading...</div>}
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResults results={results} />
      </Suspense>
    </div>
  );
}

export default SearchComponent;
