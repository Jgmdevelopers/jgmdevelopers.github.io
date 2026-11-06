# Portfolio de Gabriel Molina

Sitio estático profesional creado con HTML, CSS y JavaScript, preparado para GitHub Pages.

## Desarrollo local

Abrir `index.html` en un navegador. No requiere dependencias ni compilación.

## Publicación

1. Crear un repositorio público `Jgmdevelopers.github.io` en GitHub bajo la cuenta `Jgmdevelopers` (respetar el nombre de usuario).
2. Copiar `index.html`, `assets/` y `.nojekyll` a la raíz del repositorio.
3. En Settings > Pages, seleccionar `Deploy from a branch` y `main` / `(root)`.
4. Revisar la publicación en `https://jgmdevelopers.github.io/` una vez completado el despliegue.

## GM.DEV v1.1 — interacciones accesibles

- Transiciones de tarjetas y revelado progresivo, sin librerías externas.
- Respeto por `prefers-reduced-motion`; el contenido no depende de JavaScript para ser visible.
- Menú móvil con Escape, sincronización ARIA y cierre al ampliar pantalla.
- Navegación activa con `aria-current="location"` cuando la sección es visible.

### Pruebas de aceptación manuales

1. Servir el proyecto localmente (`python -m http.server 8000`).
2. Probar 390 px, 768 px y escritorio; sin desplazamiento horizontal.
3. Validar menú móvil con mouse, teclado, Escape y cambio de tamaño.
4. Activar movimiento reducido en el sistema: no debe aparecer efecto de revelado.
5. Desactivar JavaScript: todos los textos y proyectos deben seguir visibles.
6. Verificar enlaces, navegación, foco y consola sin errores.

## Pendientes antes de publicar

- Confirmar que el correo de contacto y los enlaces públicos sean los deseados.
- Revisar el estado actual de cada proyecto y la información que puede divulgarse.
- Añadir imágenes propias de proyectos cuando existan y estén autorizadas.
- Comprobar en móvil y escritorio, los enlaces y la accesibilidad.

## Privacidad

No incluir datos sensibles, claves, código o capturas internas de sistemas institucionales.
