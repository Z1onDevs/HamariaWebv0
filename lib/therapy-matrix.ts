// Shared therapy matrix for consistency across membership components
// This is the single source of truth for therapy allocations

export type TherapyAllocation = number | "Unlimited" | "Optional" | string

export interface Therapy {
  name: string
  nameES: string
  allocations: {
    longevity: TherapyAllocation
    performance: TherapyAllocation
    aesthetics: TherapyAllocation
  }
  isYearly?: boolean
  duration?: number
}

export const therapyMatrix: Therapy[] = [
  // Monthly Therapies
  {
    name: "Full body red light therapy",
    nameES: "Luz roja cuerpo completo",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 20,
  },
  {
    name: "Infrared sauna",
    nameES: "Sauna infrarroja",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Pressotherapy",
    nameES: "Presoterapia",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Mobility coaching",
    nameES: "Coaching de movilidad",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 60,
  },
  {
    name: "Personal training",
    nameES: "Entrenamiento personal",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 60,
  },
  {
    name: "Pilates reformer",
    nameES: "Pilates reformer",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 50,
  },
  {
    name: "Body Lab bioimpedance",
    nameES: "Body Lab bioimpedancia",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Ice plunge",
    nameES: "Inmersión en hielo",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 10,
  },
  {
    name: "Steam room",
    nameES: "Sala de vapor",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 30,
  },
  {
    name: "Outdoor training (Retiro)",
    nameES: "Entrenamiento al aire libre (Retiro)",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 60,
  },
  {
    name: "Mindfulness",
    nameES: "Mindfulness",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 45,
  },
  {
    name: "Breathing & stretching",
    nameES: "Respiración y estiramientos",
    allocations: { longevity: "Unlimited", performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 45,
  },
  {
    name: "Red light hair therapy",
    nameES: "Luz roja capilar",
    allocations: { longevity: 2, performance: "Unlimited", aesthetics: "Unlimited" },
    duration: 20,
  },
  {
    name: "Cryotherapy",
    nameES: "Crioterapia",
    allocations: { longevity: 2, performance: 4, aesthetics: 4 },
    duration: 5,
  },
  {
    name: "UV light therapy",
    nameES: "Luz UV",
    allocations: { longevity: 0, performance: 0, aesthetics: 4 },
    duration: 15,
  },
  {
    name: "Compressive drainage protocol",
    nameES: "Protocolo de drenaje compresivo",
    allocations: { longevity: 0, performance: 2, aesthetics: 2 },
    duration: 30,
  },
  {
    name: "PEMF therapy",
    nameES: "Campos electromagnéticos pulsados (PEMF)",
    allocations: { longevity: 0, performance: 2, aesthetics: 2 },
    duration: 30,
  },
  {
    name: "Magnesium/alkaline/salt baths",
    nameES: "Baños magnesio/alcalinos/salinos",
    allocations: { longevity: 1, performance: 1, aesthetics: 2 },
    duration: 30,
  },
  {
    name: "EMS training",
    nameES: "Entrenamiento electroestimulación muscular",
    allocations: { longevity: 0, performance: 4, aesthetics: 4 },
    duration: 20,
  },
  {
    name: "Therapeutic massages",
    nameES: "Masajes terapéuticos",
    allocations: { longevity: 1, performance: 2, aesthetics: 1 },
    duration: 60,
  },
  {
    name: "Oriental massages",
    nameES: "Masajes orientales",
    allocations: { longevity: 0, performance: 1, aesthetics: 1 },
    duration: 60,
  },
  {
    name: "Foot reflexology",
    nameES: "Reflexología podal",
    allocations: { longevity: 0, performance: 1, aesthetics: 1 },
    duration: 45,
  },
  {
    name: "HydraFacial®",
    nameES: "HydraFacial®",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    duration: 45,
  },
  {
    name: "Signature facials",
    nameES: "Faciales signature",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    duration: 60,
  },
  {
    name: "High-frequency facial RF (face/neck)",
    nameES: "Estimulación celular de alta frecuencia (rostro/cuello)",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    duration: 45,
  },
  {
    name: "Hot yoga",
    nameES: "Yoga caliente",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    duration: 60,
  },
  {
    name: "IHHT (intermittent hypoxic-hyperoxic)",
    nameES: "Hipoxia/hiperoxia intermitente (IHHT)",
    allocations: { longevity: 0, performance: 4, aesthetics: 0 },
    duration: 45,
  },
  {
    name: "Shockwave therapy",
    nameES: "Terapia de ondas de choque",
    allocations: { longevity: 0, performance: 2, aesthetics: 0 },
    duration: 30,
  },
  {
    name: "Hyperbaric oxygen therapy (HBOT)",
    nameES: "Cámara hiperbárica (HBOT)",
    allocations: { longevity: 0, performance: 2, aesthetics: 0 },
    duration: 60,
  },
  {
    name: "Physiotherapy & osteopathy",
    nameES: "Fisioterapia, osteopatía",
    allocations: { longevity: 0, performance: 2, aesthetics: 0 },
    duration: 60,
  },
  
  // Yearly Therapies
  {
    name: "Nutrition protocols",
    nameES: "Protocolos de nutrición",
    allocations: { longevity: 1, performance: "Unlimited", aesthetics: "Unlimited" },
    isYearly: true,
    duration: 60,
  },
  {
    name: "Supplementation protocols",
    nameES: "Protocolos de suplementación",
    allocations: { longevity: 0, performance: "Unlimited", aesthetics: "Unlimited" },
    isYearly: true,
    duration: 60,
  },
  {
    name: "Body wraps",
    nameES: "Envoltura corporal",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    isYearly: true,
    duration: 60,
  },
  {
    name: "Ultrasound therapy / HIFU (Sofwave)",
    nameES: "Terapia de ultrasonidos / HIFU (Sofwave)",
    allocations: { longevity: 1, performance: 1, aesthetics: 12 },
    isYearly: true,
    duration: 60,
  },
  {
    name: "HIFEM (Emsculpt NEO)",
    nameES: "HIFEM (Emsculpt NEO)",
    allocations: { longevity: 0, performance: 0, aesthetics: 6 },
    isYearly: true,
    duration: 30,
  },
  {
    name: "Cryolipolysis (CoolTech)",
    nameES: "Criolipólisis (CoolTech)",
    allocations: { longevity: 0, performance: 0, aesthetics: 3 },
    isYearly: true,
    duration: 45,
  },
  {
    name: "IV vitamins, antioxidants & NAD+",
    nameES: "Vitaminas/antioxidantes, NAD IV",
    allocations: { longevity: 0, performance: 3, aesthetics: 2 },
    isYearly: true,
    duration: 90,
  },
  
  // MERGED DIAGNOSTICS - All diagnostic tests combined into one entry
  {
    name: "Wellness diagnostics panel (includes CBC, lipid profile, hs-CRP, hormone panel, micronutrient panel)",
    nameES: "Panel de diagnóstico integral (incluye hemograma, perfil lipídico, PCR, hormonas, micronutrientes)",
    allocations: { longevity: 1, performance: 1, aesthetics: 1 },
    isYearly: true,
    duration: 120,
  },
  
  {
    name: "Skin analysis (Visia)",
    nameES: "Análisis cutáneo (Visia)",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    isYearly: true,
    duration: 30,
  },
  {
    name: "HIFU face lift (Ultherapy)",
    nameES: "HIFU (Ultherapy)",
    allocations: { longevity: 0, performance: 0, aesthetics: 1 },
    isYearly: true,
    duration: 90,
  },
  {
    name: "Genetic sequencing",
    nameES: "Secuenciación del genoma, predisposición genética",
    allocations: { longevity: 0, performance: 1, aesthetics: 0 },
    isYearly: true,
    duration: 60,
  },
  {
    name: "Epigenetic clocks & telomere length",
    nameES: "Relojes epigenéticos, longitud telomérica",
    allocations: { longevity: 0, performance: 1, aesthetics: 0 },
    isYearly: true,
    duration: 30,
  },
  {
    name: "VO₂ max test",
    nameES: "Prueba de esfuerzo cardiopulmonar (VO₂ máx)",
    allocations: { longevity: 0, performance: 1, aesthetics: 0 },
    isYearly: true,
    duration: 45,
  },
]

