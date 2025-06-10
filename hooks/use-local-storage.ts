"use client"

import { useState, useEffect, useCallback } from "react"
import { useHospital } from "@/contexts/hospital-context"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { hospitalAtual } = useHospital()

  // Create hospital-specific key
  const hospitalKey = hospitalAtual ? `${hospitalAtual.id}-${key}` : key

  // Initialize state with a function to avoid recreating initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(hospitalKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Memoize the setValue function to prevent unnecessary re-renders
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== "undefined") {
          window.localStorage.setItem(hospitalKey, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.log(error)
      }
    },
    [hospitalKey, storedValue],
  )

  // Reload data when hospital changes (but not on initial render)
  useEffect(() => {
    if (typeof window !== "undefined" && hospitalAtual) {
      try {
        const item = window.localStorage.getItem(hospitalKey)
        const newValue = item ? JSON.parse(item) : initialValue
        setStoredValue(newValue)
      } catch (error) {
        console.log(error)
        setStoredValue(initialValue)
      }
    }
  }, [hospitalAtual]) // Only depend on hospitalAtual, not the full object or initialValue

  return [storedValue, setValue] as const
}
