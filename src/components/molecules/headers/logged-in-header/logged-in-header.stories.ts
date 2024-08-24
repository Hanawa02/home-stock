import type { Meta, StoryObj } from "@storybook/vue3"

import LoggedInHeader from "./index.vue"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Components/Headers/LoggedInHeader",
  component: LoggedInHeader,

  argTypes: {}
} satisfies Meta<typeof LoggedInHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {}
}
