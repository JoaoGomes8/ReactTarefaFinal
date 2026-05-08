export async function createMenuItem(menuItemData) {
  const response = await fetch("http://localhost:3000/menu-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao criar item de menu.");
  }

  return data;
}

export async function getMenuItems() {
  const response = await fetch("http://localhost:3000/menu-items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao carregar menu.");
  }

  return data.menuItems;
}

export async function createOrder(orderData) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao criar encomenda.");
  }

  return data;
}

export async function getOrders() {
  const response = await fetch("http://localhost:3000/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao carregar encomendas.");
  }

  return data.orders;
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao atualizar estado da encomenda.");
  }

  return data;
}
