"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Lock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Search,
  CheckCircle,
  Handshake,
  FilePenLine,
  ClipboardList,
  FileText,
  AlarmCheckIcon as FlagCheckered,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type StepStatus = "locked" | "current" | "complete" | "incomplete"

export interface JourneyStep {
  id: string
  step: string
  title: string
  description: string
  icon: React.ReactNode
  status: StepStatus
  href?: string
  estimatedTime?: string
}

interface SmartJourneyNavigatorProps {
  steps: JourneyStep[]
  currentStepId: string
  onStepChange: (stepId: string) => void
  className?: string
  showMobileSwipe?: boolean
}

const stepIcons = {
  s0: <Target className="h-5 w-5" />,
  s1: <Search className="h-5 w-5" />,
  s2: <CheckCircle className="h-5 w-5" />,
  s3: <Handshake className="h-5 w-5" />,
  s4: <FilePenLine className="h-5 w-5" />,
  s5: <ClipboardList className="h-5 w-5" />,
  s6: <FileText className="h-5 w-5" />,
  s7: <FlagCheckered className="h-5 w-5" />,
  s8: <Rocket className="h-5 w-5" />,
}

export function SmartJourneyNavigator({
  steps,
  currentStepId,
  onStepChange,
  className,
  showMobileSwipe = true,
}: SmartJourneyNavigatorProps) {
  const [isMobile, setIsMobile] = useState(false)
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId)
  const completedSteps = steps.filter((step) => step.status === "complete").length
  const progressPercentage = (completedSteps / steps.length) * 100

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getStepStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "complete":
        return <Check className="h-4 w-4" />
      case "current":
        return <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
      case "incomplete":
        return <AlertCircle className="h-4 w-4" />
      case "locked":
        return <Lock className="h-3 w-3" />
    }
  }

  const getStepStatusColor = (status: StepStatus) => {
    switch (status) {
      case "complete":
        return "bg-primary text-primary-foreground border-primary"
      case "current":
        return "bg-primary/10 text-primary border-primary ring-2 ring-primary/20"
      case "incomplete":
        return "bg-orange-50 text-orange-600 border-orange-200"
      case "locked":
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const canNavigateToStep = (status: StepStatus) => {
    return status === "complete" || status === "current" || status === "incomplete"
  }

  const handleStepClick = (step: JourneyStep) => {
    if (canNavigateToStep(step.status)) {
      onStepChange(step.id)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      onStepChange(steps[currentStepIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onStepChange(steps[currentStepIndex + 1].id)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Your Journey Progress</h2>
          <Badge variant="secondary" className="text-sm">
            {completedSteps} of {steps.length} complete
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {progressPercentage === 100
            ? "🎉 Journey complete! You're ready to acquire a business."
            : `${Math.round(progressPercentage)}% complete - Keep going!`}
        </p>
      </div>

      {/* Desktop Step Navigation */}
      {!isMobile && (
        <div className="hidden md:block mb-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-border -z-10" />
            <div
              className="absolute top-6 left-6 h-0.5 bg-primary transition-all duration-500 -z-10"
              style={{ width: `${(completedSteps / (steps.length - 1)) * 100}%` }}
            />

            {/* Step Dots */}
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  disabled={!canNavigateToStep(step.status)}
                  className={cn(
                    "relative flex flex-col items-center group transition-all duration-200",
                    canNavigateToStep(step.status) ? "cursor-pointer hover:scale-105" : "cursor-not-allowed",
                  )}
                  whileHover={canNavigateToStep(step.status) ? { scale: 1.05 } : {}}
                  whileTap={canNavigateToStep(step.status) ? { scale: 0.95 } : {}}
                >
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 mb-3",
                      getStepStatusColor(step.status),
                    )}
                  >
                    {getStepStatusIcon(step.status)}
                  </div>

                  {/* Step Label */}
                  <div className="text-center max-w-24">
                    <p className="text-xs font-medium text-foreground mb-1">{step.step}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{step.title}</p>
                    {step.estimatedTime && (
                      <p className="text-xs text-muted-foreground mt-1 opacity-75">{step.estimatedTime}</p>
                    )}
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {step.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Step Navigation */}
      {isMobile && (
        <div className="md:hidden mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <p className="text-xs text-muted-foreground">{steps[currentStepIndex]?.title}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="flex items-center gap-2 bg-transparent"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Step Dots */}
          <div className="flex justify-center space-x-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step)}
                disabled={!canNavigateToStep(step.status)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  step.status === "complete"
                    ? "bg-primary"
                    : step.status === "current"
                      ? "bg-primary ring-2 ring-primary/20"
                      : step.status === "incomplete"
                        ? "bg-orange-400"
                        : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Current Step Highlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                getStepStatusColor(steps[currentStepIndex]?.status || "locked"),
              )}
            >
              {stepIcons[currentStepId as keyof typeof stepIcons] || steps[currentStepIndex]?.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-foreground">{steps[currentStepIndex]?.title}</h3>
                {steps[currentStepIndex]?.estimatedTime && (
                  <Badge variant="secondary" className="text-xs">
                    {steps[currentStepIndex].estimatedTime}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{steps[currentStepIndex]?.description}</p>

              {steps[currentStepIndex]?.href && (
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href={steps[currentStepIndex].href}>Get Started</a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
