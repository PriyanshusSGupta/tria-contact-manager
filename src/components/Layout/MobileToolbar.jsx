import { Grid3X3, List, Filter, SortAsc, SortDesc, Star } from 'lucide-react';
import './MobileToolbar.css';

function MobileToolbar({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  showFavorites,
  onToggleFavorites
}) {
  const getSortIcon = () => {
    switch (sortBy) {
      case 'name': return <SortAsc size={18} />;
      case 'name-desc': return <SortDesc size={18} />;
      case 'recent': return <SortAsc size={18} />;
      case 'recent-desc': return <SortDesc size={18} />;
      case 'frequency': return <SortAsc size={18} />;
      case 'frequency-desc': return <SortDesc size={18} />;
      default: return <SortAsc size={18} />;
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'name': return 'A-Z';
      case 'name-desc': return 'Z-A';
      case 'recent': return 'New';
      case 'recent-desc': return 'Old';
      case 'frequency': return 'Popular';
      case 'frequency-desc': return 'Rare';
      default: return 'A-Z';
    }
  };

  const cycleSortOrder = () => {
    const sortCycle = ['name', 'name-desc', 'recent', 'recent-desc', 'frequency', 'frequency-desc'];
    const currentIndex = sortCycle.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortCycle.length;
    onSortChange(sortCycle[nextIndex]);
  };
  return (
    <div className="mobile-toolbar">
      {/* View Controls */}
      <div className="mobile-view-controls">
        <button
          className={`mobile-view-button ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
          title="Grid view"
        >
          <Grid3X3 size={18} />
        </button>
        <button
          className={`mobile-view-button ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => onViewModeChange('list')}
          title="List view"
        >
          <List size={18} />
        </button>
      </div>

      {/* Favorites Button */}
      <button
        className={`mobile-favorites-button ${showFavorites ? 'active' : ''}`}
        onClick={onToggleFavorites}
        title={showFavorites ? 'Show all contacts' : 'Show favorites only'}
      >
        <Star size={18} />
        <span className="favorites-label">{showFavorites ? 'All' : 'Fav'}</span>
      </button>

      {/* Sort Button */}
      <button
        className="mobile-sort-button"
        onClick={cycleSortOrder}
        title={`Sort: ${getSortLabel()}`}
      >
        {getSortIcon()}
        <span className="sort-label">{getSortLabel()}</span>
      </button>

      {/* Filter Button */}
      <button
        className={`mobile-filter-button ${showFilters ? 'active' : ''}`}
        onClick={onToggleFilters}
        title="Filters"
      >
        <Filter size={18} />
      </button>
    </div>
  );
}

export default MobileToolbar;