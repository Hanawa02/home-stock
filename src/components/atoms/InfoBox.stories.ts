import type { Meta, StoryObj } from "@storybook/vue3"
import InfoBox from "./InfoBox.vue"

import { colors } from "~/common-types/color"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Atoms/InfoBox",
  component: InfoBox,
  argTypes: {
    color: { control: "select", options: colors }
  },
  args: {
    default: "This is an Info Box"
  }
} satisfies Meta<typeof InfoBox>

export default meta
type Story = StoryObj<typeof meta>

export const Blue: Story = {
  args: {
    color: "blue"
  }
}
