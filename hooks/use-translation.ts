import { useLanguage } from "@/contexts/language-context"
import site from "@/content/site.json"

export function useTranslation() {
  const { language } = useLanguage()
  
  const content = (site as any)[language] || (site as any).en
  
  return {
    t: content,
    language,
  }
}

