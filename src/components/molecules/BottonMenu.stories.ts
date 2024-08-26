import type { Meta, StoryObj } from "@storybook/vue3"

import BottomMenu from "./BottomMenu.vue"

const meta = {
  title: "Components/BottomMenu",
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
        routeName: "fake-home-route",
        routeParams: { id: "1" }
      },
      {
        label: "Shopping List",
        icon: "list",
        routeName: "fake-shopping-list-route",
        routeParams: { id: "1" }
      }
    ]
  }
}
