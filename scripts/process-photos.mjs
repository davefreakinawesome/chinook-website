import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const A = "/Users/davegranfield/.cursor/projects/Users-davegranfield-Chinookoverlander-com/assets";
const OUT = "/Users/davegranfield/Chinookoverlander.com/public";

// src file, dest path (relative to public), crop { w, h } or null to keep aspect (long-edge resize)
const jobs = [
  // --- Build system heroes (landscape 16:9, attention crop) ---
  { src: "IMG_6481-fbcd1065-29f6-4339-bd76-745b16f101f6.png", dest: "build/chassis.jpg", w: 1600, h: 900 },
  { src: "IMG_0258-49b4213f-69e2-460d-91a5-79c8e1cb0843.png", dest: "build/wheelbase.jpg", w: 1600, h: 900 },
  { src: "FA_08175-105e97a7-4928-4802-a849-b459b83c5a48.png", dest: "build/engine.jpg", w: 1600, h: 900 },
  { src: "FA_08191-11962bd9-4b93-4fa3-b9ef-919d691abed9.png", dest: "build/transmission.jpg", w: 1600, h: 900 },
  { src: "FA_07962-ecffc305-45f9-41e0-9d0f-943c5700234d.png", dest: "build/electrical.jpg", w: 1600, h: 900 },

  // --- Journal featured images (landscape 16:9) ---
  { src: "IMG_6235-14debec9-ffd5-43fd-9103-a874c06fa4ed.png", dest: "journal/why-rebuild.jpg", w: 1600, h: 900 },
  { src: "FA_08160-e8ac7374-4612-46f3-80d5-8b8b3473d443.png", dest: "journal/why-80-series.jpg", w: 1600, h: 900 },
  { src: "FA_08228-8fe56d63-65a9-4c61-8931-b22f0eb76c5c.png", dest: "journal/extending-wheelbase.jpg", w: 1600, h: 900 },
  { src: "FA_08211-0eb193b5-8857-4062-966f-8e58afb3734a.png", dest: "journal/overhang-rule.jpg", w: 1600, h: 900 },
  { src: "FA_08164-613a280a-8e28-458e-8d94-dea1ca64de6d.png", dest: "journal/choosing-l98.jpg", w: 1600, h: 900 },
  { src: "FA_07956-56937d00-9008-4633-88a3-57459738b960.png", dest: "journal/digital-dashboard.jpg", w: 1600, h: 900 },
  { src: "FA_07882-5039a456-5557-4b07-9e3a-f49a894b4310.png", dest: "journal/fuel-system.jpg", w: 1600, h: 900 },

  // --- About portrait (4:5) ---
  { src: "FA_07853-cb2e2fdd-f232-4d61-9dee-3a92344c5e8e.png", dest: "about/dave-camp.jpg", w: 1000, h: 1250 },

  // --- OG share image (1200x630) ---
  { src: "FA_08235-f9f547d1-d436-468f-b642-4830ffb38ba5.png", dest: "og.jpg", w: 1200, h: 630 },

  // --- Spares wired later / available ---
  { src: "FA_08204-403dbb12-5785-42f9-9180-179163d19f09.png", dest: "gear/kmc-fuel-wheel.jpg", w: 1200, h: 1200 },
  { src: "FA_07821-35d4453f-5180-4f06-bfaf-7bd447d1b3e7.png", dest: "trips/forest-road.jpg", w: 1600, h: 900 },
  { src: "IMG_0259-45a25b00-6074-47f8-bdbf-7f59203d5189.png", dest: "journal/chinook-body.jpg", w: 1600, h: 900 },
];

for (const j of jobs) {
  const outPath = path.join(OUT, j.dest);
  await mkdir(path.dirname(outPath), { recursive: true });
  await sharp(path.join(A, j.src))
    .resize(j.w, j.h, { fit: "cover", position: j.pos ?? "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);
  console.log("wrote", j.dest);
}
console.log("done");
