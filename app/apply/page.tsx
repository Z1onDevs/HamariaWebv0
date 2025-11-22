"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { ShaderWrapper } from "@/components/shader-wrapper"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import { addOnPrograms } from "@/lib/membership-data"

export default function ApplyPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const applyPage = t.applyPage
  const form = t.membershipForm

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Program options: Only add-on programs
  const programOptions = addOnPrograms.map(program => ({
    id: program.id,
    name: language === 'es' ? program.nameES : program.name
  }))

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation (allows international formats)
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/
    return phoneRegex.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = `${form.nameLabel} ${applyPage.required.toLowerCase()}`
    }

    if (!formData.email.trim()) {
      newErrors.email = `${form.emailLabel} ${applyPage.required.toLowerCase()}`
    } else if (!validateEmail(formData.email)) {
      newErrors.email = language === 'es' ? 'Formato de correo inválido' : 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = `${form.phoneLabel} ${applyPage.required.toLowerCase()}`
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = language === 'es' ? 'Formato de teléfono inválido' : 'Invalid phone format'
    }

    if (!formData.program) {
      newErrors.program = `${applyPage.programLabel} ${applyPage.required.toLowerCase()}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'memberships@hamaria.com',
          subject: `New Membership Application - ${formData.program}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: formData.program,
          inviteCode: '',
          freeMonths: 0
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        
        // Track with Clarity if available
        if (typeof window !== "undefined" && (window as any).clarity) {
          ;(window as any).clarity("event", "application_submitted", {
            program: formData.program,
            source: "apply_page"
          })
        }
      } else {
        throw new Error(data.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Success state
  if (submitStatus === 'success') {
    return (
      <main className="relative min-h-screen bg-background overflow-x-hidden flex items-center justify-center">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <ShaderWrapper />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <GrainOverlay />

        {/* Success Message */}
        <div className="relative z-10 px-6 py-12 max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/20 p-4">
              <Check className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            {applyPage.successTitle}
          </h1>
          
          <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed">
            {applyPage.successMessage}
          </p>

          <MagneticButton
            variant="primary"
            onClick={() => router.push('/')}
            className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
          >
            {applyPage.backToHome}
          </MagneticButton>
        </div>
      </main>
    )
  }

  // Error state
  if (submitStatus === 'error') {
    return (
      <main className="relative min-h-screen bg-background overflow-x-hidden flex items-center justify-center">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <ShaderWrapper />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <GrainOverlay />

        {/* Error Message */}
        <div className="relative z-10 px-6 py-12 max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/20 p-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            {applyPage.errorTitle}
          </h1>
          
          <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed">
            {applyPage.errorMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              variant="secondary"
              onClick={() => setSubmitStatus('idle')}
              className="border"
            >
              {language === 'es' ? 'Intentar de nuevo' : 'Try Again'}
            </MagneticButton>
            
            <MagneticButton
              variant="primary"
              onClick={() => router.push('/')}
              className="shadow-lg shadow-primary/30"
            >
              {applyPage.backToHome}
            </MagneticButton>
          </div>
        </div>
      </main>
    )
  }

  // Form state
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderWrapper />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 px-6 py-12 sm:px-8 md:px-12 lg:px-16">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'es' ? 'Volver' : 'Back'}
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-4">
              {applyPage.title}
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 mb-2">
              {applyPage.subtitle}
            </p>
            <p className="text-sm text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {applyPage.description}
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 sm:p-8 md:p-10 shadow-xl"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {form.nameLabel} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={form.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-border/40 focus:border-primary focus:ring-primary/20'
                  } bg-background/50 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 transition-all min-h-[44px]`}
                  disabled={isSubmitting}
                  autoFocus
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {form.emailLabel} <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={form.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-border/40 focus:border-primary focus:ring-primary/20'
                  } bg-background/50 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 transition-all min-h-[44px]`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label 
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {form.phoneLabel} <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={form.phonePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-border/40 focus:border-primary focus:ring-primary/20'
                  } bg-background/50 backdrop-blur-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 transition-all min-h-[44px]`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Program Selector */}
              <div>
                <label 
                  htmlFor="program"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {applyPage.programLabel} <span className="text-primary">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.program 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-border/40 focus:border-primary focus:ring-primary/20'
                  } bg-background/50 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 transition-all min-h-[44px] cursor-pointer`}
                  disabled={isSubmitting}
                >
                  <option value="">{applyPage.programPlaceholder}</option>
                  {programOptions.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {errors.program && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.program}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-foreground/60">
                  {applyPage.programHelp}
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 min-h-[44px]"
                >
                  {isSubmitting ? applyPage.submitting : applyPage.submitButton}
                </MagneticButton>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-center text-foreground/50 leading-relaxed">
                {language === 'es' 
                  ? 'Al enviar este formulario, aceptas que te contactemos sobre tu solicitud de membresía.'
                  : 'By submitting this form, you agree to be contacted regarding your membership application.'
                }
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

