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
