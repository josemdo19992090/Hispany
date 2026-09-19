/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-pdf/renderer usa pdfkit, que carga sus fuentes estándar (Helvetica, etc.)
  // con require() dinámico. El tracer de Next.js no detecta esos archivos
  // automáticamente y no los incluye en el bundle serverless de Vercel, lo que
  // rompe la generación de PDF en producción (funciona en local con `next dev`).
  // Los incluimos explícitamente aquí.
  experimental: {
    outputFileTracingIncludes: {
      "/api/pdf/**/*": ["./node_modules/pdfkit/js/**/*"],
    },
  },
};

export default nextConfig;
