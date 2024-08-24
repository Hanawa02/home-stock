import type { Meta, StoryObj } from "@storybook/vue3"
import AuthView from "./index.vue"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Views/AuthView",
  component: AuthView,

  argTypes: {
    // msg: { control: 'text' }
  }
} satisfies Meta<typeof AuthView>

export default meta
type Story = StoryObj<typeof meta>

export const View: Story = {
  args: {
    // msg: 'The World says hello'
  }
}
