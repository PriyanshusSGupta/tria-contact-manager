import SearchSkeleton from './SearchSkeleton.jsx';
import ContactCardSkeleton from './ContactCardSkeleton.jsx';
import './LoadingSkeleton.css';

function LoadingSkeleton({ viewMode = 'grid' }) {
  // Generate skeleton cards with staggered animation delays
  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <ContactCardSkeleton 
      key={index}
      viewMode={viewMode}
      animationDelay={index * 0.1}
    />
  ));

  return (
    <div className="loading-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title skeleton-shimmer"></div>
      </div>
      
      <SearchSkeleton />
      
      <div className="skeleton-filters">
        <div className="skeleton-filter-group">
          <div className="skeleton-filter skeleton-shimmer"></div>
          <div className="skeleton-filter skeleton-shimmer"></div>
          <div className="skeleton-filter skeleton-shimmer"></div>
        </div>
        <div className="skeleton-view-controls">
          <div className="skeleton-control skeleton-shimmer"></div>
          <div className="skeleton-control skeleton-shimmer"></div>
        </div>
      </div>
      
      <div className="skeleton-count">
        <div className="skeleton-count-text skeleton-shimmer"></div>
      </div>
      
      <div className={`skeleton-contacts ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {skeletonCards}
      </div>
    </div>
  );
}

export default LoadingSkeleton;