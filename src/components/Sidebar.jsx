import React, { useMemo } from 'react'

const Sidebar = ({ photos, currentQuery, onSearch }) => {
    const tags = useMemo(() => {
        const freq = {};
        photos.forEach(photo =>
            photo.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(tag => {
                freq[tag] = (freq[tag] || 0) + 1;
            })
        );
        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 24)
            .map(([tag, count]) => ({ tag, count }));
    }, [photos]);

    return (
        <aside className="sidebar">
            <div className="sidebar-query">
                <span className="sidebar-label">Searching for</span>
                <span className="sidebar-value">"{currentQuery}"</span>
                <span className="sidebar-count">{photos.length} results</span>
            </div>

            <div className="sidebar-divider" />

            <p className="sidebar-tags-title">Tags in these results</p>
            <div className="sidebar-tags">
                {tags.map(({ tag, count }) => (
                    <button
                        key={tag}
                        className="sidebar-tag"
                        onClick={() => onSearch(tag)}
                        title={`Search "${tag}" (${count} photos)`}
                    >
                        {tag}
                        <span className="sidebar-tag-count">{count}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
