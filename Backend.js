function doGet () {
  return HtmlService.createHtmlOutputFromFile('Index')
  .setTitle('Feedback')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

  function recibirFeedback (datos) {
    const nombre = datos.nombre;
    const producto = datos.producto;
    const feedback = datos.feedback;
    const analisisIA = analizarConIA(feedback);
    const sentimiento = analisisIA.sentimiento;
    const resumen = analisisIA.resumen;

    const libro = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = libro.getSheetByName('Feedback');


    hoja.appendRow([new Date(),producto,feedback,nombre,sentimiento,resumen ]);
  }

function analizarConIA(comentario){

  const apiKey = ""; //Insertar la API de Gemini Aqui

  const prompt = `Analiza este comentario:${comentario}. Devuelve ESTRICTAMENTE un objeto JSON con dos claves: 'sentimiento' (cuyo valor sea Positivo, Neutro o Negativo) y 'resumen' (máximo 10 palabras). No incluyas saludos, ni explicaciones, ni formato markdown`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const cuerpoPeticion = {
    "contents": [{
      "parts": [{
        "text": prompt
      }]
    }]
  };
  const opciones = {
    "method":"post",
    "contentType":"application/json",
    "payload": JSON.stringify(cuerpoPeticion)
  };
  const respuesta = UrlFetchApp.fetch(url,opciones);

  const respuestaJSON = JSON.parse(respuesta.getContentText());

  const textoGenerado = respuestaJSON.candidates[0].content.parts[0].text;

  const textoLimpio = textoGenerado.replace(/```json/g, '').replace(/```/g, '').trim();

  const resultadoFinal = JSON.parse(textoLimpio);

  return resultadoFinal;
}
