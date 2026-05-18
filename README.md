# Sistema de Análisis de Feedback Automatizado

## 1. Descripción del Proyecto
El sistema recolecta y envía datos a una hoja de cálculo mediante un formulario de feedback, en el cual recibe información como el nombre de usuario, producto y comentario. El comentario es analizado por una IA (Gemini 2.5 Flash), la cual determina un sentimiento (Positivo, Negativo o Neutro) y genera un resumen breve. Toda esta información es visualizada mediante Looker Studio en un dashboard personalizado.

## 2. Arquitectura del Sistema

* **Frontend:** HTML/CSS/JS 
* **Backend Serverless:** Google Apps Script.
* **Inteligencia Artificial:** API de Google Gemini. (Gemini 2.5 Flash)
* **Base de Datos:** Google Sheets.
* **Visualización de Datos:** Looker Studio.

## 3. Requisitos Previos y Recomendaciones
1. Mantener abierta en el navegador una sola cuenta de Google (tener múltiples sesiones puede generar conflictos de permisos en Apps Script).
2. Utilizar estrictamente la misma cuenta para todos las paginas e infraestructuras solicitadas.

## 4. Instrucciones de Configuración e Instalación

### A. Base de Datos (Google Sheets)
1. Iniciar sesión en Google Sheets.
2. Crear un archivo nuevo.
3. Cambiar el nombre de la hoja (pestaña inferior) estrictamente a `Feedback`.
4. Escribir toda la informacion descrita en el paso `A.1`
`Escribir esta información en el archivo nuevo sin dejar filas ni columnas vacías al principio.`
   
#### A.1 Estructura de Datos (Google Sheets)
El backend actua dinamicamente con una hoja de calculo de Google Sheets, para el correcto funcionamiento del script, la base de datos debe tener la siguiente estructura exacta en su primera hoja:
1. Columna A: Marca de Tiempo
2. Columna B: Producto
3. Columna C: Comentario
4. Columna D: Nombre de usuario
5. Columna E: Categoria de sentimiento
6. Columna F: Resumen IA

### B. API de Gemini
1. Iniciar sesión en Google AI Studio.
2. Seleccionar la opción "Get API key".
3. Hacer clic en "Create API key".
4. Mantener la configuración por defecto y generar la clave.
5. Copiar la clave API proporcionada.

### C. Backend (Apps Script)
1. Abrir Google Apps Script, seleccionar el archivo `Código.gs` y eliminar su contenido.
2. Pegar allí todo el código correspondiente a backend.js.
3. Pegar la clave API dentro de la variable `apiKey` (manteniendo las comillas de la cadena de texto).

### D. Frontend (HTML/JS)
1. Dentro del mismo editor de Apps Script, presionar el botón `+` para crear un nuevo archivo.
2. Seleccionar "HTML" y nombrarlo exactamente `Index`.
3. Pegar alli todo el código correspondiente a Frontend.html.

### E. Despliegue de la Web App
1. Dentro de Apps Script, presionar el botón azul "Implementar".
2. Seleccionar "Nueva implementación".
3. Presionar el ícono del engranaje y seleccionar el tipo "Aplicación web".
4. Completar el campo de descripción.
5. En "Ejecutar como", seleccionar "Yo" (para que los permisos se ejecuten en la cuenta).
6. En "Quién tiene acceso", configurar el nivel deseado (ej. Cualquier persona).
7. Hacer clic en "Implementar" y autorizar los permisos si el sistema lo necesita.
8. Copiar la URL de la aplicación web generada

### F. Visualización (Looker Studio)
1. Ingresar al enlace de la plantilla compartida de Looker Studio. (https://lookerstudio.google.com/reporting/a9e82c2b-9fcf-47d9-92dd-a52364dc94eb)
2. Al intentar utilizarla, el sistema le advertirá que debe proporcionar sus propios datos.
3. Seleccionar la opción para añadir una nueva fuente de datos.
4. Elegir el conector de Google Sheets (hojas de calculo)
5. Seleccionar el archivo creado en el paso `A` para enlazar la base de datos con los gráficos.
 `Tener en cuenta que la informacion de Looker Studio se actualiza cada 15 min de forma automatica`
 
## 5. Manual de Uso
Proporcionar la URL de la app web a los usuarios deseados. Para ver la informacion procesada ingresar a la URL del panel de Looker Studio configurado en el ultimo paso, alli podra filtrar la informacion por fecha y producto.