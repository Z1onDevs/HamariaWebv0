"use client"

import { useState, useMemo, useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { X, ChevronDown, ChevronUp, Search } from "lucide-react"

interface Therapy {
  id: string
  name: string
  description: string
  categories: string[]
  subcategories: string[]
}

interface Category {
  id: string
  name: string
  color: string
}

interface Subcategory {
  id: string
  name: string
  parentCategories: string[]
}

interface FilteredServicesProps {
  prefilterCategories?: string[]
  prefilterSubcategories?: string[]
}

export function FilteredServices({ 
  prefilterCategories = [], 
  prefilterSubcategories = [] 
}: FilteredServicesProps = {}) {
  const { t, language } = useTranslation()
  const therapiesData = t.therapies || {}
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(prefilterCategories)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(prefilterSubcategories)
  const [expandedTherapy, setExpandedTherapy] = useState<string | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category'>('alphabetical')
  const [filterMode, setFilterMode] = useState<'AND' | 'OR'>('AND')

  // Apply prefilters when they change
  useEffect(() => {
    setSelectedCategories(prefilterCategories)
    setSelectedSubcategories(prefilterSubcategories)
  }, [prefilterCategories, prefilterSubcategories])

  const categories: Category[] = therapiesData.categories || []
  const subcategories: Subcategory[] = therapiesData.subcategories || []
  const therapies: Therapy[] = therapiesData.items || []

  // Quick filter presets
  const filterPresets = [
    {
      id: 'recovery',
      name: 'Recovery',
      nameES: 'Recuperación',
      icon: '🔄',
      categories: ['performance', 'wellness'],
      subcategories: ['regeneration', 'physical-medicine']
    },
    {
      id: 'anti-aging',
      name: 'Anti-Aging',
      nameES: 'Anti-Envejecimiento',
      icon: '✨',
      categories: ['aesthetics', 'wellness'],
      subcategories: ['aesthetics-sub', 'regeneration']
    },
    {
      id: 'stress-relief',
      name: 'Stress Relief',
      nameES: 'Alivio del Estrés',
      icon: '🧘',
      categories: ['wellness'],
      subcategories: ['stress', 'sleep']
    },
    {
      id: 'energy-boost',
      name: 'Energy',
      nameES: 'Energía',
      icon: '⚡',
      categories: ['performance', 'wellness'],
      subcategories: ['energy']
    },
    {
      id: 'detox',
      name: 'Detox',
      nameES: 'Detox',
      icon: '🌿',
      categories: ['wellness'],
      subcategories: ['detox']
    },
    {
      id: 'fitness',
      name: 'Fitness',
      nameES: 'Fitness',
      icon: '💪',
      categories: ['performance'],
      subcategories: ['movement']
    }
  ]

  // Get visible subcategories based on selected categories
  const visibleSubcategories = useMemo(() => {
    if (selectedCategories.length === 0) return subcategories
    return subcategories.filter(sub =>
      sub.parentCategories.some(cat => selectedCategories.includes(cat))
    )
  }, [selectedCategories, subcategories])

  // Filter therapies based on search and selected filters
  const filteredTherapies = useMemo(() => {
    let result = therapies

    // Apply search filter (enhanced to include subcategories)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(therapy => {
        // Search in name and description
        const nameMatch = therapy.name.toLowerCase().includes(query)
        const descriptionMatch = therapy.description.toLowerCase().includes(query)
        
        // Search in subcategory names
        const subcategoryMatch = therapy.subcategories.some(subId => {
          const subcategory = subcategories.find(s => s.id === subId)
          return subcategory?.name.toLowerCase().includes(query)
        })
        
        return nameMatch || descriptionMatch || subcategoryMatch
      })
    }

    // Apply category/subcategory filters with configurable AND/OR logic
    const hasCategoryFilters = selectedCategories.length > 0
    const hasSubcategoryFilters = selectedSubcategories.length > 0

    if (hasCategoryFilters && hasSubcategoryFilters) {
      // BOTH selected: Use filter mode to determine logic
      result = result.filter(therapy => {
        const matchesCategory = therapy.categories.some(cat => 
          selectedCategories.includes(cat)
        )
        const matchesSubcategory = therapy.subcategories.some(sub => 
          selectedSubcategories.includes(sub)
        )
        // AND mode: Must match BOTH | OR mode: Must match EITHER
        return filterMode === 'AND' 
          ? matchesCategory && matchesSubcategory 
          : matchesCategory || matchesSubcategory
      })
    } else if (hasCategoryFilters) {
      // Only categories: Match ANY selected category
      result = result.filter(therapy =>
        therapy.categories.some(cat => selectedCategories.includes(cat))
      )
    } else if (hasSubcategoryFilters) {
      // Only subcategories: Match ANY selected subcategory
      result = result.filter(therapy =>
        therapy.subcategories.some(sub => selectedSubcategories.includes(sub))
      )
    }

    // Apply sorting based on selected option
    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'category') {
      result.sort((a, b) => {
        // Sort by first category, then by name
        const catA = a.categories[0] || ''
        const catB = b.categories[0] || ''
        if (catA !== catB) {
          return catA.localeCompare(catB)
        }
        return a.name.localeCompare(b.name)
      })
    }

    return result
  }, [therapies, selectedCategories, selectedSubcategories, searchQuery, subcategories, sortBy, filterMode])

  // Count therapies per category for badges
  const getCategoryCount = (categoryId: string) => {
    return therapies.filter(therapy => therapy.categories.includes(categoryId)).length
  }

  // Count therapies per subcategory (context-aware based on selected categories)
  const getSubcategoryCount = (subcategoryId: string) => {
    // If categories are selected, count only within those categories
    if (selectedCategories.length > 0) {
      return therapies.filter(therapy => 
        therapy.subcategories.includes(subcategoryId) &&
        therapy.categories.some(cat => selectedCategories.includes(cat))
      ).length
    }
    // Otherwise count all therapies with this subcategory
    return therapies.filter(therapy => 
      therapy.subcategories.includes(subcategoryId)
    ).length
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSearchQuery("")
  }

  const applyPreset = (preset: typeof filterPresets[0]) => {
    setSelectedCategories(preset.categories)
    setSelectedSubcategories(preset.subcategories)
    setSearchQuery("")
    // Close mobile filters to show results
    if (window.innerWidth < 1024) {
      setMobileFiltersOpen(false)
    }
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0 || searchQuery.trim().length > 0

  // Calculate stats for filtered results
  const stats = useMemo(() => {
    const byCategory = {
      diagnostics: filteredTherapies.filter(t => t.categories.includes('diagnostics')).length,
      performance: filteredTherapies.filter(t => t.categories.includes('performance')).length,
      wellness: filteredTherapies.filter(t => t.categories.includes('wellness')).length,
      aesthetics: filteredTherapies.filter(t => t.categories.includes('aesthetics')).length,
    }
    return byCategory
  }, [filteredTherapies])

  return (
    <div className="flex h-full flex-col">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-lg border border-primary/20 bg-background/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 backdrop-blur-sm transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-background/60 px-4 py-3 backdrop-blur-sm transition-all hover:border-primary/30 lg:hidden"
      >
        <span className="text-sm font-medium text-foreground">
          {therapiesData.filterButton || "Filter Services"} 
          {hasActiveFilters && ` (${selectedCategories.length + selectedSubcategories.length})`}
        </span>
        {mobileFiltersOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Left Column - Filters */}
        <div
          className={`${
            mobileFiltersOpen ? "flex" : "hidden"
          } relative w-full flex-col gap-4 pb-20 lg:flex lg:w-64 lg:flex-shrink-0 lg:pb-0 xl:w-72`}
        >
          {/* Quick Filter Presets */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wide text-foreground/50">Quick Filters</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="group flex flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-card/20 px-3 py-2.5 text-center transition-all hover:border-primary/40 hover:bg-card/30 hover:shadow-sm active:scale-95"
                >
                  <span className="text-lg transition-transform group-hover:scale-110">{preset.icon}</span>
                  <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground">
                    {language === 'es' ? preset.nameES : preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 self-start rounded-md border border-primary/20 bg-background/40 px-3 py-1.5 text-xs text-foreground/70 transition-all hover:border-primary/30 hover:text-foreground"
            >
              <X className="h-3 w-3" />
              {therapiesData.clearFilters || "Clear All"}
            </button>
          )}

          {/* Categories */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              {therapiesData.categoriesLabel || "Categories"}
            </h3>
            <div className="space-y-1.5">
              {categories.map((category) => {
                const count = getCategoryCount(category.id)
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`group relative w-full rounded-md border px-3 py-2.5 text-left text-sm transition-all ${
                      selectedCategories.includes(category.id)
                        ? "shadow-sm"
                        : "hover:border-primary/30 hover:bg-card/40 hover:shadow-sm"
                    }`}
                    style={
                      selectedCategories.includes(category.id)
                        ? {
                            backgroundColor: `${category.color}25`,
                            borderColor: `${category.color}60`,
                          }
                        : {
                            borderColor: 'oklch(0.35 0.04 250 / 0.5)',
                            backgroundColor: 'oklch(0.25 0.04 250 / 0.3)',
                          }
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{category.name}</span>
                      <span 
                        className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: selectedCategories.includes(category.id) 
                            ? `${category.color}25` 
                            : 'oklch(0.45 0.08 145 / 0.1)',
                          color: selectedCategories.includes(category.id)
                            ? category.color
                            : 'oklch(0.45 0.08 145)',
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filter Mode Toggle - Only show when both categories and subcategories are selected */}
          {selectedCategories.length > 0 && selectedSubcategories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wide text-foreground/50">Filter Mode</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterMode('AND')}
                  className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-all ${
                    filterMode === 'AND'
                      ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                      : "border-border/50 bg-card/20 text-foreground/70 hover:border-primary/30 hover:bg-card/30"
                  }`}
                >
                  AND
                  <div className="mt-0.5 text-[9px] font-normal opacity-70">More specific</div>
                </button>
                <button
                  onClick={() => setFilterMode('OR')}
                  className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-all ${
                    filterMode === 'OR'
                      ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                      : "border-border/50 bg-card/20 text-foreground/70 hover:border-primary/30 hover:bg-card/30"
                  }`}
                >
                  OR
                  <div className="mt-0.5 text-[9px] font-normal opacity-70">More results</div>
                </button>
              </div>
            </div>
          )}

          {/* Subcategories */}
          {visibleSubcategories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                {therapiesData.subcategoriesLabel || "Subcategories"}
              </h3>
              <div className="space-y-1.5">
                {visibleSubcategories.map((subcategory) => {
                  const count = getSubcategoryCount(subcategory.id)
                  return (
                    <button
                      key={subcategory.id}
                      onClick={() => toggleSubcategory(subcategory.id)}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-all ${
                        selectedSubcategories.includes(subcategory.id)
                          ? "border-primary/40 bg-primary/10 text-foreground shadow-sm"
                          : "border-border/50 bg-card/20 text-foreground/70 hover:border-primary/30 hover:bg-card/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subcategory.name}</span>
                        <span 
                          className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                            selectedSubcategories.includes(subcategory.id)
                              ? "bg-primary/20 text-primary"
                              : "bg-foreground/10 text-foreground/50"
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Mobile Search Button - Always sticky at bottom */}
          <div className="fixed bottom-0 left-0 right-0 z-20 p-4 lg:hidden">
            <button
              onClick={() => {
                setMobileFiltersOpen(false)
                // Scroll to results
                setTimeout(() => {
                  const resultsSection = document.querySelector('[data-results-section]')
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }}
              className="w-full px-6 py-3.5 font-sans text-sm font-medium text-primary transition-all hover:text-primary/80 active:scale-95"
            >
              View {filteredTherapies.length} {filteredTherapies.length === 1 ? 'Service' : 'Services'}
            </button>
          </div>
        </div>

        {/* Right Column - Services List */}
        <div className="flex-1" data-results-section>
          {/* Results Count, Sort, and Active Filters */}
          <div className="mb-4 space-y-3">
            {/* Top row: Count and Sort */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs text-foreground/50">
                {therapiesData.showingResults || "Showing"} <span className="font-medium text-foreground">{filteredTherapies.length}</span>{" "}
                {filteredTherapies.length === 1
                  ? therapiesData.therapySingular || "therapy"
                  : therapiesData.therapyPlural || "therapies"}
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground/40">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'alphabetical' | 'category')}
                  className="rounded-md border border-primary/20 bg-background/60 px-2.5 py-1.5 text-xs text-foreground transition-all hover:border-primary/30 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="alphabetical">A-Z</option>
                  <option value="category">By Category</option>
                </select>
              </div>
            </div>
            
            {/* Active filter chips row */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {/* Active category filter chips */}
                {selectedCategories.map((catId) => {
                  const cat = categories.find(c => c.id === catId)
                  if (!cat) return null
                  return (
                    <button
                      key={catId}
                      onClick={() => toggleCategory(catId)}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                    >
                      {cat.name}
                      <X className="h-3 w-3" />
                    </button>
                  )
                })}
                
                {/* Active subcategory filter chips */}
                {selectedSubcategories.map((subId) => {
                  const sub = subcategories.find(s => s.id === subId)
                  if (!sub) return null
                  return (
                    <button
                      key={subId}
                      onClick={() => toggleSubcategory(subId)}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:opacity-80 bg-primary/10 text-primary border border-primary/30"
                    >
                      {sub.name}
                      <X className="h-3 w-3" />
                    </button>
                  )
                })}
              </div>
            )}
            
            {/* Stats Panel - Only show when results exist and filters are active */}
            {filteredTherapies.length > 0 && hasActiveFilters && (
              <div className="grid grid-cols-4 gap-2 rounded-lg border border-border/20 bg-card/10 p-3">
                {categories.map((cat) => {
                  const count = stats[cat.id as keyof typeof stats]
                  if (count === 0) return null
                  return (
                    <div key={cat.id} className="text-center">
                      <div 
                        className="text-lg font-semibold"
                        style={{ color: cat.color }}
                      >
                        {count}
                      </div>
                      <div className="text-[10px] text-foreground/50">{cat.name}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Services List - Scrollable */}
          <div className="max-h-[500px] space-y-2 overflow-y-auto custom-scrollbar pr-2">
            {filteredTherapies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/10 py-16 text-center">
                <Search className="mb-3 h-8 w-8 text-foreground/30" />
                <p className="text-sm font-medium text-foreground/60">
                  {therapiesData.noResults || "No services match your filters"}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-xs text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredTherapies.map((therapy, index) => (
                <div
                  key={therapy.id}
                  className="group animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-border/30 bg-card/10 transition-all hover:border-primary/30 hover:bg-card/20 hover:shadow-sm"
                  style={{
                    animationDelay: `${index * 20}ms`,
                    animationDuration: '300ms',
                    animationFillMode: 'backwards',
                  }}
                >
                  {/* Desktop: Always show description */}
                  <div className="hidden flex-col gap-2 p-4 lg:flex">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {therapy.name}
                      </h4>
                      {/* Category tags */}
                      <div className="flex flex-shrink-0 gap-1">
                        {therapy.categories.slice(0, 2).map((catId) => {
                          const cat = categories.find(c => c.id === catId)
                          if (!cat) return null
                          return (
                            <span
                              key={catId}
                              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                              style={{
                                backgroundColor: `${cat.color}15`,
                                color: cat.color,
                              }}
                            >
                              {cat.name}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/60">
                      {therapy.description}
                    </p>
                    {/* Subcategory tags */}
                    <div className="flex flex-wrap gap-1">
                      {therapy.subcategories.map((subId) => {
                        const subcategory = subcategories.find(s => s.id === subId)
                        if (!subcategory) return null
                        return (
                          <span
                            key={subId}
                            className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-foreground/60"
                          >
                            {subcategory.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Mobile: Click to expand description */}
                  <div className="lg:hidden">
                    <button
                      onClick={() =>
                        setExpandedTherapy(
                          expandedTherapy === therapy.id ? null : therapy.id
                        )
                      }
                      className="flex w-full items-center justify-between p-3 text-left"
                    >
                      <h4 className="flex-1 text-sm font-medium text-foreground">
                        {therapy.name}
                      </h4>
                      {expandedTherapy === therapy.id ? (
                        <ChevronUp className="h-4 w-4 flex-shrink-0 text-foreground/50" />
                      ) : (
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-foreground/50" />
                      )}
                    </button>
                    {expandedTherapy === therapy.id && (
                      <div className="animate-in slide-in-from-top-2 border-t border-border/30 px-3 pb-3 pt-2 duration-200">
                        <p className="mb-2 text-xs leading-relaxed text-foreground/60">
                          {therapy.description}
                        </p>
                        {/* Category tags on mobile */}
                        <div className="mb-2 flex flex-wrap gap-1">
                          {therapy.categories.map((catId) => {
                            const cat = categories.find(c => c.id === catId)
                            if (!cat) return null
                            return (
                              <span
                                key={catId}
                                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                style={{
                                  backgroundColor: `${cat.color}15`,
                                  color: cat.color,
                                }}
                              >
                                {cat.name}
                              </span>
                            )
                          })}
                        </div>
                        {/* Subcategory tags on mobile */}
                        <div className="flex flex-wrap gap-1">
                          {therapy.subcategories.map((subId) => {
                            const subcategory = subcategories.find(s => s.id === subId)
                            if (!subcategory) return null
                            return (
                              <span
                                key={subId}
                                className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-foreground/60"
                              >
                                {subcategory.name}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

