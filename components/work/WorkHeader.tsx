"use client";

import { workCategories, type WorkCategory } from "@/lib/workProjects";

type Props = {
  collapsed: boolean;
  selected: WorkCategory;
  onSelect: (category: WorkCategory) => void;
};

export function WorkHeader({ collapsed, selected, onSelect }: Props) {
  return (
    <header className="work-header" data-collapsed={collapsed}>
      <div className="container work-header-inner">
        <h1>Work</h1>
        <nav className="work-category-nav" aria-label="Filter projects by category">
          {workCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected === category.id}
              onClick={() => onSelect(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>
        <label className="work-category-select-wrap">
          <span className="sr-only">Filter work by category</span>
          <span className="work-category-select-value" aria-hidden="true">{workCategories.find((category) => category.id === selected)?.label}</span>
          <select value={selected} onChange={(event) => onSelect(event.target.value as WorkCategory)}>
            {workCategories.map((category) => <option value={category.id} key={category.id}>{category.label}</option>)}
          </select>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path d="m8 10 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </label>
      </div>
    </header>
  );
}
