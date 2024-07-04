async function handleAdd(data, type) {
  const response = await fetch(`http://localhost:3000/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    console.log("Added");
  } else {
    console.log("Error");
  }
  return response;
}

async function handleEdit(data, id, type) {
  const response = await fetch(`http://localhost:3000/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    console.log("Edited");
  } else {
    console.log("Error");
  }
  return response;
}

async function handleDelete(id, type) {
  const response = await fetch(`http://localhost:3000/${type}/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Deleted");
  } else {
    console.log("Error");
  }
  return response;
}

export { handleAdd, handleEdit, handleDelete };
