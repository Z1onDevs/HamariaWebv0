"use client"

import { useState, useMemo } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { X, ChevronDown, ChevronUp } from "lucide-react"

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

  // Filter therapies based on selected filters (ANY logic - OR)
  const filteredTherapies = useMemo(() => {
    if (selectedCategories.length === 0 && selectedSubcategories.length === 0) {
      return therapies
    }

    return therapies.filter(therapy => {
      const matchesCategory = selectedCategories.length === 0 ||
        therapy.categories.some(cat => selectedCategories.includes(cat))
      
      const matchesSubcategory = selectedSubcategories.length === 0 ||
        therapy.subcategories.some(sub => selectedSubcategories.includes(sub))

      // OR logic: match if ANY filter matches
      return matchesCategory || matchesSubcategory
    })
  }, [therapies, selectedCategories, selectedSubcategories])

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
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0

  return (
    <div className="flex h-full flex-col">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-background/60 px-4 py-3 backdrop-blur-sm transition-all hover:border-primary/30 lg:hidden"
      >
        <span className="text-sm font-medium text-foreground">
          {therapiesData.filterButton || "Filter Therapies"} 
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-all ${
                    selectedCategories.includes(category.id)
                      ? `border-${category.color}-500/40 bg-${category.color}-500/10 text-foreground shadow-sm`
                      : "border-border/50 bg-card/20 text-foreground/70 hover:border-primary/30 hover:bg-card/40"
                  }`}
                  style={
                    selectedCategories.includes(category.id)
                      ? {
                          backgroundColor: `${category.color}15`,
                          borderColor: `${category.color}40`,
                        }
                      : {}
                  }
                >
                  {category.name}
                </button>
              ))}
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

        {/* Right Column - Therapies List */}
        <div className="flex-1 overflow-y-auto">
          {/* Results Count */}
          <div className="mb-3 text-xs text-foreground/50">
            {therapiesData.showingResults || "Showing"} {filteredTherapies.length}{" "}
            {filteredTherapies.length === 1
              ? therapiesData.therapySingular || "therapy"
              : therapiesData.therapyPlural || "therapies"}
          </div>

          {/* Therapies List */}
          <div className="space-y-1">
            {filteredTherapies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-foreground/50">
                  {therapiesData.noResults || "No therapies match your filters"}
                </p>
              </div>
            ) : (
              filteredTherapies.map((therapy) => (
                <div
                  key={therapy.id}
                  className="group rounded-md border border-border/30 bg-card/10 transition-all hover:border-primary/30 hover:bg-card/20"
                >
                  {/* Desktop: Always show description */}
                  <div className="hidden items-start gap-3 p-3 lg:flex">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {therapy.name}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                        {therapy.description}
                      </p>
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
                      <h4 className="text-sm font-medium text-foreground">
                        {therapy.name}
                      </h4>
                      {expandedTherapy === therapy.id ? (
                        <ChevronUp className="h-4 w-4 flex-shrink-0 text-foreground/50" />
                      ) : (
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-foreground/50" />
                      )}
                    </button>
                    {expandedTherapy === therapy.id && (
                      <div className="border-t border-border/30 px-3 pb-3 pt-2">
                        <p className="text-xs leading-relaxed text-foreground/60">
                          {therapy.description}
                        </p>
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

