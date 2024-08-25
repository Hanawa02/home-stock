export function generateId() {
  const randomPrefix = Math.random().toString(36).substring(2, 9)
  const timestamp = Date.now().toString(36)

  return `${randomPrefix}${timestamp}`
}
