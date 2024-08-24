export const colors = ["blue", "green", "yellow", "red"] as const

export type Color = (typeof colors)[number]
