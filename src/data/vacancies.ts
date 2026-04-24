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
  whatWeOffer?: string[];
  reports: string;
}

export const VACANCIES: Vacancy[] = [
  {
    slug: "hand-dig-teams",
    title: "Hand Dig Teams",
    location: "North West & Glasgow",
    type: "Full-time · PAYE",
    days: 1,
    salary: "Competitive · DOE",
    summary:
      "Lambs is looking for experienced Hand Dig Teams to undertake excavation and blockage clearance works on the Openreach network, delivering safe, compliant outcomes first time.",
    responsibilities: [
      "Carry out hand digging and blockage clearance in accordance with company and HAUC standards.",
      "Support civils reinstatement activities as part of a team.",
      "Operate hand tools safely and in line with RAMS and site controls.",
      "Work within traffic management setups and maintain a safe working environment.",
      "Set up safe sites and reinstate areas to the required standard.",
      "Capture and upload all required site evidence using company software.",
    ],
    requirements: [
      "Full UK driving licence for at least one operative in the team.",
      "Strong work ethic, reliability, and ability to work in all weather conditions.",
      "Commitment to safe working and high-quality workmanship.",
    ],
    nice: [
      "Previous civils and/or reinstatement experience.",
      "NRSWA Street Works ticket.",
    ],
    whatWeOffer: [
      "Competitive pay structure.",
      "Consistent pipeline of work.",
      "Supportive management and operational environment.",
      "All materials supplied.",
    ],
    reports: "Operations Manager",
  },
  {
    slug: "overlay-teams",
    title: "Overlay Teams",
    location: "North West & Glasgow",
    type: "Full-time · PAYE",
    days: 1,
    salary: "Competitive · DOE",
    summary:
      "We are recruiting Overlay Teams to deliver overlay and track works on the Openreach network, working to Lambs' and HAUC standards in a high-volume, compliance-driven environment.",
    responsibilities: [
      "Undertake overlay and track works to agreed specifications and HAUC standards.",
      "Operate excavators and hand tools safely and in line with company procedures.",
      "Work effectively within traffic management setups.",
      "Support civils reinstatement activities as required.",
      "Ensure safe site setup and compliance with NRSWA and local authority requirements.",
      "Capture and upload all required photographic and job evidence using company software.",
    ],
    requirements: [
      "Valid digger/excavator ticket.",
      "Demonstrable experience working as part of a civils or reinstatement team.",
      "Strong work ethic, reliability, and commitment to safe working practices.",
    ],
    nice: [
      "Civils experience.",
      "NRSWA Street Works ticket.",
    ],
    whatWeOffer: [
      "Competitive pay structure.",
      "Ongoing pipeline of work.",
      "Supportive management and operational team.",
      "All materials supplied.",
    ],
    reports: "Operations Manager",
  },
  {
    slug: "reinstatement-grab-manager",
    title: "Reinstatement & Grab Manager",
    location: "North West",
    type: "Full-time · PAYE",
    days: 1,
    salary: "Competitive · DOE",
    summary:
      "We are recruiting a Reinstatement & Grab Manager to lead and coordinate reinstatement and grab operations across our Openreach works in the North West. This role is responsible for ensuring materials, routes, and workmanship are planned and delivered to programme, specification, and permit constraints.",
    responsibilities: [
      "Receive meterage and job data from site supervisors and convert into daily reinstatement plans.",
      "Calculate accurate tarmac and material requirements for reinstatement works.",
      "Plan and optimise work routes in line with permit end dates and client priorities.",
      "Order materials directly with the supply lead, ensuring availability against programme.",
      "Monitor on-site reinstatement quality and address any defects or non-conformances.",
      "Ensure all reinstatement activities comply with HAUC and client specifications.",
      "Coordinate with supervisors, grab operators, and reinstatement teams to maintain productivity and compliance.",
      "Support continuous improvement in quality, safety, and efficiency.",
    ],
    requirements: [
      "Strong understanding of HAUC reinstatement standards and NRSWA requirements.",
      "Demonstrable experience in a reinstatement, civils, or highways management role.",
      "Excellent organisational, planning, and routing skills.",
      "Experience managing materials, logistics, and suppliers.",
      "Confident communicator with field teams, coordinators, and clients.",
      "Proactive approach to quality control, issue resolution, and programme risk.",
    ],
    nice: [],
    whatWeOffer: [
      "Key leadership role in a critical reinstatement function on a major UK telecoms network.",
      "Opportunity to shape and improve processes across materials, planning, and quality.",
    ],
    reports: "Operations Manager",
  },
  {
    slug: "reinstatement-teams",
    title: "Reinstatement Teams",
    location: "North West & Glasgow",
    type: "Full-time · PAYE",
    days: 1,
    salary: "Competitive · DOE",
    summary:
      "Lambs is seeking experienced Reinstatement Teams to support civils works on the Openreach network. You will deliver high-quality reinstatement across a range of materials, working safely and efficiently within live street works environments.",
    responsibilities: [
      "Carry out reinstatement of a variety of surfaces including 6mm/10mm materials, Hot Rolled Asphalt (HRA), sand carpet, flags and blocks.",
      "Work within traffic management setups in accordance with current regulations.",
      "Ensure safe site setup and maintain a clean, compliant working area.",
      "Follow NRSWA requirements and all applicable HAUC specifications.",
      "Capture and upload site evidence using company software.",
      "Represent Lambs professionally on client and public premises at all times.",
    ],
    requirements: [
      "Proven experience in civils reinstatement.",
      "NRSWA Street Works ticket.",
      "Strong awareness of health, safety, and environmental standards.",
      "Reliable, punctual, and able to work as part of a team.",
    ],
    nice: [],
    reports: "Operations Manager",
  },
];
