"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
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
  ArrowRight,
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
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId)
  const completedSteps = steps.filter((step) => step.status === "complete").length
  const progressPercentage = (completedSteps / steps.length) * 100

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getStepStatusColor = (status: StepStatus, index: number) => {
    if (index === currentStepIndex) {
      return "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
    }
    return "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
  }

  const handleStepClick = (step: JourneyStep, index: number) => {
    onStepChange(step.id)
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
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Your Journey Progress</h2>
            <p className="text-muted-foreground">Navigate through the complete roadmap</p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Badge variant="secondary" className="text-base px-4 py-2 font-semibold">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
          </motion.div>
        </div>

        <div className="relative">
          <Progress value={((currentStepIndex + 1) / steps.length) * 100} className="h-3 bg-muted/30" />
          <motion.div
            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-primary/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-muted-foreground">
            Navigate freely through all {steps.length} steps of the business acquisition process
          </p>
        </div>
      </motion.div>

      {!isMobile && (
        <div className="hidden md:block mb-12">
          <div className="relative px-6">
            {/* Enhanced Connection Line with Gradient */}
            <div className="absolute top-8 left-12 right-12 h-1 bg-gradient-to-r from-muted via-border to-muted rounded-full -z-10" />
            <motion.div
              className="absolute top-8 left-12 h-1 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full -z-10 shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / Math.max(steps.length - 1, 1)) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            />

            {/* Enhanced Step Dots */}
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleStepClick(step, index)}
                    onHoverStart={() => setHoveredStep(step.id)}
                    onHoverEnd={() => setHoveredStep(null)}
                    className="relative flex flex-col items-center group transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={cn(
                        "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 mb-4 relative overflow-hidden font-bold text-lg",
                        getStepStatusColor(step.status, index),
                        hoveredStep === step.id && "transform-gpu",
                      )}
                      animate={
                        index === currentStepIndex
                          ? {
                              boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                                "0 0 0 10px rgba(59, 130, 246, 0)",
                                "0 0 0 0 rgba(59, 130, 246, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: index === currentStepIndex ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {/* Background Shimmer Effect for Current Step */}
                      {index === currentStepIndex && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      )}

                      <span>{index}</span>
                    </motion.div>

                    {/* Enhanced Step Label */}
                    <div className="text-center max-w-28">
                      <motion.p
                        className="text-sm font-bold text-foreground mb-1"
                        animate={hoveredStep === step.id ? { scale: 1.05 } : { scale: 1 }}
                      >
                        {step.step}
                      </motion.p>
                      <p className="text-sm text-muted-foreground leading-tight font-medium">{step.title}</p>
                    </div>

                    {/* Enhanced Tooltip */}
                    <AnimatePresence>
                      {hoveredStep === step.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-popover/95 backdrop-blur-sm text-popover-foreground px-4 py-3 rounded-xl shadow-xl text-sm z-20 border border-border/50 max-w-64"
                        >
                          <p className="font-medium mb-1">{step.title}</p>
                          <p className="text-xs opacity-90">{step.description}</p>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover/95" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="md:hidden mb-8">
          <motion.div
            className="flex items-center justify-between mb-6 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="text-center">
              <motion.p
                className="text-base font-bold text-foreground"
                key={currentStepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Step {currentStepIndex + 1} of {steps.length}
              </motion.p>
              <p className="text-sm text-muted-foreground font-medium">{steps[currentStepIndex]?.title}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <div className="flex justify-center space-x-3 mb-4">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(step, index)}
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 relative",
                  index === currentStepIndex
                    ? "bg-primary shadow-lg shadow-primary/30"
                    : "bg-muted hover:bg-muted-foreground/20",
                )}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
              >
                {index === currentStepIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-xl shadow-black/5 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex items-start gap-6">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            >
              {/* Icon Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                {stepIcons[currentStepId as keyof typeof stepIcons] || steps[currentStepIndex]?.icon}
              </motion.div>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <motion.h3
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[currentStepIndex]?.title}
                </motion.h3>
              </div>

              <motion.p
                className="text-muted-foreground mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {steps[currentStepIndex]?.description}
              </motion.p>

              {steps[currentStepIndex]?.href && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <a href={steps[currentStepIndex].href} className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
