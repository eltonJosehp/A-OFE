# 💙 Proyecto Web: Aniversario de un Año 💙

## 🐰 Descripción
Un hermoso sitio web temático de Cinnamoroll y Snoopy para celebrar un año de amor. El proyecto incluye una carta de amor inicial y una línea de tiempo interactiva con momentos especiales.

## 📁 Estructura del Proyecto
```
año/
├── index.html          # Página principal con carta de amor
├── timeline.html       # Línea de tiempo de momentos especiales
├── styles.css          # Estilos kawaii con temática azul y rosa
├── script.js           # Animaciones e interactividad
├── assets/            # Carpeta para tus imágenes y videos
└── icons/             # Iconos de Cinnamoroll y Snoopy
```

## 🎨 Características
- ✨ Diseño kawaii con colores pastel (azul, rosa, morado)
- 🐰 Temática de Cinnamoroll y Snoopy con iconos reales
- ☁️ Nubes y estrellas animadas flotantes
- 💙 Animaciones suaves y efectos especiales
- 📱 Diseño responsive (se adapta a móviles)
- 🎬 Soporte para imágenes y videos
- 💫 Efectos de partículas al hacer clic
- 💙 Cursor con corazones animados
- 🎵 Reproductor de música de fondo en ambas páginas
- 🔍 Vista de pantalla completa para cada momento
- ➡️ Navegación suave entre momentos

## 📝 Cómo Personalizar

### 1. Editar la Carta de Amor (index.html)
Abre `index.html` y modifica el texto dentro de `<div class="letter-content">` para personalizar tu mensaje.

### 2. Agregar Tus Fotos y Videos

#### Paso 1: Guarda tus archivos
Coloca tus imágenes y videos en la carpeta `assets/`:
```
assets/
├── momento1.jpg
├── momento2.jpg
├── momento3.mp4
├── momento4.jpg
└── ...
```

#### Paso 2: Reemplaza los placeholders
En `timeline.html`, busca las secciones con `media-placeholder` y reemplázalas:

**Para imágenes:**
```html
<!-- Busca esto: -->
<div class="media-placeholder">
    <span class="emoji-placeholder">📸</span>
    <p class="media-text">Agrega aquí la foto...</p>
</div>

<!-- Reemplaza por: -->
<img src="assets/momento1.jpg" alt="Nuestro primer día">
```

**Para videos:**
```html
<!-- Reemplaza por: -->
<video controls src="assets/momento1.mp4"></video>
```

### 3. Personalizar Momentos
Edita el contenido de cada momento en `timeline.html`:
- **Título**: Cambia el texto dentro de `<h3>`
- **Fecha**: Modifica `<span class="moment-date">`
- **Descripción**: Edita el texto dentro de `<div class="moment-description">`
- **Etiquetas**: Personaliza `<span class="tag">`

### 4. Agregar o Quitar Momentos
Para agregar un momento nuevo, copia toda una sección `<div class="timeline-item">` y pégala donde quieras. No olvides cambiar el número en `<div class="marker-circle">`.

### 5. Cambiar Colores
En `styles.css`, modifica las variables al inicio del archivo:
```css
:root {
    --primary-blue: #A8D8F0;     /* Color principal */
    --light-blue: #C5E7F5;        /* Azul claro */
    --soft-pink: #FFD1DC;         /* Rosa suave */
    --soft-purple: #E6D5F5;       /* Morado suave */
    --cream: #FFF8E7;             /* Crema */
}
```

## 🚀 Cómo Ver el Proyecto

### Opción 1: Abrir directamente
1. Haz doble clic en `index.html`
2. Se abrirá en tu navegador predeterminado

### Opción 2: Con servidor local (recomendado)
```powershell
# Si tienes Python instalado:
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

### Opción 3: Con VS Code Live Server
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"

## 💡 Consejos

1. **Tamaño de imágenes**: Usa imágenes de máximo 1-2MB para que carguen rápido
2. **Formato de videos**: MP4 es el más compatible con todos los navegadores
3. **Nombres de archivos**: Evita espacios y caracteres especiales (usa guiones: `mi-foto.jpg`)
4. **Respaldos**: Guarda una copia de tus fotos originales antes de editarlas

## 🎁 Ideas Adicionales

- 📸 Agrega más momentos copiando las secciones existentes
- 🎵 Agrega música de fondo en `script.js`
- 💌 Personaliza los mensajes con detalles específicos de tu relación
- 🌟 Cambia los emojis por otros que representen mejor tu historia
- 📱 Comparte el link cuando lo publiques en línea

## 🐕 Créditos
- Diseño: Temática kawaii inspirada en Cinnamoroll y Snoopy
- Fuentes: Quicksand & Pacifico (Google Fonts)
- Efectos: Animaciones CSS3 personalizadas

## 💙 ¡Feliz Aniversario!

Espero que este proyecto web haga sonreír a tu persona especial. 
¡Que tengan muchos años más de amor y felicidad juntos! 🐰💙🐕
