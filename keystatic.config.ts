import { collection, config, fields } from "@keystatic/core";

// Panel de administración de contenido para el equipo de la iglesia.
// Se entra en /keystatic; el formulario que se llena ahí se guarda como un
// archivo YAML en content/events/ y las fotos en public/images/events/.
//
// 👉 STORAGE: ahora está en "local", que escribe directo en el disco y solo
//    funciona corriendo el proyecto en tu máquina (npm run dev). Es lo correcto
//    mientras no exista la cuenta.
//    Cuando crees el proyecto en Keystatic Cloud, se cambia por:
//
//      storage: { kind: "cloud" },
//      cloud: { project: "equipo/proyecto" },
//
//    Eso es lo que permite que la encargada entre desde el sitio publicado con
//    su correo, sin cuenta de GitHub. El resto de este archivo no cambia.
export default config({
  // Interfaz del panel en español: la encargada no ve nada en inglés.
  locale: "es-ES",
  storage: { kind: "local" },
  ui: {
    brand: { name: "Bethel Casa De Dios" },
  },
  collections: {
    events: collection({
      label: "Eventos",
      // Un archivo por evento. El nombre del archivo sale del título.
      path: "content/events/*",
      format: { data: "yaml" },
      slugField: "title",
      // Columnas de la lista de eventos dentro del panel.
      columns: ["title", "startDate"],
      schema: {
        // El título hace doble papel: se muestra en el sitio y genera el
        // nombre del archivo, así la encargada no inventa nombres.
        title: fields.slug({
          name: {
            label: "Título",
            description:
              "En español o en inglés. El otro idioma se genera automáticamente.",
            validation: { isRequired: true },
          },
          slug: {
            label: "Nombre del archivo",
            description:
              "Se genera solo a partir del título. Normalmente no hay que tocarlo.",
          },
        }),
        description: fields.text({
          label: "Descripción",
          multiline: true,
          description:
            "Escríbela en español o en inglés, como te salga. El otro idioma se traduce solo unos minutos después de guardar.",
          validation: { isRequired: true },
        }),

        // ── Campos que gestiona la traducción automática ──────────────────
        //
        // `fields.ignored()` no dibuja nada en el formulario, pero conserva el
        // valor del archivo al guardar. Eso es justo lo que hace falta: si
        // estos campos NO estuvieran en el esquema, Keystatic los borraría del
        // YAML la próxima vez que alguien guardara el evento desde el panel, y
        // se perdería la traducción.
        //
        // Las dos versiones traducidas viven AQUÍ, una por idioma, y son las
        // únicas que lee el sitio. `title` / `description` (los campos de
        // arriba) guardan el texto tal como lo escribió la encargada y la
        // traducción no los toca nunca: así, al reabrir el evento, siempre ve
        // sus propias palabras y no una traducción de vuelta de lo que puso.
        titleEs: fields.ignored(),
        descriptionEs: fields.ignored(),
        titleEn: fields.ignored(),
        descriptionEn: fields.ignored(),
        // "ok" | "failed" | ausente (todavía sin traducir).
        translationStatus: fields.ignored(),
        // Huella del texto en español ya traducido. Sirve para no volver a
        // llamar a la API en cada push si el texto no cambió.
        translationHash: fields.ignored(),

        image: fields.image({
          label: "Foto",
          description:
            "Se ve mejor una foto horizontal (más ancha que alta), de al menos 800 píxeles de ancho.",
          directory: "public/images/events",
          publicPath: "/images/events/",
          validation: { isRequired: true },
        }),

        // Fecha real, no texto: es lo que permite ordenar los eventos y que
        // pasen solos de "Próximos" a "Pasados" cuando se cumple el día.
        startDate: fields.date({
          label: "Fecha de inicio",
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: "Fecha de fin",
          description:
            "Solo si el evento dura varios días. Si es de un solo día, dejar vacío.",
        }),
        time: fields.text({
          label: "Hora",
          description: 'Por ejemplo: "7:00 PM". Opcional.',
        }),
        location: fields.text({
          label: "Lugar",
          description: 'Por ejemplo: "Santuario principal". Opcional.',
        }),

        link: fields.url({
          label: "Enlace de inscripción",
          description:
            "Opcional. Si el evento tiene un formulario o página aparte, se pega aquí la dirección.",
        }),

        featured: fields.checkbox({
          label: "Destacar en la página principal",
          defaultValue: false,
        }),
        // Permite dejar un evento preparado con anticipación sin que se vea.
        published: fields.checkbox({
          label: "Publicado",
          description:
            "Desmarcado, el evento queda guardado pero no aparece en el sitio.",
          defaultValue: true,
        }),
      },
    }),
  },
});
