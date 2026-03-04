# Diagnóstico de Despliegue en Hostinger (Error 503)

Para diagnosticar por qué el backend de Next.js está fallando (Error 503), revisa las siguientes piezas clave de tu proyecto:

### 1. Estructura del Proyecto (`package.json`)
El archivo `package.json` es la radiografía principal. Permite ver si es Next.js puro, qué versión usa y cómo se ejecuta.
*   **Dependencies:** Listado de librerías.
*   **Scripts:** Comandos de `build`, `start` y `dev`.
*   **Versión de Next y React.**
*   **Nota:** Determina si el proyecto necesita Node corriendo o si podría ser estático.

### 2. Configuración de Next (`next.config.*`)
Revisa `next.config.js` o `next.config.mjs` para ver configuraciones críticas:
*   `output: "standalone"`
*   `output: "export"`
*   Experimental features y Server Actions.
*   **Nota:** Esto define cómo debe desplegarse la app.

### 3. Estructura de Carpetas
La organización de las carpetas confirma si necesitas un backend activo:
*   `/app` (App Router moderno)
*   `/pages/api` (API routes tradicionales)
*   Archivos `actions.ts` o server actions.

### 4. Código del Formulario o Acción
Identifica el archivo donde se envían datos (como `phone` y `language`).
*   Busca etiquetas `<form action={sendPhone}>` o funciones con `"use server"`.
*   **Nota:** Revela qué endpoint está intentando ejecutar la aplicación.

### 5. Método de Despliegue en Hostinger
Cómo subiste la app cambia el diagnóstico:
*   ZIP al File Manager.
*   Git deploy.
*   Configuración como "Node.js app".
*   Hosting compartido (Shared) o VPS.

### 6. Scripts de Arranque
En `package.json`, verifica los scripts:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```
*   **IMPORTANTE:** Si el servidor no está ejecutando `next start`, el backend nunca arranca.

### 7. Respuesta HTML del Error 503
El cuerpo del error 503 suele revelar al culpable. Busca mensajes como:
*   `origin unreachable`
*   `upstream timeout`
*   `node process crashed`
*   `method blocked by proxy`

### 8. Versión de Node en el Servidor
Next.js moderno requiere Node 18+ o 20+. Si el servidor corre una versión vieja, las acciones se romperán.

---

**Resumen de lo más rápido para compartir y revisar:**
1.  `package.json`
2.  `next.config.*`
3.  Estructura de carpetas.
4.  Archivo del formulario/server action.
5.  Método de despliegue en Hostinger.
