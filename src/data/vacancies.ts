export interface Vacancy {
  slug: string;
  title: string;
  location: string;
  type: string;
  days: number;
  summary: string;
  salary?: string;
  responsibilities: string[];
  requirements: string[];
  nice: string[];
  reports: string;
}

export const VACANCIES: Vacancy[] = [
  {
    slug: "fibre-jointer",
    title: "Fibre Jointer",
    location: "North West",
    type: "Full-time · PAYE",
    days: 4,
    summary:
      "Joining the Motif crew on the Virgin Media full-fibre rollout - ~2,500 jobs a week across the North West. Fusion splicing, ribbon splicing, OTDR testing and handover paperwork to operator standard.",
    salary: "Competitive · DOE",
    responsibilities: [
      "Fusion splicing and ribbon splicing in cabinets, chambers and premises",
      "OTDR testing and generating test records to operator standard",
      "Reading route drawings, marking up amendments, flagging route issues to the supervisor",
      "Following RAMS, signing toolbox talks and completing daily audit checks",
    ],
    requirements: [
      "Proven experience splicing single-mode fibre on operator programmes",
      "NRSWA (Streetworks) operative unit",
      "Full UK driving licence",
      "CSCS card",
    ],
    nice: [
      "Virgin Media / BT Openreach accreditation",
      "Experience on blown-fibre / microduct systems",
    ],
    reports: "Motif Team Manager",
  },
  {
    slug: "nrswa-operative",
    title: "NRSWA Operative",
    location: "North West",
    type: "Full-time · PAYE",
    days: 7,
    summary:
      "Delivering streetworks across telecoms and utilities programmes - excavation, ducting, chambers, compaction and permanent reinstatement, all to NRSWA standard.",
    salary: "Competitive · DOE",
    responsibilities: [
      "Excavation and reinstatement to NRSWA Code of Practice",
      "Laying ducts, marker tape and warning mesh; setting chambers",
      "Daily plant and PPE checks, lifting plan compliance",
      "Photographic sign-off of every reinstatement and close-out reporting",
    ],
    requirements: [
      "Full NRSWA operative units (Units 1 & 2 minimum)",
      "CSCS card",
      "Full UK driving licence",
    ],
    nice: ["Roller / dumper tickets", "Previous fibre or DNO experience"],
    reports: "Site Supervisor",
  },
  {
    slug: "groundworker",
    title: "Groundworker",
    location: "UK-wide",
    type: "Full-time · PAYE",
    days: 2,
    summary:
      "Civils groundworks across housebuilder, utilities and local-authority schemes - foundations, drainage, ducting routes, chambers, kerbs and reinstatement. UK-wide travel, accommodation provided.",
    salary: "Competitive · DOE + away allowance",
    responsibilities: [
      "Setting out, excavation, drainage and ducting installation",
      "Laying kerbs, flags and footways",
      "Hand-pack and compacted reinstatement to specification",
      "Keeping the site tidy, safe and signed",
    ],
    requirements: [
      "Relevant CSCS card",
      "Willingness to travel nationally (accommodation covered)",
      "Full UK driving licence",
    ],
    nice: ["NRSWA operative tickets", "Plant tickets (360, roller, dumper)"],
    reports: "Site Supervisor",
  },
  {
    slug: "site-supervisor",
    title: "Site Supervisor",
    location: "Warrington HQ",
    type: "Full-time · PAYE",
    days: 14,
    summary:
      "Running a crew day-to-day across one or more live programmes - toolbox talks, RAMS reviews, audits, progress reporting and being the face of Lambs on site. HQ-based with daily site visits in the North West.",
    salary: "Competitive · DOE + vehicle",
    responsibilities: [
      "Lead and mentor a crew of directly-employed operatives",
      "Run daily toolbox talks and morning audit calls",
      "Review RAMS, complete audits, enforce PPE and permit compliance",
      "Report progress to the Operations Director and client programme managers",
    ],
    requirements: [
      "SMSTS or SSSTS current",
      "NEBOSH General Certificate (or willingness to gain)",
      "First Aid at Work",
      "Full UK driving licence",
    ],
    nice: [
      "NRSWA Supervisor qualification",
      "Civils + telecoms programme experience",
    ],
    reports: "Operations Director",
  },
];
