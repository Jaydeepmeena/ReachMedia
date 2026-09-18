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
  titleLead: "Content Built for Real Patients",
  titleHighlight: "Not Just the Next Feed!",
  /** Line under the headline: the vanity metrics on the left, what we are judged on at the right. */
  kicker: { from: "Likes. Shares. Follows. Impressions", to: "Booked Appointments" },
  subtitle:
    "Reach Media builds, shoots and runs your social media across Instagram, LinkedIn, Facebook and YouTube, so every doctor, clinic and hospital we work with is judged by appointments, not algorithms.",
  primaryCta: { label: "Get a Free Audit", href: "#audit" },
  secondaryCta: { label: "See Real Results", href: "#results" },
  bullets: [
    "Healthcare Social Media Management",
    "Healthcare Influencer Marketing",
    "Doctor & Clinic Content Production",
    "Performance Marketing Built for Patients",
  ],
};

/** Headline KPI strip under the hero. */
export const heroStats = [
  { value: 115, decimals: 0, suffix: "+", label: "Healthcare Accounts Managed", placeholder: false },
  { value: 4.2, decimals: 1, suffix: "M", label: "Monthly Content Views", placeholder: false },
  { value: 10, decimals: 0, suffix: "+", label: "Years of Healthcare Marketing Experience", placeholder: false },
  { value: 4, decimals: 0, suffix: "+", label: "Specialities Covered", placeholder: false },
];

export const specialities = [
  {
    id: "ivf",
    name: "IVF & Fertility",
    icon: "HeartPulse",
    blurb:
      "Fertility treatment is rarely discussed openly, which means most of the research happens quietly, over several months, before a couple ever calls a clinic. Content built for this speciality has to hold that patience, answering cost, process and success-rate questions clearly, without pushing for an enquiry too soon.",
    focus: [
      "IVF & IUI Process Explainers",
      "Success-Rate Context, Stated Plainly",
      "Content That Acknowledges The Emotional Weight Of Trying Again",
      "Cost & Instalment Clarity, Upfront",
    ],
    metric: { value: "3.1X", label: "More Enquiry DMs", placeholder: false },
    cta: "Audit My IVF & Fertility Presence",
  },
  {
    id: "eye",
    name: "Eye Hospitals",
    icon: "Eye",
    blurb:
      "An eye patient often moves from noticing a symptom to booking a consultation within days, sometimes hours. Content for this speciality has to recognise urgency without exaggerating risk, and explain routine procedures clearly enough that older patients feel informed rather than alarmed.",
    focus: [
      "Symptom-Recognition Content (“Signs Not To Ignore”)",
      "Cataract & LASIK Procedure Explainers",
      "Pre-Op & Post-Op Expectation-Setting",
      "Content Built For An Older, More Cautious Audience",
    ],
    metric: { value: "+48%", label: "LASIK Enquiry Share", placeholder: false },
    cta: "Audit My Eye Clinic/Hospital Presence",
  },
  {
    id: "dental",
    name: "Dental Clinics",
    icon: "Toothbrush",
    blurb:
      "Dental patients decide faster when they can see the outcome for themselves, which is why comparable, visual content works harder here than in most other specialities. Every treatment gets explained alongside what it actually costs, since price is usually the first real objection.",
    focus: [
      "Implant & Aligner Explainers",
      "Documented, Consented Before/After Content",
      "Clear Pricing & Instalment Information",
      "Local Reputation & Review-Led Content",
    ],
    metric: { value: "2.4X", label: "Consultation Bookings", placeholder: false },
    cta: "Audit My Dental Clinic/Hospital Presence",
  },
  {
    id: "hospital",
    name: "Multi-Speciality Hospitals",
    icon: "Hospital",
    blurb:
      "A multi-speciality hospital is effectively several clinics operating under one name. Each department needs its own content voice and its own calendar slot, while the hospital brand itself keeps building trust across all of them at once — one is not sacrificed for the other.",
    focus: [
      "Department-Specific Content Calendars",
      "Doctor-Led Authority Content, By Department",
      "Facility & Infrastructure Films",
      "Patient Experience Stories, With Consent",
    ],
    metric: { value: "11", label: "Departments Run Monthly", placeholder: false },
    cta: "Audit My Multi-Speciality Presence",
  },
];

export const services = [
  {
    id: "social",
    icon: "Share2",
    title: "Social Media Handling",
    summary:
      "End-to-end ownership of Instagram, LinkedIn, Facebook and YouTube: strategy, calendar, publishing, community management and reporting, run as one system instead of six separate hand-offs.",
    points: [
      "Account Setup for New Profiles, or a Full Audit for Existing Ones",
      "Three-Month Content Strategy, Reviewed Monthly",
      "Daily Posting, Stories and Scheduling Across Every Platform",
      "DMs, Comments and Reviews Answered Within the Day",
      "Trending and Topical-Day Content, Planned in Advance",
      "Profile, Bio, Highlights and Lead-Form Setup",
      "Monthly Review Call With the Clinic or Hospital Team",
    ],
    deliverable: "Content Calendar, Planned Quarterly",
  },
  {
    id: "design",
    icon: "PenTool",
    title: "Content Creation & Design",
    summary:
      "Medically accurate, on-brand creative, plus captions and copywriting in your brand’s own voice, not a generic agency tone borrowed from another industry.",
    points: [
      "Treatment Explainer Carousels",
      "Doctor Credibility and Achievement Posts",
      "Consented Before/After and Case-Study Layouts",
      "Festival, Camp and Offer Campaigns",
      "Captions Written in Your Brand Voice",
    ],
    deliverable: "12–30 Assets / Month",
  },
  {
    id: "video",
    icon: "Video",
    title: "Video & Reels",
    summary:
      "Script to publish: we write it, direct the doctor on the day, and cut it for the platform it’s actually going to live on.",
    points: [
      "Monthly On-Site Shoot Day at Your Clinic or Hospital",
      "Doctor Reels With Teleprompter-Ready Scripts",
      "Consented Patient Testimonial Films",
      "Procedure and Facility Walkthroughs",
      "YouTube Explainers and Healthcare Podcast Planning",
      "Subtitles and Platform-Specific Edits",
    ],
    deliverable: "One On-Site Shoot Day / Month",
  },
  {
    id: "paid",
    icon: "Megaphone",
    title: "Paid Media",
    summary:
      "Reach and content don’t fill a waiting room on their own. We run the paid campaigns that turn the right person watching into the right person calling.",
    points: [
      "Meta and Instagram Ads for High-Intent Treatments",
      "LinkedIn Ads for Referral and Corporate Audiences",
      "Landing Page and Lead-Form Alignment",
      "Weekly Budget and Bid Optimisation",
      "Retargeting for Warm, Already-Engaged Audiences",
    ],
    deliverable: "Live Ad Account, Managed Weekly",
  },
  {
    id: "influencer",
    icon: "Users",
    title: "Healthcare Influencer Marketing",
    summary:
      "Not every healthcare creator is right for every clinic. We match your speciality to creators whose audience, tone and compliance history actually fit.",
    points: [
      "Creator Identification and Vetting, by Speciality",
      "Collaboration Briefs Written for Medical Accuracy",
      "Consent and Compliance Checks Before Publishing",
      "Performance Tracking Per Collaboration",
      "Ongoing Relationship Management, Not One-Off Deals",
    ],
    deliverable: "Vetted Per Speciality",
  },
  {
    id: "reporting",
    icon: "TrendingUp",
    title: "Reporting",
    summary:
      "Content is only half the job. We track what turned into a DM, a call and a walk-in, not just what turned into a like.",
    points: [
      "Live Dashboard Shared With Your Team",
      "Competitor Analysis and a Six-Monthly Detailed Review",
      "Lead Tracking From Post to Enquiry to Appointment",
      "Engagement, Click-Through Rate and ROAS, Explained Plainly",
      "Monthly Review Call With Clear Next-Step Recommendations",
    ],
    deliverable: "Monthly Review, Live Dashboard",
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
    title: "Clinic Deep-Dive",
    body: "Our content strategists sit with your doctors and front desk to map every treatment, ticket size and seasonal pattern specific to your speciality, pulling the list of questions patients actually ask before they book straight from real conversations, not assumptions.",
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Strategy & Calendar",
    body: "Our content strategists and copywriters build a speciality-specific content plan, mapping every post to a platform, a patient type and a call to action before it’s written, then get it approved once by your team and run it for the full month.",
    duration: "Week 1–2",
  },
  {
    step: "03",
    title: "Shoot & Produce",
    body: "Our videographers and designers cover the full month in one on-site shoot day, scripts ready before the doctor arrives and in and out within two hours, with editing and design handled entirely on our side afterwards.",
    duration: "Week 2",
  },
  {
    step: "04",
    title: "Publish & Respond",
    body: "Our community managers keep every platform active with daily posting and stories, answer comments and DMs within the day, and route every enquiry to your front desk with a tracked handover, so nothing gets lost between a DM and a phone call.",
    duration: "Week 4",
  },
  {
    step: "05",
    title: "Promote & Report",
    body: "Our performance marketers and analysts run the paid campaigns and influencer collaborations alongside the content, then track every enquiry back to its source and bring you a monthly report on what actually turned into a call.",
    duration: "Week 5",
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
  },
  {
    id: "eye-carousel",
    type: "Carousel",
    speciality: "Eye",
    title: "5 signs you should not ignore blurry vision",
    meta: "7 slides · Instagram",
    image: "/samples/eye-carousel.png",
    stat: "18.2K saves",
  },
  {
    id: "dental-ba",
    type: "Before / After",
    speciality: "Dental",
    title: "Full-mouth implants — a six month transformation",
    meta: "Static post · Instagram",
    image: "/samples/dental-before-after.png",
    stat: "9.4K shares",
  },
  {
    id: "hospital-film",
    type: "Facility Film",
    speciality: "Hospital",
    title: "Inside our 24×7 emergency department",
    meta: "1:20 · YouTube + Meta",
    image: "/samples/hospital-film.png",
    stat: "1.1M reach",
  },
  {
    id: "doctor-trust",
    type: "Trust Post",
    speciality: "Hospital",
    title: "Meet the surgeon before the surgery",
    meta: "Static post · LinkedIn",
    image: "/samples/doctor-trust.png",
    stat: "2.8K profile visits",
  },
  {
    id: "dental-story",
    type: "Story Sequence",
    speciality: "Dental",
    title: "Book your aligner consultation this week",
    meta: "4 frames · Instagram Stories",
    image: "/samples/dental-story.png",
    stat: "640 link taps",
  },
];

export const differentiators = [
  {
    icon: "Stethoscope",
    title: "Healthcare Only",
    body: "A generic social media agency treats a dental implant post the same way it treats a restaurant’s dinner special. We don’t, because the two have nothing in common. Every template, script and compliance check on this page was built for clinics and hospitals, and for nothing else.",
  },
  {
    icon: "Megaphone",
    title: "Planned Alongside Paid Media",
    body: "Most social media agencies hand you a content calendar and walk away before the ad account even opens. Our parent team already runs Google and Meta ads for healthcare clients, so your content gets planned to feed that funnel, not published in isolation from it.",
  },
  {
    icon: "ShieldCheck",
    title: "Consent and Compliance First",
    body: "Most agencies find out about NMC advertising rules after a post gets flagged. We check patient consent, advertising norms and claim language before anything goes live, so your account never becomes the case study for what not to post.",
  },
  {
    icon: "ChartLine",
    title: "Enquiries, Not Just Likes",
    body: "A follower count doesn’t tell a clinic owner anything useful. We report on DMs, enquiries and consults booked, because that’s the only number that was ever going to matter to the person paying for this.",
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
    a: "We run social media end to end for doctors, clinics, clinic chains, hospitals and healthcare creators: strategy, content calendar, graphics, video, publishing, community management and monthly reporting. You approve once a month; we handle the rest.",
  },
  {
    q: "Do our doctors have to shoot videos every week?",
    a: "No. One on-site shoot day a month covers the full month’s reels and content, whether it’s for a doctor’s personal profile, a clinic, or a hospital department, so the time commitment stays under two hours.",
  },
  {
    q: "Which platforms do you manage?",
    a: "Instagram as the primary platform, LinkedIn as a growing authority channel, Facebook for community and local reach, and YouTube for longer-form patient education content, each planned for its own role.",
  },
  {
    q: "Can you manage a personal profile, not just a clinic or hospital account?",
    a: "Yes. We manage individual doctor profiles, single clinics, multi-location clinic chains, hospital accounts across departments, and pages for healthcare influencers and content creators who need someone to run their page.",
  },
  {
    q: "How do you handle patient privacy and consent?",
    a: "Every before/after, testimonial or patient-facing piece requires documented consent before it’s shot, and again before it’s published. No patient name, phone number or medical history ever appears in content.",
  },
  {
    q: "Will this actually bring appointments?",
    a: "Social media supports patient trust, recall and enquiry flow when it’s planned around real patient questions and backed by responsive community management and paid promotion. It works alongside your other marketing, not instead of it.",
  },
  {
    q: "Who is Reinvent Digital?",
    a: "Reinvent Digital is Reach Media’s parent company, a team that already runs SEO, paid ads and patient-acquisition reporting for healthcare clients across India.",
  },
];

export const audit = {
  eyebrow: "Free audit",
  title: "Get a Free Social Media Audit for Your Profile",
  body: "Tell us your speciality and your handle. Within 3 working days you get a recorded walkthrough of what is working, what is leaking enquiries, and a 30-day plan you can run with or without us.",
  perks: [
    "Profile & Competitor Teardown",
    "Missing Treatment Topics For Your Speciality",
    "A 30-Day Content Plan, Yours To Keep",
  ],
  specialityOptions: [
    "IVF & Fertility",
    "Eye Hospital",
    "Dental Clinic",
    "Multi-Speciality Hospital",
    "Other",
  ],
};
