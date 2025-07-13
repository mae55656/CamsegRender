const API_URL_BASE = 'http://192.168.1.5:8000/api'; // Cambia si usas hosting remoto

document.addEventListener('DOMContentLoaded', () => {
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin || !admin.id) {
    alert('Debes iniciar sesión como administrativo.');
    window.location.href = 'loginadmin.html';
    return;
  }

  document.getElementById('adminNombre').textContent = `Bienvenido, ${admin.nombre}`;
  actualizarPedidos();
  actualizarClientes();

document.getElementById('formEditarAdmin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('editAdminId').value;
    const cliente_id = document.getElementById('editClienteId').value;

  const servicio = document.getElementById('editServicio').value;
  const detalles = document.getElementById('editDetalles').value;
  const estado = document.getElementById('editEstado').value;
  const precio_estimado = document.getElementById('editPrecio').value;

  const datos = {
    servicio,
    detalles,
    estado,
    precio_estimado
  };

  try {
    const res = await fetch(`${API_URL_BASE}/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (res.ok) {
      alert('Pedido actualizado correctamente');
      cerrarModalAdmin();
      actualizarPedidos();
    } else {
      alert('Error al actualizar el pedido');
    }
  } catch (error) {
    console.error('Error al enviar actualización:', error);
    alert('Error de red');
  }
});


//////////////////////////////////////////////////
// Filtros de pedidos
document.getElementById('filtroPedidoId')?.addEventListener('input', aplicarFiltrosPedidos);
document.getElementById('filtroClienteId')?.addEventListener('input', aplicarFiltrosPedidos);
document.getElementById('filtroServicio')?.addEventListener('input', aplicarFiltrosPedidos);
document.getElementById('filtroDetalles')?.addEventListener('input', aplicarFiltrosPedidos);
document.getElementById('filtroEstado')?.addEventListener('input', aplicarFiltrosPedidos);
document.getElementById('filtroPrecio')?.addEventListener('input', aplicarFiltrosPedidos);

// Filtros de clientes
document.getElementById('filtroClienteIdTabla')?.addEventListener('input', aplicarFiltrosClientes);
document.getElementById('filtroNombre')?.addEventListener('input', aplicarFiltrosClientes);
document.getElementById('filtroDni')?.addEventListener('input', aplicarFiltrosClientes);
document.getElementById('filtroTelefono')?.addEventListener('input', aplicarFiltrosClientes);
document.getElementById('filtroEmail')?.addEventListener('input', aplicarFiltrosClientes);
document.getElementById('filtroDireccion')?.addEventListener('input', aplicarFiltrosClientes);


//////////////////////////////////////////////////
document.getElementById('formEditarCliente').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('clienteEditId').value;
  const datos = {
    nombre: document.getElementById('clienteEditNombre').value,
    dni: document.getElementById('clienteEditDni').value,
    telefono: document.getElementById('clienteEditTelefono').value,
    email: document.getElementById('clienteEditEmail').value,
    direccion: document.getElementById('clienteEditDireccion').value
  };

  try {
    const res = await fetch(`${API_URL_BASE}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (res.ok) {
      alert('Cliente actualizado correctamente');
      cerrarModalCliente();
      actualizarClientes();
    } else {
      const errorText = await res.text();
      console.error('Error al actualizar cliente:', errorText);
      alert('Error al actualizar el cliente.');
    }
  } catch (err) {
    console.error('Error de red:', err);
    alert('No se pudo conectar con el servidor.');
  }
});

});

// Alternar entre secciones
function mostrarSeccion(seccion) {
  document.getElementById('seccionPedidos').classList.add('hidden');
  document.getElementById('seccionClientes').classList.add('hidden');

  if (seccion === 'pedidos') {
    document.getElementById('seccionPedidos').classList.remove('hidden');
  } else if (seccion === 'clientes') {
    document.getElementById('seccionClientes').classList.remove('hidden');
  }
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('admin');
  window.location.href = 'loginadmin.html';
}

// Cargar pedidos
function actualizarPedidos() {
  fetch(`${API_URL_BASE}/pedidos`)
    .then(res => res.json())
    .then(data => {
      const cuerpo = document.getElementById('cuerpoPedidos');
      cuerpo.innerHTML = '';

      data.forEach(pedido => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td class="border px-4 py-2">${pedido.pedido_id}</td>
          <td class="border px-4 py-2">${pedido.cliente_id}</td>
          <td class="border px-4 py-2">${pedido.servicio}</td>
          <td class="border px-4 py-2">${pedido.detalles}</td>
          <td class="border px-4 py-2">${pedido.estado}</td>
          <td class="border px-4 py-2">S/ ${pedido.precio_estimado}</td>
          <td class="border px-4 py-2 space-x-2 text-center">
            <button onclick="editarPedido(${pedido.pedido_id})" class="text-blue-600 hover:text-blue-700" title="Editar">
                <i data-lucide="edit" class="w-5 h-5"></i>
            </button>
            <button onclick="eliminarPedido(${pedido.pedido_id})" class="text-red-600 hover:text-red-700" title="Eliminar">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
            </td>
        `;
        cuerpo.appendChild(fila);
      });
    })
    .catch(err => console.error('Error al cargar pedidos:', err));
}

// Cargar clientes
function actualizarClientes() {
  fetch(`${API_URL_BASE}/clientes`)
    .then(res => res.json())
    .then(data => {
      const cuerpo = document.getElementById('cuerpoClientes');
      cuerpo.innerHTML = '';

      data.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td class="border px-4 py-2">${cliente.id}</td>
          <td class="border px-4 py-2">${cliente.nombre}</td>
          <td class="border px-4 py-2">${cliente.dni}</td>
          <td class="border px-4 py-2">${cliente.telefono}</td>
          <td class="border px-4 py-2">${cliente.email}</td>
          <td class="border px-4 py-2">${cliente.direccion}</td>
          <td class="border px-4 py-2 text-center space-x-2">
            <button onclick="editarCliente(${cliente.id})" class="text-yellow-500 hover:text-yellow-600" title="Editar">
              <i data-lucide="edit" class="w-5 h-5"></i>
            </button>
            <button onclick="eliminarCliente(${cliente.id})" class="text-red-600 hover:text-red-700" title="Eliminar">
              <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
          </td>
        `;
        cuerpo.appendChild(fila);
      });

     
      lucide.createIcons();
    })
    .catch(err => console.error('Error al cargar clientes:', err));
}


// Eliminar pedido
function eliminarPedido(pedido_id) {
  if (!confirm(`¿Eliminar el pedido ${pedido_id}?`)) return;

  fetch(`${API_URL_BASE}/pedidos/${pedido_id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        alert('Pedido eliminado');
        actualizarPedidos();
      } else {
        alert('Error al eliminar pedido');
      }
    })
    .catch(err => console.error(err));
}

// Eliminar cliente
function eliminarCliente(id) {
  if (!confirm(`¿Eliminar el cliente ${id}?`)) return;

  fetch(`${API_URL_BASE}/clientes/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        alert('Cliente eliminado');
        actualizarClientes();
      } else {
        alert('Error al eliminar cliente');
      }
    })
    .catch(err => console.error(err));
}

// Editar pedido (a implementar con modal si lo deseas)
function editarPedido(id) {
  alert(`Aquí se abriría el modal para editar el pedido ${id}`);
  // Aquí puedes reutilizar tu modal existente o crear uno nuevo.
}

// Editar cliente (a implementar con modal si lo deseas)
function editarCliente(id) {
  alert(`Aquí se abriría el modal para editar el cliente ${id}`);
}

function editarPedido(id) {
  fetch(`${API_URL_BASE}/pedidos/${id}`)
    .then(res => res.json())
    .then(pedido => {
      document.getElementById('editAdminId').value = pedido.pedido_id;
      document.getElementById('editClienteId').value = pedido.cliente_id;
      document.getElementById('editServicio').value = pedido.servicio;
      document.getElementById('editDetalles').value = pedido.detalles;
      document.getElementById('editEstado').value = pedido.estado;
      document.getElementById('editPrecio').value = pedido.precio_estimado;

      document.getElementById('modalEditarAdmin').classList.remove('hidden');
    })
    .catch(err => {
      console.error('Error al cargar pedido:', err);
      alert('Error al obtener datos del pedido');
    });
}   

function cerrarModalAdmin() {
  document.getElementById('modalEditarAdmin').classList.add('hidden');
}

function editarCliente(id) {
  fetch(`${API_URL_BASE}/clientes/${id}`)
    .then(res => res.json())
    .then(cliente => {
      document.getElementById('clienteEditId').value = cliente.id;
      document.getElementById('clienteEditNombre').value = cliente.nombre;
      document.getElementById('clienteEditDni').value = cliente.dni;
      document.getElementById('clienteEditTelefono').value = cliente.telefono;
      document.getElementById('clienteEditEmail').value = cliente.email;
      document.getElementById('clienteEditDireccion').value = cliente.direccion;

      document.getElementById('modalEditarCliente').classList.remove('hidden');
    })
    .catch(err => {
      console.error('Error al cargar cliente:', err);
      alert('No se pudo cargar el cliente.');
    });
}
function cerrarModalCliente() {
  document.getElementById('modalEditarCliente').classList.add('hidden');
}


document.getElementById('buscadorPedidos').addEventListener('input', function () {
  const valor = this.value.toLowerCase();
  const filas = document.querySelectorAll('#tablaPedidos tbody tr');

  filas.forEach(fila => {
    const textoFila = fila.textContent.toLowerCase();
    fila.style.display = textoFila.includes(valor) ? '' : 'none';
  });
});


function aplicarFiltrosPedidos() {
  const id = document.getElementById('filtroPedidoId').value.toLowerCase();
  const clienteId = document.getElementById('filtroClienteId').value.toLowerCase();
  const servicio = document.getElementById('filtroServicio').value.toLowerCase();
  const detalles = document.getElementById('filtroDetalles').value.toLowerCase();
  const estado = document.getElementById('filtroEstado').value.toLowerCase();
  const precioMin = parseFloat(document.getElementById('filtroPrecio').value);

  const filas = document.querySelectorAll('#tablaPedidos tbody tr');
  filas.forEach(fila => {
    const celdas = fila.getElementsByTagName('td');
    const precio = parseFloat(celdas[5].textContent.replace('S/', '').trim());

    const coincide =
      celdas[0].textContent.toLowerCase().includes(id) &&
      celdas[1].textContent.toLowerCase().includes(clienteId) &&
      celdas[2].textContent.toLowerCase().includes(servicio) &&
      celdas[3].textContent.toLowerCase().includes(detalles) &&
      celdas[4].textContent.toLowerCase().includes(estado) &&
      (isNaN(precioMin) || precio >= precioMin);

    fila.style.display = coincide ? '' : 'none';
  });
}

function aplicarFiltrosClientes() {
  const id = document.getElementById('filtroClienteIdTabla').value.toLowerCase();
  const nombre = document.getElementById('filtroNombre').value.toLowerCase();
  const dni = document.getElementById('filtroDni').value.toLowerCase();
  const telefono = document.getElementById('filtroTelefono').value.toLowerCase();
  const email = document.getElementById('filtroEmail').value.toLowerCase();
  const direccion = document.getElementById('filtroDireccion').value.toLowerCase();

  const filas = document.querySelectorAll('#tablaClientes tbody tr');

  filas.forEach(fila => {
    const celdas = fila.getElementsByTagName('td');
    const coincide =
      celdas[0].textContent.toLowerCase().includes(id) &&
      celdas[1].textContent.toLowerCase().includes(nombre) &&
      celdas[2].textContent.toLowerCase().includes(dni) &&
      celdas[3].textContent.toLowerCase().includes(telefono) &&
      celdas[4].textContent.toLowerCase().includes(email) &&
      celdas[5].textContent.toLowerCase().includes(direccion);

    fila.style.display = coincide ? '' : 'none';
  });
}



['filtroIdPedido', 'filtroCliente', 'filtroServicio', 'filtroDetalles', 'filtroEstado', 'filtroPrecio']
  .forEach(id => {
    document.getElementById(id).addEventListener('input', aplicarFiltrosTablaPedidos);
    document.getElementById(id).addEventListener('change', aplicarFiltrosTablaPedidos);
  });
