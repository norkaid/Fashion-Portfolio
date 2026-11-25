/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit everything here.
 *
 *  Images marked `temp: true` are TEMPORARY editorial photographs (Unsplash)
 *  used for art direction only. They are NOT Donna's designs, and the site
 *  shows a small caption on each one saying so.
 *
 *  To use your own work:
 *    1. Export the illustration / photo from Canva (Share → Download → PNG/JPG).
 *    2. Put it in /public/images/work/<project-slug>/ (any filename).
 *    3. Change `src` below to that path and delete `temp: true`.
 *  See README.md → "Replacing images" for the full list of suggested swaps.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Img = {
  src: string;
  alt: string;
  /** Temporary placeholder photograph: not Donna's own work. */
  temp?: boolean;
  /** Optional CSS object-position, e.g. "50% 20%". */
  focus?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short italic line shown beneath the title. */
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  cover: Img;
  /** Tone used for gradients around this project's imagery. */
  tone: string;
  concept: string[];
  inspiration: string[];
  palette: { name: string; hex: string }[];
  materials: { name: string; note: string }[];
  development: { step: string; text: string }[];
  gallery: Img[];
  /** Optional sketches / croquis / technical flats: shown in a Sketchbook section when provided. */
  sketches?: Img[];
};

const T = (name: string, alt: string, focus?: string): Img => ({
  src: `/images/temp/${name}.jpg`,
  alt,
  temp: true,
  focus,
});

export const site = {
  name: "Donna Norkai Omaboe",
  nameLines: ["Donna", "Norkai", "Omaboe"],
  role: "Fashion Designer | Creative Visionary",
  label: "Norkai",
  intro:
    "Exploring the intersection of contemporary fashion, culture, craftsmanship, and creative expression.",
  url: "https://donnanorkaiomaboe.com",
  location: "Accra, Ghana",
  email: "donnaomaboe2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/donna-omaboe/",
  /** Add your Instagram URL here. Until then the link shows as "coming soon". */
  instagram: "",
  instagramHandle: "",
};

export const about = {
  portrait: T("portrait", "Temporary portrait: a woman in a white collar and printed jacket", "50% 30%"),
  // Donna's own words, from her Canva portfolio
  statement:
    "I am an emerging fashion designer with a passion for creating sculptural, innovative garments that merge craftsmanship with artistic expression. Inspired by nature, culture, and architectural forms, I explore silhouette, texture, and material to create timeless designs with a strong visual identity.",
  statement2:
    "Through continuous experimentation and refinement, I aim to push creative boundaries while preserving the precision and elegance that define luxury fashion.",
  threads: [
    { k: "Fashion", v: "Couture silhouettes, sculpted with restraint." },
    { k: "Identity", v: "Clothes as a way of saying who we are, and where we come from." },
    { k: "Culture", v: "Heritage read in the present tense, through craft and material." },
    { k: "Technology", v: "Research in computer vision for garment reconstruction." },
  ],
  brand: {
    name: "Norkai",
    market: "Haute Couture · Luxury · Womenswear · Contemporary",
    feel: "Sophisticated, organic",
    kin: "In conversation with Iris van Herpen",
  },
  facts: [
    { k: "Founder", v: "Norkai, an Afro-contemporary label" },
    { k: "Study", v: "Computer Science, Ashesi University" },
    { k: "Research", v: "Computer vision for dress reconstruction & sewing patterns" },
  ],
};

export const projects: Project[] = [
  {
    slug: "capiz",
    title: "Capiz",
    subtitle: "Light caught in a shell",
    year: "2026",
    category: "Resort · Swim & Cover-up",
    summary:
      "A swim set and sheer organza cover-up built from articulated, sequined 'capiz shell' fabric and opalescent mother-of-pearl tiles, developed in three colourways.",
    cover: T("blue", "Temporary image: a model in an off-shoulder gown against violet", "50% 30%"),
    tone: "#DCE3DE",
    concept: [
      "Capiz begins with the way light moves across the inside of a shell. Each surface shifts from milk to blue to gold as the body moves.",
      "The look pairs a structured shell-cup bra and tie-side brief with a sheer silk organza robe, so the shine is seen through a veil.",
    ],
    inspiration: ["Mother-of-pearl", "Coastal light", "Tiled, articulated surfaces", "Wet sand and sea glass"],
    palette: [
      { name: "Opal Blue", hex: "#9FB7C9" },
      { name: "Butter", hex: "#E9D9A6" },
      { name: "Blush Pearl", hex: "#E7C9BD" },
      { name: "Sand", hex: "#D8C6AA" },
      { name: "Shell White", hex: "#F3EFE8" },
    ],
    materials: [
      { name: "Articulated sequined 'Capiz Shell' fabric", note: "Fabric 1: moves like overlapping scales" },
      { name: "Holographic PU/PVC laminate", note: "Fabric 2: on a stretch base" },
      { name: "Opalescent MOP tile", note: "Shell cups, front & back views" },
      { name: "Matte nylon-spandex blend", note: "Base: four-way stretch" },
      { name: "Sheer silk organza", note: "Robe with deep, open sleeves" },
    ],
    development: [
      { step: "Swatch", text: "Fabrics pinned beside the croquis to test how the shine reads against skin." },
      { step: "Technical", text: "Front and back views of the shell bra, drawn to scale." },
      { step: "Colourways", text: "Developed in opal blue, butter yellow and blush, each fully pearlescent." },
    ],
    gallery: [T("watercolour", "Temporary image: soft watercolour texture"), T("gaze", "Temporary image: portrait at dusk"), T("sheer", "Temporary image: sheer black blouse portrait")],
  },
  {
    slug: "ivory-twist",
    title: "Ivory Twist",
    subtitle: "A bias line, turned once",
    year: "2026",
    category: "Eveningwear",
    summary:
      "A fluid ivory column gown with a twisted, cut-out waist and an open back, designed to be read from both sides.",
    cover: T("ivory", "Temporary image: ivory tailoring on a pale background", "50% 30%"),
    tone: "#EFE6D8",
    concept: [
      "One strip of fabric twists at the waist and reveals the body on both sides, so the gown is a single unbroken line.",
      "The back is as important as the front. The scoop drops low and the twist repeats, so the gown is designed to be seen walking away.",
    ],
    inspiration: ["Carved stone", "Bias-cut 1930s eveningwear", "A ribbon turned once"],
    palette: [
      { name: "Ivory", hex: "#F3ECE0" },
      { name: "Champagne", hex: "#E4D3BC" },
      { name: "Shadow Taupe", hex: "#B8A592" },
    ],
    materials: [
      { name: "Silk satin, cut on the bias", note: "For weight and drape" },
      { name: "Self-fabric twist", note: "Bound edges at the cut-outs" },
    ],
    development: [
      { step: "Front view", text: "Spaghetti straps, a soft cowl and a twisted waist cut-out." },
      { step: "Back view", text: "Low scoop back with the twist repeated to frame the spine." },
    ],
    gallery: [T("rail", "Temporary image: neutral garments with pampas"), T("neutral", "Temporary image: neutral garments on a rail")],
  },
  {
    slug: "gilded-waist",
    title: "Gilded Waist",
    subtitle: "Armour, softened",
    year: "2026",
    category: "Couture · Evening",
    summary:
      "Sleek column gowns in scarlet and black, held at the waist by a sculpted gold piece that wraps the body from front to back.",
    cover: T("gilded", "Temporary image: a model in a draped red gown in the studio", "50% 30%"),
    tone: "#E6D2C4",
    concept: [
      "The idea is armour that feels like jewellery: a gold form that wraps the waist and stays the focus of the gown.",
      "The gowns stay simple, with high necks, clean shoulders and a floor-length column, so the metal draws the eye.",
    ],
    inspiration: ["Beaten metalwork", "Ceremonial adornment", "Architectural ribs"],
    palette: [
      { name: "Scarlet", hex: "#9E2A22" },
      { name: "Onyx", hex: "#1F1A17" },
      { name: "Antique Gold", hex: "#B8955A" },
    ],
    materials: [
      { name: "Heavy crepe", note: "Column body" },
      { name: "Sculpted metallic waist piece", note: "Front & back" },
    ],
    development: [
      { step: "Colourway I", text: "Scarlet, front and back." },
      { step: "Colourway II", text: "Onyx, front and back." },
    ],
    gallery: [T("atelier", "Temporary image: black dress in the studio"), T("sheer", "Temporary image: sheer black blouse portrait")],
  },
  {
    slug: "champagne-drape",
    title: "Champagne Drape",
    subtitle: "After the curve of a flacon",
    year: "2026",
    category: "Couture · Concept",
    summary:
      "A gown of layered, sweeping drapery in champagne and blush, its silhouette drawn alongside the curve of a perfume bottle.",
    cover: T("soft", "Temporary image: a woman in a soft white puff-sleeve top", "50% 25%"),
    tone: "#EADBC6",
    concept: [
      "Sketched next to a perfume flacon, this gown copies the bottle's swelling shape and its glow.",
      "Panels of champagne silk fall from the shoulder and trail behind like a vapour.",
    ],
    inspiration: ["Perfume flacons", "Vapour and haze", "Liquid gold light"],
    palette: [
      { name: "Champagne", hex: "#E4D3BC" },
      { name: "Blush", hex: "#E8C8B8" },
      { name: "Dove", hex: "#B9B2AA" },
      { name: "Gilt", hex: "#C9A66B" },
    ],
    materials: [
      { name: "Silk charmeuse", note: "Long draped panels" },
      { name: "Organza underlayer", note: "For lift and translucency" },
    ],
    development: [
      { step: "Reference", text: "Flacon study placed beside the croquis." },
      { step: "Drape", text: "Panels pinned from the shoulder and the waist." },
    ],
    gallery: [T("closing", "Temporary image: black and white portrait, hair in the wind"), T("watercolour", "Temporary image: watercolour texture")],
  },
  {
    slug: "blush-corsetry",
    title: "Blush Corsetry",
    subtitle: "Bone, petal, tulle",
    year: "2026",
    category: "Bridal · Couture",
    summary:
      "A boned blush corset over a full, embellished tulle skirt, developed on a board of swatches, references and work-in-progress notes.",
    cover: T("blush", "Temporary image: a pink puff-sleeved dress in a field", "50% 30%"),
    tone: "#EBD5CC",
    concept: [
      "Corset boning is left visible, like the veins of a petal, while the skirt opens into scattered embellishment.",
      "Off-the-shoulder ruffles soften the corset's structure at the neckline.",
    ],
    inspiration: ["Petals", "Historic corsetry", "Morning mist"],
    palette: [
      { name: "Rose Dust", hex: "#D9AFA5" },
      { name: "Petal", hex: "#EDD3CB" },
      { name: "Sage Mist", hex: "#B9BDA6" },
      { name: "Pearl", hex: "#F2EDE6" },
    ],
    materials: [
      { name: "Boned corset", note: "Visible channels" },
      { name: "Embellished tulle", note: "Hand-scattered beading" },
    ],
    development: [
      { step: "Board", text: "Swatches, colour chips and references gathered around the sketch." },
      { step: "In progress", text: "The board is labelled 'How it's going' and the design is still being worked out." },
    ],
    gallery: [T("watercolour", "Temporary image: watercolour texture"), T("neutral", "Temporary image: neutral garments on a rail")],
  },
  {
    slug: "atlantic-denim",
    title: "Atlantic Denim",
    subtitle: "Workwear, corseted",
    year: "2026",
    category: "Ready-to-Wear",
    summary:
      "A ready-to-wear set: a poet-sleeve chambray blouse, a corset-waisted denim skirt, technical flats, detail callouts and a five-tone indigo palette.",
    cover: T("denim", "Temporary image: stacked denim in graded indigo", "50% 50%"),
    tone: "#D9DEE2",
    concept: [
      "This look gives denim's workwear history couture construction: a deep corset waist and a flared, panelled skirt.",
      "Full poet sleeves and a notched neckline keep the look light.",
    ],
    inspiration: ["Indigo dyeing", "Workwear", "Atlantic coastline"],
    palette: [
      { name: "Chambray", hex: "#A9BCD0" },
      { name: "Mid Indigo", hex: "#7D93AE" },
      { name: "Indigo", hex: "#56708F" },
      { name: "Deep Indigo", hex: "#3E536E" },
      { name: "Ink", hex: "#2B3A4D" },
    ],
    materials: [
      { name: "Rigid denim", note: "Corset waist & skirt panels" },
      { name: "Chambray", note: "Blouse with poet sleeves" },
    ],
    development: [
      { step: "Illustration", text: "A styled look with a structured bag and pointed heels." },
      { step: "Flats", text: "Technical front and back views, with a centre-back zip." },
      { step: "Details", text: "Callouts for the neckline, corset seaming and skirt hem." },
    ],
    gallery: [T("gaze", "Temporary image: portrait at dusk"), T("studio", "Temporary image: shirt on a chair in the studio")],
  },
  {
    slug: "botanical-couture",
    title: "Botanical Couture",
    subtitle: "An avant-garde runway look",
    year: "2026",
    category: "Couture · Runway",
    summary:
      "A halter gown in a hand-rendered hibiscus print, with a cascading ruffled front panel that opens like a bloom as the wearer walks.",
    cover: T("botanical", "Temporary image: a woman in an embroidered yellow dress", "50% 30%"),
    tone: "#EADCC4",
    concept: [
      "The gown is a garden in motion: the halter neck rises like a stem and the front ruffle falls open like petals.",
      "The back is a clean column with a zip, so the gown is calm from behind and full of movement from the front.",
    ],
    inspiration: ["Hibiscus", "Tropical gardens", "Movement on a runway"],
    palette: [
      { name: "Hibiscus", hex: "#C9485B" },
      { name: "Coral", hex: "#E07A5F" },
      { name: "Marigold", hex: "#E9A23B" },
      { name: "Petal Pink", hex: "#EBB2B8" },
    ],
    materials: [
      { name: "Printed silk", note: "Hand-rendered floral" },
      { name: "Bias-cut ruffle", note: "Cascading front panel" },
    ],
    development: [
      { step: "Front view", text: "Halter neckline and a high-low ruffle cascade." },
      { step: "Back view", text: "Halter strap and a long centre-back zip." },
    ],
    gallery: [T("earth", "Temporary image: desert landscape in warm tones"), T("rail", "Temporary image: neutral garments with pampas")],
  },
  {
    slug: "pattern-intelligence",
    title: "Pattern Intelligence",
    subtitle: "From photograph to pattern",
    year: "2026",
    category: "Research · Fashion Technology",
    summary:
      "Capstone research: a computer-vision system that breaks a photographed dress into its components, rebuilds an editable 2D sewing pattern and adjusts it to the wearer's own measurements.",
    cover: T("research", "Temporary image: mannequins in a grid of windows, black and white", "50% 50%"),
    tone: "#E2DED8",
    concept: [
      "Turning a photo of a dress into a usable sewing pattern is slow, manual work that needs pattern-making expertise most designers don't have.",
      "This research proposes a system that segments garment components from an image, rebuilds a 2D pattern, and lets the user edit it against their own measurements, keeping every component in sync.",
    ],
    inspiration: ["Computer vision", "Parametric geometry", "Pattern-cutting tradition"],
    palette: [
      { name: "Graphite", hex: "#3A3633" },
      { name: "Chalk", hex: "#EFEAE2" },
      { name: "Tailor's Blue", hex: "#6D7F94" },
    ],
    materials: [
      { name: "Segmentation", note: "SAM / SAM 2, Grounding DINO, Mask2Former" },
      { name: "Datasets", note: "Fashionpedia & DeepFashion2" },
      { name: "Pattern reconstruction", note: "NeuralTailor, Sewformer, GarmentCode" },
      { name: "Evaluation", note: "IoU, F1, dimensional error, usability (SUS)" },
    ],
    development: [
      { step: "Question", text: "How can computer vision and parametric modelling turn existing dresses into editable patterns?" },
      { step: "Method", text: "Mixed methods: quantitative accuracy measures plus usability feedback from emerging designers." },
      { step: "Gap", text: "Interactive, measurement-calibrated customisation that stays in sync with the pattern." },
    ],
    gallery: [T("neutral", "Temporary image: garments on a rail"), T("studio", "Temporary image: studio still life")],
  },
];

export const process = [
  {
    n: "01",
    title: "Inspiration & Research",
    text: "Every piece starts by collecting: shells, flacons, carved stone, the light at the coast, a grandmother's cloth.",
    img: T("earth", "Temporary image: desert landscape, warm earth tones"),
  },
  {
    n: "02",
    title: "Moodboards",
    text: "Images are pinned, cut out and moved around until they agree on a mood. Boards are labelled honestly, like 'How it's going'.",
    img: T("watercolour", "Temporary image: watercolour texture"),
  },
  {
    n: "03",
    title: "Colour Exploration",
    text: "Palettes are built as swatch chips beside the croquis and tested against skin, light and other fabrics.",
    swatches: ["#F3ECE0", "#E4D3BC", "#D9AFA5", "#9FB7C9", "#56708F", "#B8955A", "#5E4535"],
  },
  {
    n: "04",
    title: "Fabric & Material",
    text: "Articulated shell sequins, holographic laminate, silk organza, rigid denim. Materials are pinned to the page and named.",
    img: T("rail", "Temporary image: neutral garments on a rail with pampas"),
  },
  {
    n: "05",
    title: "Sketches & Illustrations",
    text: "Hand-rendered croquis, front and back, with notes in the margins. This is where a silhouette first takes shape.",
    img: T("studio", "Temporary image: studio still life with a shirt on a chair"),
  },
  {
    n: "06",
    title: "Design Development",
    text: "Technical flats, construction callouts and colourways, drawn precisely enough for someone else to make from.",
    img: T("atelier", "Temporary image: model in a black dress in the studio"),
  },
  {
    n: "07",
    title: "Final Concepts",
    text: "The finished look: resolved, styled and ready for the runway.",
    img: T("closing", "Temporary image: black and white portrait, hair in the wind"),
  },
];

export const heritage = [
  {
    k: "Textile memory",
    v: "Woven strips, resist-dyed cloth and printed wax: the rhythm of West African textiles, used as line and texture rather than as a costume.",
  },
  {
    k: "Earth & material",
    v: "Laterite, shea, raffia, shell. A palette taken from the ground and from things made by hand.",
  },
  {
    k: "Architecture",
    v: "Arches, courtyards and sculpted mud walls inform the silhouettes: built forms with curves.",
  },
  {
    k: "Craft",
    v: "Hand-finishing, beading and the patience of the artisan, in conversation with technology.",
  },
];
