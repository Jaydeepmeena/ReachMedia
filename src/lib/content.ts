/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  REACH MEDIA — SINGLE SOURCE OF TRUTH FOR ALL SITE COPY & NUMBERS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything the site renders lives here. Edit this file, not the components.
 *
 *  PLACEHOLDER NUMBERS: every value tagged `placeholder: true` below is an
 *  illustrative figure, NOT a verified client result. Replace them with your own
 *  reporting before this site goes live, and flip the flag to false. Anything
 *  still marked as a placeholder renders with a visible "sample" label so you
 *  never accidentally publish an unverified claim.
 *
 *  SCREENSHOTS: drop real Meta / Instagram / YouTube analytics exports into
 *      public/proof/    (referenced by `image` below)
 *      public/samples/  (creative work samples)
 *  If a file is missing, the UI falls back to a styled placeholder automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Reach Media",
  tagline: "Ideas Reach People",
  parent: "Reinvent Digital",
  description:
    "Healthcare social media management for IVF, eye, dental and multi-speciality hospitals. Content that helps patients understand, trust and book.",
  url: "https://reachmedia.in",
  email: "hello@reachmedia.in",
  phone: "+91 00000 00000",
  city: "India",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
};

export const nav = [
  { label: "Specialities", href: "#specialities" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "FAQs", href: "#faqs" },
];

export const hero = {
  eyebrow: "An initiative by Reinvent Digital",
  titleLead: "Make your clinic the one",
  titleHighlight: "patients already trust",
  subtitle:
    "We plan, shoot, design and publish healthcare content for IVF centres, eye hospitals, dental chains and multi-speciality hospitals — so the right patient finds you, understands the treatment, and picks up the phone.",
  primaryCta: { label: "Get a free social audit", href: "#audit" },
  secondaryCta: { label: "See real results", href: "#results" },
  bullets: [
    "Done-for-you monthly content",
    "Doctor reels, posts & captions",
    "Built for patient enquiries",
  ],
};

/** Headline KPI strip under the hero. */
export const heroStats = [
  { value: 115, decimals: 0, suffix: "+", label: "Clinic locations supported", placeholder: false },
  { value: 4.2, decimals: 1, suffix: "M", label: "Monthly content views", placeholder: true },
  { value: 62, decimals: 0, suffix: "%", label: "Avg. lift in profile visits", placeholder: true },
  { value: 8, decimals: 0, suffix: " mo", label: "To measurable walk-in growth", placeholder: false },
];

export const specialities = [
  {
    id: "ivf",
    name: "IVF & Fertility",
    icon: "HeartPulse",
    blurb:
      "Fertility is a decision made over months, not minutes. We build content that answers quietly — costs, timelines, success rates and the emotional reality — so couples arrive informed instead of anxious.",
    focus: [
      "IVF / IUI explainers",
      "Success-rate transparency",
      "Emotional reassurance stories",
      "Cost & EMI clarity",
    ],
    metric: { value: "3.1x", label: "more enquiry DMs", placeholder: true },
  },
  {
    id: "eye",
    name: "Eye Hospitals",
    icon: "Eye",
    blurb:
      "LASIK sells on confidence; cataract sells on care. We separate the two, speak to the right age group on the right platform, and route both into the same booking desk.",
    focus: [
      "LASIK decision content",
      "Cataract for family decision-makers",
      "Retina & diabetic eye awareness",
      "Optical & screening camps",
    ],
    metric: { value: "+48%", label: "LASIK enquiry share", placeholder: true },
  },
  {
    id: "dental",
    name: "Dental Clinics",
    icon: "Toothbrush",
    blurb:
      "Dental buys on before-and-after and on fear reduction. We build a treatment-wise content shelf so implants, aligners and smile design each get their own patient journey.",
    focus: [
      "Implants & full-mouth rehab",
      "Aligners & smile design",
      "Pain-free / sedation messaging",
      "Paediatric dentistry",
    ],
    metric: { value: "2.4x", label: "consult bookings", placeholder: true },
  },
  {
    id: "hospital",
    name: "Multi-Speciality",
    icon: "Hospital",
    blurb:
      "A hospital is many clinics wearing one logo. We give every department its own voice and calendar, while the master brand keeps building credibility above it.",
    focus: [
      "Department-wise calendars",
      "Doctor authority building",
      "Facility & infrastructure films",
      "Patient success stories",
    ],
    metric: { value: "11", label: "departments run monthly", placeholder: true },
  },
];

export const services = [
  {
    id: "social",
    icon: "Share2",
    title: "Social Media Handling",
    summary:
      "End-to-end ownership of Instagram, Facebook, YouTube and LinkedIn — strategy, calendar, publishing, community and reporting.",
    points: [
      "Monthly content calendar built from real patient questions",
      "Daily posting, stories & scheduling across platforms",
      "DM and comment response playbook for enquiries",
      "Profile, bio, highlights & lead-form optimisation",
      "Monthly performance review with the clinic team",
    ],
    deliverable: "20–30 assets / month",
  },
  {
    id: "graphics",
    icon: "PenTool",
    title: "Graphics & Design",
    summary:
      "Medically accurate, on-brand creative that a patient can actually read on a phone in three seconds.",
    points: [
      "Treatment explainer carousels",
      "Doctor credibility & achievement posts",
      "Before / after and case-study layouts",
      "Festival, camp and offer campaigns",
      "Print-ready OP cards, standees & brochures",
    ],
    deliverable: "12–18 designs / month",
  },
  {
    id: "video",
    icon: "Video",
    title: "Video & Reels",
    summary:
      "Shoot-to-publish video: we write the script, direct the doctor, and cut it for the platform it lives on.",
    points: [
      "Monthly on-site shoot day at your facility",
      "Doctor reels with teleprompter-ready scripts",
      "Patient testimonial films (consent-first)",
      "Procedure & facility walkthroughs",
      "Subtitles, regional-language versions & thumbnails",
    ],
    deliverable: "8–12 videos / month",
  },
  {
    id: "growth",
    icon: "TrendingUp",
    title: "Performance & Reporting",
    summary:
      "Content is only half the job. We track what turned into a call, a form and a walk-in.",
    points: [
      "Meta & Google ads for high-intent treatments",
      "Lead tracking from post to DM to appointment",
      "Call-centre script alignment with campaigns",
      "Live KPI dashboard shared with the clinic",
      "Monthly review call with recommendations",
    ],
    deliverable: "Live dashboard + monthly review",
  },
];

/**
 * KPI / proof cards. Each can carry a real analytics screenshot.
 * Put the file in public/proof/ and set `image` to its path.
 */
export const kpiCases = [
  {
    id: "ivf-reach",
    speciality: "IVF & Fertility",
    platform: "Instagram Insights",
    headline: "Accounts reached",
    value: "1.98M",
    delta: "+412%",
    window: "90 days",
    note: "Reel-led education series on IVF cost and success rates.",
    image: "/proof/ivf-reach.png",
    placeholder: true,
    metrics: [
      { label: "Reach", value: "1,984,201", delta: "+412%" },
      { label: "Profile visits", value: "38,410", delta: "+186%" },
      { label: "Enquiry DMs", value: "1,247", delta: "+214%" },
    ],
  },
  {
    id: "eye-lasik",
    speciality: "Eye Hospital",
    platform: "Meta Business Suite",
    headline: "Leads from content",
    value: "820",
    delta: "+63%",
    window: "6 months",
    note: "LASIK awareness funnel across Reels and lead forms.",
    image: "/proof/eye-leads.png",
    placeholder: true,
    metrics: [
      { label: "Qualified leads", value: "820", delta: "+63%" },
      { label: "Cost per lead", value: "₹214", delta: "−41%" },
      { label: "Consults booked", value: "297", delta: "+58%" },
    ],
  },
  {
    id: "dental-video",
    speciality: "Dental Chain",
    platform: "YouTube Studio",
    headline: "Video views",
    value: "742K",
    delta: "+290%",
    window: "4 months",
    note: "Implant explainer series across 9 clinic locations.",
    image: "/proof/dental-views.png",
    placeholder: true,
    metrics: [
      { label: "Views", value: "742,905", delta: "+290%" },
      { label: "Watch time", value: "18.4K hrs", delta: "+240%" },
      { label: "Subscribers", value: "9,120", delta: "+310%" },
    ],
  },
  {
    id: "hospital-brand",
    speciality: "Multi-Speciality",
    platform: "Instagram Insights",
    headline: "Follower growth",
    value: "24.6K",
    delta: "+178%",
    window: "8 months",
    note: "Eleven departments running on one master calendar.",
    image: "/proof/hospital-followers.png",
    placeholder: true,
    metrics: [
      { label: "Followers", value: "24,612", delta: "+178%" },
      { label: "Interactions", value: "96,430", delta: "+205%" },
      { label: "Website taps", value: "12,088", delta: "+143%" },
    ],
  },
];

export const process = [
  {
    step: "01",
    title: "Clinic deep-dive",
    body: "We sit with your doctors and front desk to map treatments, ticket sizes, seasonality and the twenty questions every patient actually asks before booking.",
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Strategy & calendar",
    body: "A speciality-specific content plan: what gets posted, on which platform, to which patient, with which call to action. Approved once, monthly.",
    duration: "Week 1–2",
  },
  {
    step: "03",
    title: "Shoot & produce",
    body: "One shoot day at your facility covers the month. Scripts ready, doctor in and out in two hours. Design and edit happen on our side.",
    duration: "Week 2",
  },
  {
    step: "04",
    title: "Publish & respond",
    body: "We post daily, run stories, reply to comments, and route every enquiry DM into your appointment desk with a tracked handover.",
    duration: "Ongoing",
  },
  {
    step: "05",
    title: "Measure & improve",
    body: "Monthly review on reach, enquiries and bookings — not vanity likes. What worked scales next month, what did not gets cut.",
    duration: "Monthly",
  },
];

export const workSamples = [
  {
    id: "ivf-reel",
    type: "Doctor Reel",
    speciality: "IVF",
    title: "Is IVF painful? A fertility specialist answers",
    meta: "0:38 · Instagram Reel",
    image: "/samples/ivf-reel.png",
    stat: "412K views",
    ratio: "portrait",
  },
  {
    id: "eye-carousel",
    type: "Carousel",
    speciality: "Eye",
    title: "5 signs you should not ignore blurry vision",
    meta: "7 slides · Instagram",
    image: "/samples/eye-carousel.png",
    stat: "18.2K saves",
    ratio: "square",
  },
  {
    id: "dental-ba",
    type: "Before / After",
    speciality: "Dental",
    title: "Full-mouth implants — a six month transformation",
    meta: "Static post · Instagram",
    image: "/samples/dental-before-after.png",
    stat: "9.4K shares",
    ratio: "square",
  },
  {
    id: "hospital-film",
    type: "Facility Film",
    speciality: "Hospital",
    title: "Inside our 24×7 emergency department",
    meta: "1:20 · YouTube + Meta",
    image: "/samples/hospital-film.png",
    stat: "1.1M reach",
    ratio: "landscape",
  },
  {
    id: "doctor-trust",
    type: "Trust Post",
    speciality: "Hospital",
    title: "Meet the surgeon before the surgery",
    meta: "Static post · LinkedIn",
    image: "/samples/doctor-trust.png",
    stat: "2.8K profile visits",
    ratio: "square",
  },
  {
    id: "dental-story",
    type: "Story Sequence",
    speciality: "Dental",
    title: "Book your aligner consultation this week",
    meta: "4 frames · Instagram Stories",
    image: "/samples/dental-story.png",
    stat: "640 link taps",
    ratio: "portrait",
  },
];

export const differentiators = [
  {
    icon: "Stethoscope",
    title: "Healthcare only",
    body: "We do not post for restaurants and real estate on the side. Every template, script and compliance check is built for clinics.",
  },
  {
    icon: "Headphones",
    title: "A call centre behind the content",
    body: "Our parent team runs a 15-agent healthcare call centre. We know what a lead sounds like when it converts — and we write for that.",
  },
  {
    icon: "ShieldCheck",
    title: "Consent & compliance first",
    body: "Patient consent, NMC advertising norms and claim discipline are built into the approval flow, not bolted on afterwards.",
  },
  {
    icon: "ChartLine",
    title: "Walk-ins, not likes",
    body: "We report on enquiries, consults and footfall. Reach is a means; the appointment book is the scoreboard.",
  },
];

export const testimonials = [
  {
    quote:
      "For the first time our IVF counselling calls start with the couple already knowing the process. The content does half the consultation before they walk in.",
    name: "Medical Director",
    role: "Fertility centre · South India",
    speciality: "IVF",
    placeholder: true,
  },
  {
    quote:
      "We used to post whenever someone remembered. Now there is a calendar, a shoot day and a report. Our LASIK enquiries are the highest they have ever been.",
    name: "Marketing Head",
    role: "Eye hospital group · 6 centres",
    speciality: "Eye",
    placeholder: true,
  },
  {
    quote:
      "Patients mention the reels at the front desk. That never used to happen. The implant videos in particular bring in exactly the right cases.",
    name: "Founder & Chief Dentist",
    role: "Dental chain · 9 clinics",
    speciality: "Dental",
    placeholder: true,
  },
  {
    quote:
      "Running eleven departments on one calendar sounded impossible. Their team handles it without us chasing, and the monthly review is genuinely useful.",
    name: "General Manager",
    role: "Multi-speciality hospital · 220 beds",
    speciality: "Hospital",
    placeholder: true,
  },
];

export const faqs = [
  {
    q: "What exactly does Reach Media do?",
    a: "We run your clinic's social media end to end — strategy, content calendar, graphics, video, publishing, community management and monthly reporting. You approve once a month; we handle the rest.",
  },
  {
    q: "Do our doctors have to shoot videos every week?",
    a: "No. We consolidate everything into one shoot day a month at your facility, typically under two hours of doctor time. Scripts are written and teleprompted so nothing is improvised on camera.",
  },
  {
    q: "Which platforms do you manage?",
    a: "Instagram, Facebook, YouTube and LinkedIn as standard. Google Business Profile and WhatsApp broadcast can be added where they make sense for your speciality.",
  },
  {
    q: "How do you handle patient privacy and consent?",
    a: "Nothing featuring a patient goes out without written consent. We keep a consent register, blur or recreate identifying details where needed, and keep claims within NMC advertising norms.",
  },
  {
    q: "Will this actually bring appointments?",
    a: "Content builds intent; the booking desk closes it. We route every enquiry to your team with tracking, align call scripts with the campaign, and report on consults — not just reach. Most clinics see measurable movement by month three.",
  },
  {
    q: "What does the free audit include?",
    a: "A review of your current profiles, your top three competitors in your city, the treatment topics you are missing, and a one-page 30-day content plan. No cost and no obligation.",
  },
  {
    q: "Who is Reinvent Digital?",
    a: "Our parent company — a healthcare growth team supporting 115+ clinic locations with performance marketing and a dedicated patient call centre. Reach Media is its social-media-first arm.",
  },
];

export const audit = {
  eyebrow: "Free, no obligation",
  title: "Get a free social media audit for your clinic",
  body: "Tell us your speciality and your handle. Within three working days you get a recorded walkthrough of what is working, what is leaking enquiries, and a 30-day plan you can run with or without us.",
  perks: [
    "Profile & competitor teardown",
    "Missing treatment topics for your speciality",
    "A 30-day content plan, yours to keep",
  ],
  specialityOptions: [
    "IVF & Fertility",
    "Eye Hospital",
    "Dental Clinic",
    "Multi-Speciality Hospital",
    "Other",
  ],
};
