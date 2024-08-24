const routes = {
  homeList: {
    path: "/",
    name: "home-list"
  },
  home: {
    settings: {
      path: "/homes/:id",
      name: "home-settings"
    },
    shoppingList: {
      path: "/homes/:id/shopping-list",
      name: "home-shoppingList"
    },
    stock: {
      path: "/homes/:id/stock",
      name: "home-stock"
    }
  }
}

export default routes
