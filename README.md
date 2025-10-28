# UD Block: Carousel

Moderner Carousel-Block für den WordPress-Block-Editor auf Basis von **Swiper.js**.
Er ermöglicht flexible, responsive Slider mit Navigation, Pagination und optionalem Autoplay.

## Funktionen
- Responsive Carousel mit Swiper.js
- Unterstützt Navigation, Pagination, Autoplay und Loop
- Anpassbare Slide-Anzahl, Geschwindigkeit, Abstände und Farben
- Innerer Block: `ud/slide-block` für einzelne Slides
- Getrennte Editor- und Frontend-Skripte
- Kompatibel mit Full Site Editing (FSE)

## Installation
Das Plugin in WordPress hochladen und aktivieren.

## Struktur
```
includes/           # Registrierung, Enqueue, Einstellungen
src/js/             # edit.js, save.js
src/css/            # editor.scss, frontend.scss
build/              # Kompilierte Dateien
block.json          # Carousel-Block
slide/block.json    # Slide-Block
ud-carousel-block.php
```

## Lizenz
→
© ulrich.digital gmbh – https://ulrich.digital

<!--
Interne Verwendung:
Eingesetzt im Projekt bbzg.ch
-->
