# Gestor de Rutas de Clientes

Esta es una aplicación web sencilla (HTML, CSS, JS) para gestionar rutas de clientes de forma flexible, optimizada para usar en Google Chrome en iPhone (o cualquier navegador moderno móvil/PC). No requiere backend, todos los datos se almacenan localmente en el navegador mediante **localStorage**.

## Cómo abrir y usar la aplicación

1. **Abrir la aplicación:** Descarga el proyecto y abre el archivo `index.html` en Chrome (en iPhone, puedes alojar el archivo en algún sitio o usar una app de almacenamiento para abrirlo, o ejecutar un servidor web local y acceder vía URL). Al abrir, verás un menú desplegable con rutas.

2. **Seleccionar ruta:** Elige una de las 5 rutas predefinidas (Ruta 1 a Ruta 5) o la ruta especial "Clientes que llaman" desde el desplegable. La lista de clientes de la ruta seleccionada aparecerá en pantalla como *ruta activa*.

3. **Marcar clientes visitados:** Toca en la casilla de verificación (checkbox) junto a un cliente para marcarlo como "visitado". El nombre se tachará indicando que ya fue visitado.

4. **Reordenar clientes:** Puedes reorganizar manualmente el orden de los clientes:
   - Arrastra y suelta un elemento de la lista para moverlo a otra posición (mantén presionado y arrastra en Chrome desktop; en iPhone, puedes usar los botones).
   - O utiliza los botones "▲" (subir) y "▼" que aparecen a la derecha de cada cliente para moverlo hacia arriba o abajo en la lista.

5. **Eliminar clientes:** Haz clic en el botón "✕" a la derecha de un cliente para quitarlo de la ruta activa.

6. **Añadir nuevos clientes:** En la parte inferior, utiliza el campo "Nuevo cliente..." para agregar clientes a la ruta activa:
   - Puedes **escribir un nombre** manualmente y pulsar "Añadir".
   - El campo ofrece sugerencias de nombres provenientes de *otras rutas* (incluyendo "Clientes que llaman"). Por ejemplo, comienza a escribir y selecciona un cliente existente de otra ruta para añadirlo rápidamente.
   - El cliente nuevo aparecerá al final de la lista (puedes luego reordenarlo como necesites).

7. **Persistencia de cambios:** Cualquier cambio que realices (visitados, orden, añadidos/eliminados) se guarda automáticamente en la memoria local del navegador. Si cierras o recargas la página, la ruta activa y su estado permanecerán igual que antes, para que puedas continuar donde lo dejaste. *(Nota: los cambios no afectan a las rutas base originales en el código, solo a tu lista activa almacenada en el navegador.)*

8. **Resetear Día:** Para comenzar de nuevo con la ruta activa en su orden original, pulsa el botón **"Resetear Día"**. Esto eliminará todos los cambios realizados (marcas de visitado, nuevos clientes añadidos, etc.) y restaurará la ruta activa a su estado inicial predefinido.

## Colores y diseño

- **Fondo principal:** marrón oscuro (#5C4033), para reducir fatiga visual.
- **Color de realce:** naranja vivo (#FFA500) para destacar elementos interactivos (bordes del selector, botones, iconos de acción).
- **Texto:** blanco sobre el fondo marrón para alto contraste y legibilidad.

La interfaz está pensada para caber en la pantalla del iPhone (layout responsive) y los elementos táctiles (botones, checkboxes) se han dimensionado para facilitar su pulsación con el dedo.

¡Eso es todo! Ahora puedes gestionar tus rutas diarias de clientes de manera flexible desde tu dispositivo móvil. 🎉
