import './ContactCardSkeleton.css';

function ContactCardSkeleton({ viewMode = 'grid', animationDelay = 0 }) {
  return (
    <div 
      className={`contact-card-skeleton ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {viewMode === 'grid' ? (
        <>
          {/* Grid view skeleton */}
          <div className="skeleton-avatar skeleton-shimmer"></div>
          <div className="skeleton-content">
            <div className="skeleton-name skeleton-shimmer"></div>
            <div className="skeleton-email skeleton-shimmer"></div>
            <div className="skeleton-phone skeleton-shimmer"></div>
            <div className="skeleton-tags">
              <div className="skeleton-tag skeleton-shimmer"></div>
              <div className="skeleton-tag skeleton-shimmer"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* List view skeleton */}
          <div className="skeleton-avatar-small skeleton-shimmer"></div>
          <div className="skeleton-info-section">
            <div className="skeleton-label skeleton-shimmer"></div>
            <div className="skeleton-name-list skeleton-shimmer"></div>
          </div>
          <div className="skeleton-info-section">
            <div className="skeleton-label skeleton-shimmer"></div>
            <div className="skeleton-email-list skeleton-shimmer"></div>
          </div>
          <div className="skeleton-info-section">
            <div className="skeleton-label skeleton-shimmer"></div>
            <div className="skeleton-phone-list skeleton-shimmer"></div>
          </div>
          <div className="skeleton-tags-list">
            <div className="skeleton-tag-small skeleton-shimmer"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactCardSkeleton;