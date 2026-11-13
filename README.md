# ⚡ Kernel Study - Plataforma de Exámenes Tipo Test y Estudio ASIR

> Aplicación web moderna inspirada en **Thea**, diseñada para la preparación de exámenes de ASIR (Administración de Sistemas Informáticos en Red) mediante simulacros oficiales con cronómetro, corrección interactiva (*Active Recall*), tarjetas de memoria (*Flashcards*) y analíticas de rendimiento.

---

## 🚀 Características Principales

- **🎯 Modo Simulacro Oficial**:
  - Cronómetro regresivo con alertas visuales de tiempo.
  - Hoja de navegación de preguntas (preguntas respondidas, no contestadas y marcadas con duda).
  - Cálculo oficial de nota (0 a 10) con **penalización configurable** (ej. 3 fallos restan 1 acierto, baremo oficial de oposiciones en España).
  - Posibilidad de dejar preguntas en blanco para evitar penalizaciones.

- **💡 Modo Estudio Inteligente (*Smart Study*)**:
  - Corrección inmediata al pulsar cada respuesta con efectos de sonido.
  - Explicación pedagógica desplegable (*"¿Por qué esta es la opción correcta?"*).
  - Feedback visual con colores e iconografía elegante.

- **🗂️ Modo Tarjetas de Memoria (*Flashcards*)**:
  - Tarjetas interactivas con giro 3D para activar la memoria a largo plazo (*Spaced Repetition*).
  - Clasificación de conceptos: *"Aún no me lo sé"* vs *"¡Me lo sé perfecto!"*.

- **🧠 Banco de Fallos y Modo Refuerzo**:
  - Registro automático de cada pregunta que el usuario falla.
  - Botón de 1 clic para generar un examen adaptativo centrado exclusivamente en corregir los puntos débiles.

- **🤖 Creador de Exámenes Multi-Formato**:
  - **Generador con IA**: Genera exámenes a partir de cualquier temario, apuntes o texto mediante la API gratuita de Google Gemini.
  - **Importador de Texto**: Pega tus apuntes o preguntas en formato libre o A, B, C, D con detección automática.
  - **Editor Manual**: Formulario intuitivo para redactar preguntas, opciones y explicaciones.
  - **Importador JSON**: Compatible con archivos `.json` descargados.

- **🔗 Compartir Tests Descentralizado (Sin Servidor ni Costes)**:
  - Genera enlaces directos que contienen todo el examen codificado en la URL. Cualquier persona que abra el enlace podrá realizar el examen al instante sin necesidad de registrarse ni de base de datos.

- **📊 Panel de Estadísticas y Progreso**:
  - Histórico de exámenes, nota media, porcentaje de efectividad y registro de aciertos/fallos.

---

## 💻 Ejecución Local

Si deseas probar la aplicación en tu propio ordenador:

```bash
# 1. Instalar dependencias (ya instaladas)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

Para compilar la versión optimizada de producción:
```bash
npm run build
```
Los archivos finales listos para publicar se generarán en la carpeta `dist/`.

---

## 🌐 Cómo Alojar la Aplicación Gratis

Puedes alojar esta web de forma **100% gratuita y para siempre**, con certificado de seguridad HTTPS (el candado verde) y dominio propio o subdominio gratuito:

### Opción 1: Vercel (Recomendada - 1 Minuto)

1. Abre tu terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npx vercel
   ```
2. Inicia sesión con tu cuenta gratuita de GitHub, Google o email.
3. Acepta los valores predeterminados pulsando `Enter`.
4. ¡Listo! Vercel te proporcionará una URL pública gratuita del tipo:
   `https://tu-nombre-de-examen.vercel.app`

*(También puedes vincular tu repositorio de GitHub directamente desde [vercel.com](https://vercel.com)).*

---

### Opción 2: Netlify (Arrastrar y Soltar)

1. Ejecuta `npm run build` en tu terminal.
2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastra la carpeta **`dist`** generada directamente a la pantalla de Netlify.
4. En 10 segundos tu web estará publicada con una dirección gratuita `https://nombre.netlify.app`.

---

### Opción 3: GitHub Pages

1. Sube el código a un repositorio en tu cuenta de GitHub.
2. En GitHub, ve a **Settings** > **Pages**.
3. En la sección **Build and deployment**, selecciona **GitHub Actions** con la plantilla de Vite o utiliza la rama `gh-pages`.

---

## 🔍 Cómo Aparecer en Google de Forma Gratuita (SEO)

Para que cualquier persona pueda encontrar tu aplicación buscando en Google (por ejemplo al buscar *"test oposiciones gratis"*, *"simulador de examen"*, o el nombre de tu aplicación), la web ya cuenta con toda la arquitectura técnica de SEO:

### 1. Elementos SEO ya configurados en el código:
- **`index.html`**:
  - Metaetiquetas de título, descripción optimizada y palabras clave.
  - Open Graph y Twitter Cards para que se vea con imagen y tarjeta atractiva al compartirla por WhatsApp, Telegram, Twitter o LinkedIn.
  - **Schema.org JSON-LD**: Datos estructurados reconocidos por el algoritmo de Google como `WebApplication` y recurso educativo interactivo.
- **`public/robots.txt`**: Permite el rastreo total por parte de Googlebot y Bingbot.
- **`public/sitemap.xml`**: Mapa del sitio para indexación rápida.

### 2. Pasos para indexarla en Google Search Console:
1. Una vez que hayas alojado la web (en Vercel o Netlify), copia su enlace (ej: `https://mi-examen-thea.vercel.app`).
2. Entra en **[Google Search Console](https://search.google.com/search-console)** con tu cuenta de Google.
3. Haz clic en **Añadir propiedad** y selecciona **Prefijo de la URL**, pegando el enlace de tu web.
4. Si usas Vercel o Netlify, puedes verificar la propiedad subiendo el archivo HTML de verificación o mediante la etiqueta meta en `index.html`.
5. Una vez verificada:
   - Ve a la sección **Sitemaps** en el menú de la izquierda e introduce `sitemap.xml`.
   - En la barra de búsqueda superior de Google Search Console, introduce la URL de tu página y pulsa en **"Solicitar indexación"**.
6. En un plazo habitual de **24 a 48 horas**, Google habrá rastreado tu web e indexado la aplicación para aparecer en los resultados de búsqueda globales.

---

## 📁 Estructura del Proyecto

```text
├── public/
│   ├── favicon.svg          # Logotipo pluma Thea y estrellas
│   ├── manifest.json        # Configuración Progressive Web App (PWA)
│   ├── robots.txt           # Directivas para rastreadores de Google
│   └── sitemap.xml          # Mapa del sitio para Google Search Console
├── src/
│   ├── components/
│   │   ├── TheaLogo.tsx            # Logo vectorial idéntico a Thea
│   │   ├── Navbar.tsx              # Barra de navegación interactiva
│   │   ├── HeroSection.tsx         # Portada con buscador y filtros
│   │   ├── ExamCard.tsx            # Ficha de test con modos y compartir
│   │   ├── ExamRunner.tsx          # Motor de examen (tiempo, penalización, dudas)
│   │   ├── ExamResults.tsx         # Desglose de notas, corrección y refuerzo
│   │   ├── FlashcardRunner.tsx     # Tarjetas de memoria activa en 3D
│   │   ├── ExamCreatorModal.tsx    # Creador con IA, texto y manual
│   │   ├── UserStatsView.tsx       # Estadísticas y banco de fallos
│   │   └── DeployGuideModal.tsx    # Modal con guía de publicación y SEO
│   ├── data/
│   │   └── defaultExams.ts         # Exámenes iniciales (Constitución, Ciencia, IA)
│   ├── services/
│   │   ├── storage.ts              # Persistencia local y compresión de URL
│   │   └── aiGenerator.ts          # Integración Google Gemini y analizador de texto
│   ├── utils/
│   │   └── audio.ts                # Efectos de sonido con Web Audio API (sin archivos)
│   ├── types/
│   │   └── index.ts                # Modelos TypeScript de datos
│   ├── App.tsx                     # Componente principal
│   ├── index.css                   # Tailwind CSS y animaciones
│   └── main.tsx                    # Punto de entrada de React
├── index.html                      # HTML semántico con SEO y Schema.org
├── package.json                    # Dependencias y scripts
├── tailwind.config.js              # Paleta de colores e identidad Thea
└── vite.config.ts                  # Configuración de compilación Vite
```

---

## 🛠️ Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Vite 5** (Empaquetador de alto rendimiento)
- **Tailwind CSS** (Diseño moderno dark theme inspirado en Thea Study)
- **Lucide React** (Iconografía vectorial moderna)
- **Canvas-Confetti** (Efectos visuales de celebración en notas aprobadas)
- **Web Audio API** (Sonidos armónicos generados por sintetizador nativo del navegador)
