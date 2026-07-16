import type { BuildSystem } from "@/lib/types";

export const buildSystems: BuildSystem[] = [
  {
    id: "bs-chassis",
    title: "80 Series Chassis",
    slug: "80-series-chassis",
    category: "Chassis & Driveline",
    summary:
      "A 1997 Toyota LandCruiser 80 Series chassis becomes the extremely engineered backbone for this vintage 4x4 camper.",
    status: "in-progress",
    progress: 65,
    heroImage: {
      src: "/build/chassis.jpg",
      alt: "Bare 80 Series LandCruiser chassis at sunset, with the vintage Chinook and V8 in the background",
      width: 1600,
      height: 900,
    },
    body: [
      "The original 1978 Hilux-based ladder frame was never designed to carry a full extreme camper body, a V8, and the loads of serious Australian adventure. The 80 Series platform brings coil suspension, full-floating axles and a proven driveline into this unique build.",
      "The frame was media blasted, inspected for cracking and corrosion, then prepped for the wheelbase extension and body-mounting work that follows.",
    ],
    specifications: [
      { label: "Donor", value: "1997 LandCruiser 80 Series" },
      { label: "Frame", value: "Fully boxed ladder" },
      { label: "Suspension", value: "Coil, front & rear" },
      { label: "Axles", value: "Full-floating" },
    ],
    challenges:
      "Aligning the vintage body mounts to a chassis designed for a completely different vehicle, while preserving the factory coil geometry.",
    decisions:
      "Retain the 80 Series suspension pickup points untouched so ride quality and articulation stay factory-predictable.",
    lessons: "Blast and inspect before you commit a single weld — hidden corrosion changes plans.",
    relatedVideoIds: ["v-06", "v-07"],
    relatedPostSlugs: ["why-80-series-chassis", "extending-the-wheelbase"],
    order: 1,
  },
  {
    id: "bs-wheelbase",
    title: "Wheelbase Extension",
    slug: "wheelbase-extension",
    category: "Chassis & Driveline",
    summary:
      "Stretching the LandCruiser chassis to seat this vintage camper body while staying legal on rear overhang.",
    status: "in-progress",
    progress: 40,
    heroImage: {
      src: "/build/wheelbase.jpg",
      alt: "Custom fabricated chassis brackets for the vintage 4x4 camper build on the workshop floor",
      width: 1600,
      height: 900,
    },
    body: [
      "The vintage Chinook body is longer than the donor cab-chassis wheelbase allows. Extending the frame lets the body sit correctly while keeping weight distribution sensible and the rear overhang inside Australian rules.",
      "The cut was made in a jig, sleeved internally and welded in stages to control distortion, then reinforced across the join. Extreme precision for an extremely engineered camper.",
    ],
    specifications: [
      { label: "Extension", value: "+320", unit: "mm" },
      { label: "Method", value: "Sleeved & plated" },
      { label: "Rear overhang", value: "< 60% wheelbase" },
    ],
    challenges: "Controlling weld distortion across a full frame cut without a chassis table.",
    decisions: "Sleeve internally and stagger welds to keep the frame straight and strong.",
    relatedVideoIds: ["v-07"],
    relatedPostSlugs: ["extending-the-wheelbase", "60-percent-overhang-rule"],
    order: 2,
  },
  {
    id: "bs-engine",
    title: "Engine — L98 6.0L V8",
    slug: "engine-l98-v8",
    category: "Powertrain",
    summary:
      "A GM-derived L98 6.0-litre V8 replaces the tired original four-cylinder, transforming this vintage camper into an extreme 4x4.",
    status: "in-progress",
    progress: 30,
    heroImage: {
      src: "/build/engine.jpg",
      alt: "The L98 6.0-litre V8 on a pallet for the extremely engineered vintage camper build",
      width: 1600,
      height: 900,
    },
    body: [
      "The L98 is a lightweight, torque-rich alloy V8 with a huge aftermarket and proven reliability. It gives this extreme camper the grunt to move loaded across the country and up steep tracks.",
      "Engine plates and a custom crossmember locate the V8 in a bay it was never meant to live in, with clearance for the firewall and steering.",
    ],
    specifications: [
      { label: "Engine", value: "L98 6.0L V8" },
      { label: "Config", value: "Alloy, 90° V8" },
      { label: "Capacity", value: "5967", unit: "cc" },
      { label: "Fuel", value: "EFI, sequential" },
    ],
    challenges: "Packaging a V8 into a 1978 engine bay with the firewall and steering intact.",
    decisions: "Custom engine plates rather than off-the-shelf mounts for precise placement.",
    relatedVideoIds: ["v-08"],
    relatedPostSlugs: ["choosing-the-l98-v8"],
    order: 3,
  },
  {
    id: "bs-transmission",
    title: "6L80E Transmission",
    slug: "6l80e-transmission",
    category: "Powertrain",
    summary:
      "A six-speed 6L80E automatic paired to the LandCruiser transfer case for touring and low-range work.",
    status: "planned",
    progress: 10,
    heroImage: {
      src: "/build/transmission.jpg",
      alt: "The V8 and transmission mocked into the LandCruiser chassis with the Chinook behind",
      width: 1600,
      height: 900,
    },
    body: [
      "The 6L80E is a stout six-speed automatic that suits the V8's torque and makes long highway stints and technical low-range crawling equally comfortable.",
      "Integration means marrying GM transmission to a Toyota transfer case — an adapter and custom tailshaft work.",
    ],
    specifications: [
      { label: "Transmission", value: "6L80E 6-speed auto" },
      { label: "Transfer case", value: "LandCruiser, dual-range" },
      { label: "Control", value: "Standalone TCU" },
    ],
    challenges: "Mating a GM transmission to a Toyota transfer case reliably.",
    decisions: "Standalone transmission controller for full tuning control.",
    relatedVideoIds: ["v-08"],
    order: 4,
  },
  {
    id: "bs-electrical",
    title: "Electrical & Control Systems",
    slug: "electrical-control-systems",
    category: "Electrical",
    summary:
      "A hybrid Raspberry Pi + ESP32 control system runs lighting, water, power and a Tesla-style digital dashboard — extremely engineered to keep working even if the main screen fails.",
    status: "in-progress",
    progress: 55,
    heroImage: {
      src: "/build/electrical.jpg",
      alt: "The extremely engineered vintage Chinook's halo LED headlights glowing at dusk",
      width: 1600,
      height: 900,
    },
    body: [
      "This extreme camper's electrical system is designed like a small vehicle network. A mini-computer acts as the 'pretty brain' — the touchscreen UI, maps, media and local server — while rugged microcontrollers form the reliable nervous system that actually switches loads and reads sensors.",
      "The critical rule: the mini-computer is never the only device responsible for a critical load. If the main screen reboots, the vehicle and habitat keep functioning through the controllers and physical switch fallbacks.",
      "Three controllers split the work — a Cab controller (CAN/OBD data, front lighting, ignition sense), a Habitat controller (interior lighting, water, fans, fridge, inverter, audio zones) and a Security controller (immobiliser, sensors, cameras). They share a single central state model and talk over MQTT and USB serial. It's what makes this vintage 4x4 camper truly unique.",
    ],
    specifications: [
      { label: "UI brain", value: "Raspberry Pi 5" },
      { label: "Controllers", value: "ESP32-S3 / Teensy 4.1" },
      { label: "Comms", value: "MQTT + USB serial" },
      { label: "House battery", value: "300–600", unit: "Ah" },
      { label: "Solar", value: "250–500", unit: "W" },
      { label: "240V", value: "AS/NZS 3001" },
    ],
    challenges:
      "Building automotive-grade reliability: safe startup/shutdown for the Pi, brownout protection during cranking, and physical fallbacks for every critical circuit.",
    decisions:
      "Local-first and offline-capable. Controllers run independently; the dashboard is a client, never the switch. 240V is contactor-controlled and electrician-installed.",
    lessons:
      "Designing the state model first — one shared JSON contract across UI, server and firmware — made every later decision simpler.",
    relatedVideoIds: ["v-05"],
    relatedPostSlugs: ["designing-the-digital-dashboard"],
    order: 5,
  },
  {
    id: "bs-fuel",
    title: "Custom Fuel System",
    slug: "custom-fuel-system",
    category: "Powertrain",
    summary:
      "A ~200-litre fuel system for genuine remote-area range — designed for an extreme camper built for serious adventure.",
    status: "planned",
    progress: 5,
    body: [
      "Serious Australian adventure means long distances between fuel. A large-capacity custom tank, sized around the extended chassis, gives this extreme camper the range to cross deserts with margin.",
      "EFI-appropriate baffling, surge control and sender integration feed the digital dashboard's fuel readout.",
    ],
    specifications: [
      { label: "Capacity", value: "~200", unit: "L" },
      { label: "Feed", value: "EFI surge tank" },
      { label: "Material", value: "Alloy" },
    ],
    challenges: "Packaging capacity around the extended chassis and rear overhang limits.",
    decisions: "Custom alloy tank with baffling tuned for corrugations and steep angles.",
    relatedPostSlugs: ["planning-the-fuel-system"],
    order: 6,
  },
];
