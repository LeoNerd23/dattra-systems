"use client"

import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key)
      // Analisar o item armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Se ocorrer erro, retornar initialValue
      console.log(error)
      return initialValue
    }
  })

  // Retornar uma versão encapsulada da função setter do useState
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Salvar estado
      setStoredValue(valueToStore)
      // Salvar no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Uma implementação mais avançada trataria o caso de erro
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}
