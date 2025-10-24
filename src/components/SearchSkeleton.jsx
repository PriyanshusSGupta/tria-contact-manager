import './SearchSkeleton.css';

function SearchSkeleton() {
  return (
    <div className="search-skeleton">
      <div className="search-bar-skeleton">
        <div className="search-icon-skeleton skeleton-shimmer"></div>
        <div className="search-input-skeleton skeleton-shimmer"></div>
      </div>
    </div>
  );
}

export default SearchSkeleton;