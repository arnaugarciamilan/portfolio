# ⚡ Arnau Garcia Milan — Portfolio Personal

Portfolio personal modern, interactiu i responsive. Construït amb HTML, CSS i JavaScript vanilla — sense frameworks.

## 🛠️ Tecnologies

- **HTML5** semàntic i accessible
- **CSS3** modern (custom properties, grid, flexbox, animations)
- **JavaScript** vanilla (ES6+), modular i comentat
- **Google Fonts**: Syne + DM Sans

## 📁 Estructura

```
portfolio/
├── index.html          # Estructura principal
├── css/
│   └── styles.css      # Tots els estils
├── js/
│   └── main.js         # Tota la interactivitat
├── assets/             # Imatges i icons (per afegir)
└── README.md
```

## ✨ Funcionalitats

- Preloader animat
- Cursor personalitzat
- Canvas amb partícules al Hero
- Typing effect al subtítol
- Navbar sticky amb highlight de secció activa
- Dark / Light mode (guardat a localStorage)
- Scroll reveal amb IntersectionObserver
- Skill bars animades
- Filtre de projectes per tags
- Modal de projectes amb detalls
- Copiar email al portapapers
- Formulari de contacte amb validació
- Botó "Back to top"
- Totalment responsive (mobile-first)
- Suport prefers-reduced-motion

## 🚀 Com desplegar

### GitHub Pages (gratuït)

1. Puja el codi a un repositori GitHub
2. Settings → Pages → Source: `main` branch, `/root`
3. La web estarà a `https://usuari.github.io/portfolio`

### Vercel (recomanat)

1. Importa el repo a [vercel.com](https://vercel.com)
2. Framework: `Other`
3. Build command: (buit)
4. Output directory: `.` (arrel)
5. Deploy!

### Netlify

Arrossega la carpeta del projecte directament a [app.netlify.com](https://app.netlify.com/drop)

## 📝 Com personalitzar

- **Dades personals**: edita `index.html` (nom, email, links socials)
- **Projectes**: afegeix cards al grid `#projects` i dades al JSON `#project-data`
- **Colors**: canvia `--accent` a `css/styles.css`
- **Foto**: substitueix `.avatar-placeholder` per una `<img>`

## 📄 Llicència

MIT — lliure per usar i modificar.
