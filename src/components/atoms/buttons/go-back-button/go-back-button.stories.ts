import type { Meta, StoryObj } from "@storybook/vue3"

import GoBackButton from "./index.vue"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Buttons/GoBackButton",
  component: GoBackButton,

  argTypes: {}
} satisfies Meta<typeof GoBackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Button: Story = {
  args: {}
}
