import type { BuildMilestone } from "@/lib/types";

export const milestones: BuildMilestone[] = [
  { id: "m1", title: "Finding the Chinook", slug: "finding-the-chinook", date: "2026-03", status: "completed", summary: "Tracking down a rare 1978 Toyota Chinook camper.", order: 1 },
  { id: "m2", title: "Original Vehicle Assessment", slug: "assessment", date: "2026-04", status: "completed", summary: "Evaluating the body and tired original running gear.", order: 2 },
  { id: "m3", title: "80 Series Chassis Prep", slug: "chassis-prep", date: "2026-05", status: "completed", summary: "Blasting, inspecting and prepping the donor chassis.", order: 3 },
  { id: "m4", title: "Wheelbase Extension", slug: "wheelbase", date: "2026-06", status: "in-progress", summary: "Cutting, sleeving and extending the frame.", order: 4 },
  { id: "m5", title: "Engine & Transmission", slug: "drivetrain", date: "2026-07", status: "in-progress", summary: "Mounting the L98 V8 and 6L80E.", order: 5 },
  { id: "m6", title: "Firewall & Tunnel", slug: "firewall", status: "planned", summary: "Rebuilding the firewall and transmission tunnel.", order: 6 },
  { id: "m7", title: "Electrical & Dashboard", slug: "electrical", status: "in-progress", summary: "Hybrid control system and digital dashboard.", order: 7 },
  { id: "m8", title: "Fuel System", slug: "fuel", status: "planned", summary: "Custom ~200L tank for remote range.", order: 8 },
  { id: "m9", title: "Engineering & Compliance", slug: "engineering", status: "planned", summary: "Australian engineering approval and road compliance.", order: 9 },
  { id: "m10", title: "Interior Fitout", slug: "interior", status: "planned", summary: "Bespoke camper interior.", order: 10 },
  { id: "m11", title: "Testing", slug: "testing", status: "planned", summary: "Shakedown and systems testing.", order: 11 },
  { id: "m12", title: "First Trip", slug: "first-trip", status: "planned", summary: "The Chinook's first Australian adventure.", order: 12 },
];
