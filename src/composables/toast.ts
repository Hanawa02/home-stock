import { ref } from "vue"

export type Color = "blue" | "green" | "yellow" | "red"
export interface Toast {
  id: string
  text: string
  color: Color
}

const READING_TIME_MS = 6000

const toasts = ref<Toast[]>([])

export function useToast() {
  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((item) => item.id !== id)
  }

  const addToast = (text: string, options?: Partial<{ id?: string; color: Color }>) => {
    const { id, color } = options || {}
    const toast = { text, id: id ?? Math.random().toFixed(16), color: color ?? "blue" }

    toasts.value.push(toast)

    setTimeout(() => removeToast(toast.id), READING_TIME_MS)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}
