// Hamaria Membership Data Structure
// Single-tier base membership with optional add-on programs

export type TherapyAllocation = number | "Unlimited" | string

export interface Therapy {
  name: string
  nameES: string
  baseAllocation: TherapyAllocation  // For base membership
  duration?: number  // Minutes per session
  capacity?: number  // Maximum simultaneous users
  isYearly?: boolean
}

export type AddOnProgram = 
  | 'aesthetics' 
  | 'stress' 
  | 'detox' 
  | 'pain' 
  | 'longevity'

// Base Membership Therapies
export const baseMembershipTherapies: Therapy[] = [
  // Unlimited Access Therapies
  {
    name: "Full body red light therapy",
    nameES: "Luz roja cuerpo completo",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 3,
  },
  {
    name: "Pressotherapy",
    nameES: "Presoterapia",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 4,
  },
  {
    name: "Hydrodrive swimming treadmill",
    nameES: "Cinta acuática Hydrodrive",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 1,
  },
  {
    name: "Personal training",
    nameES: "Personal Training",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 4,
  },
  {
    name: "Pilates reformer",
    nameES: "Pilates Reformer",
    baseAllocation: "Unlimited",
    duration: 60,
    capacity: 8,
  },
  {
    name: "Body Lab bioimpedance",
    nameES: "Body Lab bioimpedancia",
    baseAllocation: "Unlimited",
    duration: 5,
    capacity: 1,
  },
  {
    name: "Ice plunge",
    nameES: "Ice Plunge",
    baseAllocation: "Unlimited",
    duration: 5,
    capacity: 2,
  },
  {
    name: "Steam room",
    nameES: "Steam Room",
    baseAllocation: "Unlimited",
    duration: 10,
    capacity: 3,
  },
  {
    name: "Dry sauna",
    nameES: "Dry Sauna",
    baseAllocation: "Unlimited",
    duration: 15,
    capacity: 4,
  },
  {
    name: "Mindfulness",
    nameES: "Mindfulness",
    baseAllocation: "Unlimited",
    duration: 60,
    capacity: 8,
  },
  {
    name: "Breathing & stretching",
    nameES: "Breathing & Stretching",
    baseAllocation: "Unlimited",
    duration: 60,
    capacity: 8,
  },
  {
    name: "Hair red light therapy",
    nameES: "Luz roja capilar",
    baseAllocation: "Unlimited",
    duration: 20,
    capacity: 6,
  },
  {
    name: "UV light therapy",
    nameES: "Luz UV",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 1,
  },
  {
    name: "EMS training",
    nameES: "Entrenamiento electroestimulación muscular",
    baseAllocation: "Unlimited",
    duration: 30,
    capacity: 4,
  },
  {
    name: "Hot yoga",
    nameES: "Hot Yoga",
    baseAllocation: "Unlimited",
    duration: 60,
  },
  {
    name: "Vagus nerve stimulation",
    nameES: "Vagus Nerve Stimulation",
    baseAllocation: "Unlimited",
    duration: 20,
    capacity: 1,
  },
  
  // Limited Session Therapies (Annual)
  {
    name: "Guest passes",
    nameES: "Invitados",
    baseAllocation: 12,
    isYearly: true,
  },
  {
    name: "Private contrast suite",
    nameES: "Private contrast Suite (infrared)",
    baseAllocation: 4,
    duration: 40,
    capacity: 1,
    isYearly: true,
  },
  {
    name: "Cryotherapy",
    nameES: "Crioterapia",
    baseAllocation: 12,
    duration: 10,
    capacity: 1,
    isYearly: true,
  },
  {
    name: "Float tank",
    nameES: "Tanque de flotación",
    baseAllocation: 12,
    duration: 60,
    capacity: 1,
    isYearly: true,
  },
  {
    name: "Complete blood panel",
    nameES: "Análisis completo",
    baseAllocation: 1,
    duration: 30,
    capacity: 1,
    isYearly: true,
  },
  {
    name: "VO₂ max test",
    nameES: "Prueba de esfuerzo cardiopulmonar (VO₂ máx)",
    baseAllocation: 1,
    duration: 30,
    capacity: 1,
    isYearly: true,
  },
]

// Get therapies by type
export const getUnlimitedTherapies = () => 
  baseMembershipTherapies.filter(t => t.baseAllocation === "Unlimited")

export const getLimitedTherapies = () => 
  baseMembershipTherapies.filter(t => t.baseAllocation !== "Unlimited")

export const getYearlyTherapies = () => 
  baseMembershipTherapies.filter(t => t.isYearly)

export const getMonthlyTherapies = () => 
  baseMembershipTherapies.filter(t => !t.isYearly)

// Add-on Program Definitions
export interface AddOnProgramDefinition {
  id: AddOnProgram
  name: string
  nameES: string
  tagline: string
  taglineES: string
  description: string
  descriptionES: string
  color: string
  icon: string
  features: string[]
  featuresES: string[]
  sessionCount: string
  sessionCountES: string
  yearlyPrice: number  // Annual cost in euros
}

export const addOnPrograms: AddOnProgramDefinition[] = [
  {
    id: 'aesthetics',
    name: 'Advanced Aesthetics',
    nameES: 'Estética Avanzada',
    tagline: 'Regenerative Beauty',
    taglineES: 'Belleza Regenerativa',
    description: 'Comprehensive aesthetics program including facial treatments, body contouring, and anti-aging therapies.',
    descriptionES: 'Programa integral de estética que incluye tratamientos faciales, contorneo corporal y terapias antiedad.',
    color: '#ec4899',
    icon: 'sparkles',
    features: [
      'HydraFacial® treatments',
      'Signature facials',
      'HIFU body contouring',
      'Emsculpt NEO',
      'Cryolipolysis',
      'Chemical peels',
      'IV vitamin therapy',
    ],
    featuresES: [
      'Tratamientos HydraFacial®',
      'Faciales signature',
      'Contorneo corporal HIFU',
      'Emsculpt NEO',
      'Criolipólisis',
      'Peelings químicos',
      'Terapia IV de vitaminas',
    ],
    sessionCount: '~150 annual sessions',
    sessionCountES: '~150 sesiones anuales',
    yearlyPrice: 10500,
  },
  {
    id: 'stress',
    name: 'Stress Management & Mental Performance',
    nameES: 'Gestión del Estrés y Rendimiento Mental',
    tagline: 'Optimize Your Mind',
    taglineES: 'Optimiza tu Mente',
    description: 'Advanced program for stress reduction, cognitive enhancement, and mental performance optimization.',
    descriptionES: 'Programa avanzado para reducción de estrés, mejora cognitiva y optimización del rendimiento mental.',
    color: '#8b5cf6',
    icon: 'brain',
    features: [
      'Therapeutic & oriental massages',
      'Enhanced float therapy',
      'PEMF therapy',
      'Transcranial photobiomodulation',
      'Vagus nerve stimulation',
      'IHHT training',
    ],
    featuresES: [
      'Masajes terapéuticos y orientales',
      'Terapia de flotación mejorada',
      'Terapia PEMF',
      'Fotomodulación transcraneal',
      'Estimulación del nervio vago',
      'Entrenamiento IHHT',
    ],
    sessionCount: '~144 annual sessions',
    sessionCountES: '~144 sesiones anuales',
    yearlyPrice: 5200,
  },
  {
    id: 'detox',
    name: 'Detox & Weight Management',
    nameES: 'Detox y Control de Peso',
    tagline: 'Transform Your Body',
    taglineES: 'Transforma tu Cuerpo',
    description: 'Comprehensive metabolic optimization program for weight management, detoxification, and body transformation.',
    descriptionES: 'Programa integral de optimización metabólica para control de peso, detoxificación y transformación corporal.',
    color: '#10b981',
    icon: 'leaf',
    features: [
      'Enhanced cryotherapy',
      'Compressive drainage',
      'HBOT sessions',
      'H₂ protocol',
      'IHHT training',
      'Advanced nutrition protocols',
      'IV detox therapy',
    ],
    featuresES: [
      'Crioterapia mejorada',
      'Drenaje compresivo',
      'Sesiones HBOT',
      'Protocolo H₂',
      'Entrenamiento IHHT',
      'Protocolos de nutrición avanzados',
      'Terapia IV detox',
    ],
    sessionCount: '~189 annual sessions',
    sessionCountES: '~189 sesiones anuales',
    yearlyPrice: 8400,
  },
  {
    id: 'pain',
    name: 'Chronic Pain Management',
    nameES: 'Manejo del Dolor Crónico',
    tagline: 'Break Free from Pain',
    taglineES: 'Libérate del Dolor',
    description: 'Intensive pain management and rehabilitation program combining advanced therapies for chronic pain relief.',
    descriptionES: 'Programa intensivo de manejo del dolor y rehabilitación que combina terapias avanzadas para alivio del dolor crónico.',
    color: '#f59e0b',
    icon: 'heart-pulse',
    features: [
      'Shockwave therapy',
      'Physiotherapy & osteopathy',
      'Therapeutic massages',
      'Enhanced PEMF therapy',
      'HBOT sessions',
      'Compressive drainage',
    ],
    featuresES: [
      'Terapia de ondas de choque',
      'Fisioterapia y osteopatía',
      'Masajes terapéuticos',
      'Terapia PEMF mejorada',
      'Sesiones HBOT',
      'Drenaje compresivo',
    ],
    sessionCount: '~257 annual sessions',
    sessionCountES: '~257 sesiones anuales',
    yearlyPrice: 9500,
  },
  {
    id: 'longevity',
    name: 'Advanced Longevity',
    nameES: 'Longevidad Avanzada',
    tagline: 'Maximize Your Healthspan',
    taglineES: 'Maximiza tu Vida Saludable',
    description: 'Our most comprehensive program for longevity optimization, preventive medicine, and healthspan extension.',
    descriptionES: 'Nuestro programa más completo para optimización de longevidad, medicina preventiva y extensión de vida saludable.',
    color: '#06b6d4',
    icon: 'infinity',
    features: [
      'Neurocognitive assessment (KERNEL)',
      'HBOT & IHHT protocols',
      'Transcranial photobiomodulation',
      'H₂ protocol',
      'Genetic predisposition analysis',
      'Advanced longevity diagnostics',
      'Enhanced IV therapy',
    ],
    featuresES: [
      'Evaluación neurocognitiva (KERNEL)',
      'Protocolos HBOT e IHHT',
      'Fotomodulación transcraneal',
      'Protocolo H₂',
      'Análisis de predisposición genética',
      'Diagnósticos avanzados de longevidad',
      'Terapia IV mejorada',
    ],
    sessionCount: '~237 annual sessions',
    sessionCountES: '~237 sesiones anuales',
    yearlyPrice: 12700,
  },
]

// Helper function to get program by ID
export const getProgramById = (id: AddOnProgram) => 
  addOnPrograms.find(p => p.id === id)

