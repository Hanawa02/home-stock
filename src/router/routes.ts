const routes = {
  root: {
    path: "/",
    name: "root"
  },
  homes: {
    settings: {
      path: "/homes/:id",
      name: "home-settings"
    },
    shoppingList: {
      path: "/homes/:id/shopping-list",
      name: "homes-shoppingList"
    },
    stock: {
      path: "/homes/:id/stock",
      name: "homes-stock"
    }
  }
}

export default routes
