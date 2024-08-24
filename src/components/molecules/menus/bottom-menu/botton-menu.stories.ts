import type { Meta, StoryObj } from "@storybook/vue3"

import BottomMenu from "./index.vue"

const meta = {
  title: "Components/Menus/BottomMenu",
  component: BottomMenu,

  argTypes: {
    menuItems: {
      control: {
        type: "object"
      }
    }
  }
} satisfies Meta<typeof BottomMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Menu: Story = {
  args: {
    menuItems: [
      {
        label: "Home",
        icon: "home",
        clickFunction: () => {
          console.log("Home clicked")
        }
      },
      {
        label: "Shopping List",
        icon: "list",
        clickFunction: () => {
          console.log("Shopping List clicked")
        }
      }
    ]
  }
}
