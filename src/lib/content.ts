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
 *      public/proof/   (referenced by `image` below)
 *  If a file is missing, the UI falls back to a styled placeholder automatically.
 *
 *  VIDEOS: masters live in `src/client video/`. Run
 *      node scripts/process-client-videos.mjs
 *  to compress them into public/videos/ with a poster frame each.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Reach Media",
  tagline: "Ideas Reach People",
  parent: "Reinvent Digital",
  description:
    "Healthcare social media management for IVF, eye, dental and multi-speciality hospitals. Content that helps patients understand, trust and book.",
  url: "https://reachmedia.in",
  email: "contact@reachmedia.co.in",
  /** Primary line. Also what schema.org `telephone` reports. */
  phone: "+91 91828 31207",
  city: "India",
  /**
   * Shown wherever the site lists a way to get in touch. `href` carries the
   * protocol: tel: dials, wa.me opens WhatsApp.
   */
  contacts: [
    {
      label: "Sales",
      value: "+91 91828 31207",
      href: "tel:+919182831207",
      icon: "phone" as const,
    },
    {
      label: "WhatsApp & Messaging",
      value: "+91 91459 65775",
      href: "https://wa.me/919145965775",
      icon: "whatsapp" as const,
    },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/reachmedia.co.in/" },
  ],
};

export const nav = [
  { label: "Specialities", href: "/#specialities" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#results" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Blog", href: "/blog" },
];

export const hero = {
  eyebrow: "An initiative by Reinvent Digital",
  titleLead: "Content Built for Real Patients",
  titleHighlight: "Not Just Random Viewers!",
  /** Line under the headline: the vanity metrics on the left, what we are judged on at the right. */
  kicker: { from: "Likes. Shares. Follows. Impressions", to: "Booked Appointments" },
  subtitle:
    "Our healthcare social media marketing agency’s aim is not just to get you the highest number of views, likes or shares! We build the content around real patient queries, answer it the same way your target audience wants to listen or watch, increasing the chances of real walk-ins, instead of just filler comments, or manipulated followers!",
  primaryCta: { label: "Get a Free Audit", href: "#audit" },
  secondaryCta: { label: "See Real Results", href: "/#results" },
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
    icon: "Fertility",
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
    icon: "Tooth",
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
 * KPI / proof cards, each backed by a real Instagram Insights screenshot in
 * public/proof/ (cropped from the phone captures in src/insights/).
 *
 * Every figure below is read off its screenshot — do not edit one without
 * editing the other, or the card will contradict the evidence beside it.
 * Strongest account first.
 *
 * `speciality` is the label shown on each card.
 */
export const kpiCases = [
  {
    id: "ig-views-37m",
    speciality: "Dental Hospital",
    platform: "Instagram Insights",
    headline: "Views, all content",
    value: "37.25M",
    delta: "+4,451 followers",
    window: "90 days",
    note: "10.78M people reached in a quarter, 98% of them before they followed the account.",
    image: "/proof/ig-views-37m.png",
    placeholder: false,
    metrics: [
      { label: "Views", value: "37,252,924", delta: "90 days" },
      { label: "Viewers", value: "10,782,891", delta: "unique" },
      { label: "Non-followers", value: "98.0%", delta: "new reach" },
    ],
  },
  {
    id: "ig-views-13m",
    speciality: "Eye Care",
    platform: "Instagram Insights",
    headline: "Views, all content",
    value: "13.16M",
    delta: "+921 followers",
    window: "30 days",
    note: "5.26M people reached in a month, 97.7% of them before they followed the account.",
    image: "/proof/ig-views-13m.png",
    placeholder: false,
    metrics: [
      { label: "Views", value: "13,160,904", delta: "30 days" },
      { label: "Viewers", value: "5,263,524", delta: "unique" },
      { label: "Non-followers", value: "97.7%", delta: "new reach" },
    ],
  },
  {
    id: "ig-views-4-5m",
    speciality: "Multi-Speciality Hospital",
    platform: "Instagram Insights",
    headline: "Views, all content",
    value: "4.51M",
    delta: "+983 followers",
    window: "90 days",
    note: "1.88M people reached in a quarter, almost all of them outside the existing followers.",
    image: "/proof/ig-views-4-5m.png",
    placeholder: false,
    metrics: [
      { label: "Views", value: "4,507,743", delta: "90 days" },
      { label: "Viewers", value: "1,877,705", delta: "unique" },
      { label: "Non-followers", value: "94.7%", delta: "new reach" },
    ],
  },
  {
    id: "ig-views-1-4m",
    speciality: "IVF & Fertility",
    platform: "Instagram Insights",
    headline: "Views, all content",
    value: "1.42M",
    delta: "+266 followers",
    window: "30 days",
    note: "513,838 people saw this clinic in a month, 94% of them before ever following it.",
    image: "/proof/ig-views-1-4m.png",
    placeholder: false,
    metrics: [
      { label: "Views", value: "1,418,863", delta: "30 days" },
      { label: "Viewers", value: "513,838", delta: "unique" },
      { label: "Non-followers", value: "94.0%", delta: "new reach" },
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

/**
 * Work samples — real client reels.
 *
 * Videos live in public/videos/ (compressed from `src/client video/` by
 * `node scripts/process-client-videos.mjs`, which also writes each poster).
 *
 * Titles were written from each video's opening frame. Adjust them here if a
 * clip is about something other than what its first seconds suggest.
 */
/**
 * The portfolio deck, shown under the work samples. The PDF lives in public/;
 * the cover is page 1 rendered to an image so the card shows the real deck
 * rather than a generic file icon. Figures below are quoted from the deck.
 */
export const portfolio = {
  title: "Healthcare Social Media Portfolio",
  description:
    "The full deck: the accounts we run, the numbers behind them, and the campaigns built to move behaviour rather than impressions.",
  file: "/reach-media-portfolio.pdf",
  cover: "/portfolio-cover.jpg",
  pages: 20,
  highlights: [
    { value: "10+", label: "Years, healthcare only" },
    { value: "65+", label: "Healthcare brands" },
    { value: "50cr+", label: "Ad spend managed" },
    { value: "4", label: "Specialities" },
  ],
};

export const workSamples = [
  {
    id: "ivf-next-step",
    type: "Doctor Reel",
    speciality: "IVF",
    client: "Kamineni Fertility",
    title: "When is IVF actually the next step?",
    meta: "0:44 · Instagram Reel",
    video: "/videos/ivf-next-step.mp4",
    poster: "/videos/ivf-next-step.jpg",
  },
  {
    id: "eye-examination",
    type: "Facility Film",
    speciality: "Eye",
    client: "Kenia Eye & Dental",
    title: "What happens during an eye examination",
    meta: "1:18 · Instagram Reel",
    video: "/videos/eye-examination.mp4",
    poster: "/videos/eye-examination.jpg",
  },
  {
    id: "dental-oral-cancer",
    type: "Doctor Reel",
    speciality: "Dental",
    client: "Dental",
    title: "The real cost of tobacco: oral cancer",
    meta: "0:36 · Instagram Reel",
    video: "/videos/dental-oral-cancer.mp4",
    poster: "/videos/dental-oral-cancer.jpg",
  },
  {
    id: "dental-smile-confidence",
    type: "Doctor Reel",
    speciality: "Dental",
    client: "Oracare Prime",
    title: "The one thing every smile needs",
    meta: "0:38 · Instagram Reel",
    video: "/videos/dental-smile-confidence.mp4",
    poster: "/videos/dental-smile-confidence.jpg",
  },
  {
    id: "dental-one-click",
    type: "Before / After",
    speciality: "Dental",
    client: "Oracare Prime",
    title: "Can a smile really be fixed in one click?",
    meta: "0:12 · Instagram Reel",
    video: "/videos/dental-one-click.mp4",
    poster: "/videos/dental-one-click.jpg",
  },
  {
    id: "hospital-fatty-liver",
    type: "Doctor Reel",
    speciality: "Hospital",
    client: "Kamineni Hospitals",
    title: "What is fatty liver?",
    meta: "1:11 · Instagram Reel",
    video: "/videos/hospital-fatty-liver.mp4",
    poster: "/videos/hospital-fatty-liver.jpg",
  },
  {
    id: "ivf-birth-defects",
    type: "Doctor Reel",
    speciality: "IVF",
    client: "Kamineni Fertility · M'Brace",
    title: "Are IVF babies at higher risk of birth defects?",
    meta: "1:21 · Instagram Reel",
    video: "/videos/ivf-birth-defects.mp4",
    poster: "/videos/ivf-birth-defects.jpg",
  },
  {
    id: "complete-womens-care",
    type: "Doctor Reel",
    speciality: "Women & Child",
    client: "M'Brace by Kamineni",
    title: "Complete women's care, under one roof",
    meta: "0:40 · Instagram Reel",
    video: "/videos/complete-womens-care.mp4",
    poster: "/videos/complete-womens-care.jpg",
  },
  {
    id: "breastfeeding-truth",
    type: "Doctor Reel",
    speciality: "Women & Child",
    client: "M'Brace by Kamineni",
    title: "The truth about breastfeeding",
    meta: "1:05 · Instagram Reel",
    video: "/videos/breastfeeding-truth.mp4",
    poster: "/videos/breastfeeding-truth.jpg",
  },
  {
    id: "breast-pain-after-delivery",
    type: "Doctor Reel",
    speciality: "Women & Child",
    client: "M'Brace by Kamineni",
    title: "Breast pain after delivery: when to worry",
    meta: "1:16 · Instagram Reel",
    video: "/videos/breast-pain-after-delivery.mp4",
    poster: "/videos/breast-pain-after-delivery.jpg",
  },
  {
    id: "latch-score",
    type: "Doctor Reel",
    speciality: "Women & Child",
    client: "M'Brace by Kamineni",
    title: "Are you using the latch score?",
    meta: "1:56 · Instagram Reel",
    video: "/videos/latch-score.mp4",
    poster: "/videos/latch-score.jpg",
  },
];

/**
 * Client logos. Files live in public/clients/ (trimmed and optimised from the
 * originals in src/client logo/).
 *
 * `scale` optically balances the wall: these logos range from nearly square
 * to 6.5:1, so contain-fitting them all in one box makes the wide ones look
 * tiny and the square ones look huge. Nudge this per logo, do not change the
 * grid. 1 = default.
 */
/**
 * Client logos. Source files live in `src/client logo/`; run
 * `node scripts/process-client-logos.mjs` to regenerate `public/clients/`
 * after adding one, then add its row here.
 *
 * `scale` optically balances the wall — these range from 1.4:1 to 4.2:1, so
 * contain-fitting them all in one box leaves the widest looking short. Nudge
 * this per logo rather than changing the box. 1 = default.
 */
export const clients = [
  { name: "Kamineni Hospitals", file: "/clients/kamineni-hospitals.png", sector: "Multi-Speciality", scale: 1 },
  { name: "PSRI Hospital", file: "/clients/psri-hospital.png", sector: "Multi-Speciality", scale: 1 },
  { name: "Kamineni Fertility", file: "/clients/kamineni-fertility.png", sector: "IVF & Fertility", scale: 1 },
  { name: "M'Brace by Kamineni", file: "/clients/mbrace-kamineni.png", sector: "Women & Child", scale: 1 },
  // 1.43 — the narrowest mark here, so it fills the box height while staying
  // narrow and reads smaller than its neighbours. Nudged up to compensate.
  { name: "Kenia Eye & Dental", file: "/clients/kenia-eye-dental.png", sector: "Eye & Dental", scale: 1.18 },
  // 1:1 — the only square mark, so it fills the box height and reads narrow
  // next to the wordmarks. Nudged up, but not far: the solid brown block
  // already carries more visual weight than an outline logo of the same size.
  { name: "National Dental Care", file: "/clients/national-dental-care.png", sector: "Dental", scale: 1.12 },
  { name: "Partha Dental", file: "/clients/partha-dental.png", sector: "Dental", scale: 1 },
  { name: "Eledent International", file: "/clients/eledent-international.png", sector: "Dental", scale: 1 },
  { name: "Oracare Prime", file: "/clients/oracare-prime.png", sector: "Dental", scale: 1 },
  { name: "The Dental Roots", file: "/clients/dental-roots.png", sector: "Dental", scale: 1 },
  { name: "Radiant Dental Care", file: "/clients/radiant-dental-care.png", sector: "Dental", scale: 1 },
  { name: "Credence Dental", file: "/clients/credence-dental.png", sector: "Dental", scale: 1 },
  { name: "IVIA Dental", file: "/clients/ivia-dental.png", sector: "Dental", scale: 1 },
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

/**
 * NOT REAL QUOTES. These four were written as placeholders and are shown
 * without a "Sample" label at the site owner's request. Replace them with
 * genuine client testimonials (with the client's consent) before relying on
 * this section — `placeholder: true` marks the ones still to be swapped.
 */
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
