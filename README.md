# Generador de Constancias PDF - Bomberos Voluntarios

Esta aplicación web fue diseñada específicamente para la **Asociación de Bomberos Voluntarios de José C. Paz**. Su propósito principal es agilizar la digitalización y emisión de constancias de siniestros, replicando el diseño oficial exacto que utiliza la institución.

## Características

- 🚒 **Generación Instantánea de PDF:** Utiliza la librería [jsPDF](https://github.com/parallax/jsPDF) para generar documentos vectoriales de alta calidad directamente en el navegador, sin necesidad de un servidor backend o base de datos.
- 📑 **Formatos Múltiples:** 
  - Genera 3 copias idénticas en el mismo documento PDF.
  - La primera página incluye la sección de "Retiro, Firma y Fecha" para el solicitante, mientras que la segunda y tercera copia se generan limpias.
- 🏢 **Formulario Inteligente:** Los campos se adaptan automáticamente dependiendo si el incidente fue en una *Vivienda* o un *Vehículo* (mostrando campos como *Dominio* y *Póliza* solo cuando corresponde).
- ⚡ **Desempeño y Diseño:** Construido sobre [Astro](https://astro.build/), con un diseño moderno, oscuro y premium utilizando Vanilla CSS, proporcionando una interfaz rápida, accesible y súper estilizada.

## Requisitos Previos

Para ejecutar la aplicación de forma local, necesitas tener instalado:
- **Node.js** (versión 18 o superior recomendada).

## Instalación y Uso Local

1. Clona el repositorio en tu máquina:
   ```bash
   git clone https://github.com/LeoCoronel/constanciasCreator.git
   ```

2. Ingresa al directorio del proyecto:
   ```bash
   cd constanciasCreator
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

5. ¡Listo! Abre tu navegador de preferencia y visita **[http://localhost:4321](http://localhost:4321)**.

## Estructura Principal del Proyecto

- `src/pages/index.astro`: Interfaz principal y formulario de recolección de datos.
- `src/scripts/pdfGenerator.ts`: Archivo clave que contiene toda la lógica de dibujo, posicionamiento y exportación hacia formato PDF.
- `public/logo.jpg`: Logo de la Institución utilizado como membrete en los documentos. 
- `src/styles/global.css`: Variables y estilos globales de tematización.
