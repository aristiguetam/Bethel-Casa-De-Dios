"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Rutas de las imágenes del carrusel. Por ahora hay una sola imagen real;
// para agregar más basta con añadir rutas a este array — el resto funciona solo.
const images = [
  // Imagen real actual (queda como primera → lleva priority para el LCP).
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUnxdyOqvXYQIvDNPmhlIzUYSV6LAS7wG_3VSt9D1-ovrXpI43Kjhr2lFnZ5mgQRQVXNzeurLJ3yxjIXj6-_efkER7Gdg95ev0wROuWDhl8N1JhmbYPwAkkETA7_KhN63pgk-fY5jHPJ7qoSaUioKcleQimMZengysJ9ANAkG2bk9FbNy7PHkl8miPX9PMeK61RXJP-KbLegHST_YCaooeRwQvUBGredccgD6sI0JhEaAbve3iP5V8DkfSOkIJbfqPW_QfKwjwbWOt",
  // --- Imágenes de PRUEBA (temporales, reutilizadas del proyecto). Bórralas
  //     cuando tengas las reales y añade aquí las rutas definitivas. ---
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCeaoedv0MUdqLfrdjDirs-uy85zOiGXuY5EofTFh0fSNSx3NmX69xFFtpVqF24NqaJDy3eYeG4hNOA1TgWoxrQMwGCVlQy83fT--3QcxrILf3Bcsqct6D8kzY8WRHjRLZZvCLPYpcM_QzzdCbwhAn5E-k3GRKpjm26QHB1MMu5CFrq-5OP0EEv5KXMCVxRUGNNyevx8-QzX7R7WkHZqATSgOTf0wUef0oIgd9Sv9BPIgYwvpMSz0GUPn03kochL5qtIN7Yyr3fUyAB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Dkic8r5oOLr1M-_Svuae4JZX0gILNUw3NQv4OVPId145jbTbWEzaCxjfb6zdt-MB859JTH4JfxhbihQCo_DyiRqRLYdhzHSWWgRXf7bx68pypAEV2rak0kV-SNa9ZSf6WcRhy3w_bcYBq1dkxEbGiaU9ypcoreOII2h9eetCTibQUvgLeQtS7EkojlN4Kz2D8n86Y3YUqfYWnuIv8wtu9zEfgyMHCLERPujRhwLupJrDIY41j_j4ZocCshESEiS_dGscwM5voZB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAsHp4Ha270qvcEJgWKzVNmCXxC5Pxb9IBqQZuvk0fOSLbymrGR91kYSiE8aaSNm7UikVHO0Ql7yEE2jyVeBAGYAyvkFXafv1EbQ24BqbM5Cw6i7kXrszcdWCLMQVCD8gfsO5PUVctWXJm7iYDQcrI9N6eqxJrVhRMdfW6wWsslOUf7SlFyb1j9ZNSEnxVm-XbnBXpzdmKW3cbLR-jpEDl2on1w9UKvI97p_LEL_7SvtZm5FYmEbPIuZ-DsYOADZYZcPhTS_V9fD0zR",
];

const INTERVAL_MS = 3000;

interface HeroCarouselProps {
  alt: string;
}

export function HeroCarousel({ alt }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Con una sola imagen no hay nada que rotar.
    if (images.length <= 1) return;

    // prefers-reduced-motion: si está activo, no hacemos auto-cambio.
    // La transición CSS también se anula vía `motion-reduce:transition-none`,
    // así que el cambio (si lo hubiera) sería instantáneo.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL_MS);

    // Cleanup: evita fugas de memoria al desmontar / re-render.
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          // Solo la primera imagen lleva alt descriptivo; las demás son
          // duplicados decorativos de fondo.
          alt={i === 0 ? alt : ""}
          fill
          // priority solo en la primera para no penalizar el LCP.
          priority={i === 0}
          sizes="100vw"
          // Crossfade solo con opacity (transform scale es estático).
          className={`object-cover scale-105 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
