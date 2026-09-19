import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import type { ClaseVersion } from "@/types/content";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#6B4423" },
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
});

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
}: {
  nivelNombre: string;
  seccionTitulo: string;
  claseTitulo: string;
  version: ClaseVersion;
  perfilEtiqueta: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.marcaAgua}>Hispany · Premium</Text>
        <Text style={styles.titulo}>{claseTitulo}</Text>
        <Text style={styles.subtitulo}>
          {nivelNombre} · {seccionTitulo} · Perfil: {perfilEtiqueta}
        </Text>

        <Text style={styles.seccionTitulo}>Lectura</Text>
        <Text style={styles.parrafo}>{limpiarMarkdown(version.lectura_md)}</Text>

        <Text style={styles.seccionTitulo}>Conversación</Text>
        <Text style={styles.parrafo}>{limpiarMarkdown(version.conversacion_md)}</Text>

        <Text style={styles.seccionTitulo}>Gramática</Text>
        <Text style={styles.parrafo}>{limpiarMarkdown(version.gramatica_md)}</Text>

        <Text style={styles.seccionTitulo}>Escritura</Text>
        <Text style={styles.parrafo}>{limpiarMarkdown(version.escritura_md)}</Text>

        <Text style={styles.pie} fixed>
          Generado dinámicamente por Hispany el {new Date().toLocaleDateString("es-VE")} — este
          contenido puede cambiar; siempre refleja la versión más reciente de la clase.
        </Text>
      </Page>
    </Document>
  );
}
