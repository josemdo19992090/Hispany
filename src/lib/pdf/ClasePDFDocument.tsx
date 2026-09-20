import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { ClaseVersion } from "@/types/content";
import { VOCALES, CONSONANTES, type Letra } from "@/lib/abecedario";
import type { Idioma } from "@/lib/i18n/idioma";
import { PT_SANS_REGULAR_BASE64, PT_SANS_BOLD_BASE64 } from "./fonts";

// "Helvetica" (la fuente base de react-pdf) no tiene glifos cirílicos: el
// contenido en ruso salía como texto corrupto. PT Sans cubre español y ruso
// en el mismo archivo, así que se usa siempre, no solo cuando idioma="ru"
// (una clase puede mezclar bloques en los dos idiomas).
// react-pdf resuelve `src` con fetch(): un Buffer no cumple el tipo `string`
// que pide (y fetch tampoco lo aceptaría), así que va como data URI en vez
// de leer un archivo del disco — evita depender de que Vercel empaquete un
// archivo binario referenciado solo por ruta.
Font.register({
  family: "PT Sans",
  fonts: [
    { src: `data:font/woff;base64,${PT_SANS_REGULAR_BASE64}`, fontWeight: 400 },
    { src: `data:font/woff;base64,${PT_SANS_BOLD_BASE64}`, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "PT Sans", color: "#6B4423" },
  marcaAgua: {
    position: "absolute",
    top: 20,
    right: 40,
    fontSize: 9,
    color: "#B98650",
  },
  titulo: { fontSize: 20, fontWeight: 700, marginBottom: 4, color: "#6B4423" },
  subtitulo: { fontSize: 11, marginBottom: 20, color: "#8B5E3C" },
  seccionTitulo: {
    fontSize: 13,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 6,
    color: "#2FB380",
  },
  parrafo: { fontSize: 11, lineHeight: 1.5 },
  pie: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#B98650",
    textAlign: "center",
  },
  tablaGrupo: { fontSize: 10, fontWeight: 700, marginTop: 10, marginBottom: 4, color: "#6B4423" },
  filaTabla: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D9B48F",
    paddingVertical: 3,
  },
  celdaLetra: { width: 40, fontSize: 9, fontWeight: 700, color: "#1A7F58" },
  celdaNombre: { width: 60, fontSize: 9 },
  celdaSonido: { width: 55, fontSize: 9 },
  celdaEjemplo: { width: 70, fontSize: 9, color: "#8B5E3C" },
  celdaNota: { flex: 1, fontSize: 8, color: "#8B5E3C" },
});

// react-pdf no tiene <table>: se arma con Views en fila, mismos datos que
// TablaAbecedario.tsx (src/lib/abecedario.ts) para que web y PDF no diverjan.
function TablaAbecedarioPDF({ idioma }: { idioma: Idioma }) {
  const conNotas = idioma === "ru";
  const fila = (letra: Letra) => (
    <View style={styles.filaTabla} key={letra.mayuscula}>
      <Text style={styles.celdaLetra}>
        {letra.mayuscula} {letra.minuscula}
      </Text>
      <Text style={styles.celdaNombre}>{letra.nombre}</Text>
      <Text style={styles.celdaSonido}>{letra.sonido}</Text>
      <Text style={styles.celdaEjemplo}>{letra.ejemplo}</Text>
      {conNotas && <Text style={styles.celdaNota}>{letra.nota ?? "—"}</Text>}
    </View>
  );
  return (
    <>
      <Text style={styles.tablaGrupo}>{idioma === "ru" ? "Гласные" : "Vocales"}</Text>
      {VOCALES.map(fila)}
      <Text style={styles.tablaGrupo}>{idioma === "ru" ? "Согласные" : "Consonantes"}</Text>
      {CONSONANTES.map(fila)}
    </>
  );
}

// Quita el markdown básico (**negrita**, *cursiva*) que usamos en el contenido
// de las clases, ya que react-pdf no interpreta markdown.
function limpiarMarkdown(texto: string): string {
  return texto.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

export default function ClasePDFDocument({
  nivelNombre,
  seccionTitulo,
  claseTitulo,
  version,
  perfilEtiqueta,
  idioma,
}: {
  nivelNombre: string;
  seccionTitulo: string;
  claseTitulo: string;
  version: ClaseVersion;
  perfilEtiqueta: string;
  idioma: Idioma;
}) {
  const texto = (bloque: "lectura" | "conversacion" | "gramatica" | "escritura") => {
    const ru = version[`${bloque}_ru`];
    return limpiarMarkdown(idioma === "ru" && ru ? ru : version[`${bloque}_md`]);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.marcaAgua}>Hispany · Premium</Text>
        <Text style={styles.titulo}>{claseTitulo}</Text>
        <Text style={styles.subtitulo}>
          {nivelNombre} · {seccionTitulo} · Perfil: {perfilEtiqueta}
        </Text>

        <Text style={styles.seccionTitulo}>{idioma === "ru" ? "Чтение" : "Lectura"}</Text>
        <Text style={styles.parrafo}>{texto("lectura")}</Text>

        <Text style={styles.seccionTitulo}>{idioma === "ru" ? "Разговор" : "Conversación"}</Text>
        <Text style={styles.parrafo}>{texto("conversacion")}</Text>

        <Text style={styles.seccionTitulo}>{idioma === "ru" ? "Грамматика" : "Gramática"}</Text>
        <Text style={styles.parrafo}>{texto("gramatica")}</Text>
        {claseTitulo === "El abecedario" && <TablaAbecedarioPDF idioma={idioma} />}

        <Text style={styles.seccionTitulo}>{idioma === "ru" ? "Письмо" : "Escritura"}</Text>
        <Text style={styles.parrafo}>{texto("escritura")}</Text>

        <Text style={styles.pie} fixed>
          Generado dinámicamente por Hispany el {new Date().toLocaleDateString("es-VE")} — este
          contenido puede cambiar; siempre refleja la versión más reciente de la clase.
        </Text>
      </Page>
    </Document>
  );
}
