import type { Meta, StoryObj } from "@storybook/vue3"

import GoogleButton from "./GoogleButton.vue"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Buttons/GoogleButton",
  component: GoogleButton,

  argTypes: {}
} satisfies Meta<typeof GoogleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Button: Story = {
  args: {}
}
