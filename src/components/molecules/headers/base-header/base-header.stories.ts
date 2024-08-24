import type { Meta, StoryObj } from "@storybook/vue3"

import BaseHeader from "./index.vue"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Headers/BaseHeader",
  component: BaseHeader,

  argTypes: {}
} satisfies Meta<typeof BaseHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {}
}
