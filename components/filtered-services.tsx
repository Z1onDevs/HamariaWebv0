"use client"

import { useState, useMemo } from "react"
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

export function FilteredServices() {
  const { t } = useTranslation()
  const therapiesData = t.therapies || {}
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [expandedTherapy, setExpandedTherapy] = useState<string | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const categories: Category[] = therapiesData.categories || []
  const subcategories: Subcategory[] = therapiesData.subcategories || []
  const therapies: Therapy[] = therapiesData.items || []

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

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(therapy =>
        therapy.name.toLowerCase().includes(query) ||
        therapy.description.toLowerCase().includes(query)
      )
    }

    // Apply category/subcategory filters (ANY logic - OR)
    if (selectedCategories.length > 0 || selectedSubcategories.length > 0) {
      result = result.filter(therapy => {
        const matchesCategory = selectedCategories.length === 0 ||
          therapy.categories.some(cat => selectedCategories.includes(cat))
        
        const matchesSubcategory = selectedSubcategories.length === 0 ||
          therapy.subcategories.some(sub => selectedSubcategories.includes(sub))

        return matchesCategory || matchesSubcategory
      })
    }

    // Sort alphabetically by name
    result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [therapies, selectedCategories, selectedSubcategories, searchQuery])

  // Count therapies per category for badges
  const getCategoryCount = (categoryId: string) => {
    return therapies.filter(therapy => therapy.categories.includes(categoryId)).length
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

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0 || searchQuery.trim().length > 0

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
          } w-full flex-col gap-4 lg:flex lg:w-64 lg:flex-shrink-0 xl:w-72`}
        >
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
                            backgroundColor: `${category.color}15`,
                            borderColor: `${category.color}40`,
                          }
                        : {
                            borderColor: 'oklch(0.88 0.015 80 / 0.5)',
                            backgroundColor: 'oklch(0.98 0.005 85 / 0.2)',
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

          {/* Subcategories */}
          {visibleSubcategories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                {therapiesData.subcategoriesLabel || "Subcategories"}
              </h3>
              <div className="space-y-1.5">
                {visibleSubcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => toggleSubcategory(subcategory.id)}
                    className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-all ${
                      selectedSubcategories.includes(subcategory.id)
                        ? "border-primary/40 bg-primary/10 text-foreground shadow-sm"
                        : "border-border/50 bg-card/20 text-foreground/70 hover:border-primary/30 hover:bg-card/40"
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Services List */}
        <div className="flex-1">
          {/* Results Count and Active Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="text-xs text-foreground/50">
              {therapiesData.showingResults || "Showing"} <span className="font-medium text-foreground">{filteredTherapies.length}</span>{" "}
              {filteredTherapies.length === 1
                ? therapiesData.therapySingular || "therapy"
                : therapiesData.therapyPlural || "therapies"}
            </div>
            
            {/* Active filter chips */}
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
                        <p className="text-xs leading-relaxed text-foreground/60">
                          {therapy.description}
                        </p>
                        {/* Category tags on mobile */}
                        <div className="mt-2 flex flex-wrap gap-1">
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

