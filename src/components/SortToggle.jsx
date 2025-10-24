import './SortToggle.css';

function SortToggle({ sortOrder, onSortChange }) {
  const handleToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(newOrder);
  };

  return (
    <button
      className={`sort-toggle ${sortOrder}`}
      onClick={handleToggle}
      title={`Sort ${sortOrder === 'asc' ? 'Z-A' : 'A-Z'}`}
      aria-label={`Sort contacts ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 6h18M7 12h10m-7 6h4"></path>
        {sortOrder === 'asc' ? (
          <path d="M8 18l4-4 4 4"></path>
        ) : (
          <path d="M8 6l4 4 4-4"></path>
        )}
      </svg>
      <span className="sort-label">
        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </span>
    </button>
  );
}

export default SortToggle;