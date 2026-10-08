function LeadForm({
  className = '',
  title = 'Tell us about your growth goals',
  responseTime = '3 working days',
}) {
  return (
    <form
      className={`rounded-[22px] bg-black px-[24px] py-[32px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] md:px-[34px] md:py-[42px] ${className}`}
    >
      <span className="inline-flex items-center gap-[10px] text-[14px] text-white/80">
        <span className="h-[9px] w-[9px] rounded-full bg-[#d7ff2f]"></span>
        Response time: {responseTime}
      </span>

      <h3 className="mt-[24px] max-w-[420px] font-['Nunito'] text-[34px] font-[800] leading-[42px] text-white md:text-[40px] md:leading-[48px]">
        {title}
      </h3>

      <div className="mt-[34px] grid gap-[28px]">
        <label className="block">
          <span className="sr-only">Full name</span>
          <input
            type="text"
            placeholder="Full name"
            className="w-full border-0 border-b border-white/18 bg-transparent px-0 pb-[16px] text-[15px] text-white outline-none transition-colors duration-500 placeholder:text-white/48 focus:border-[#d7ff2f]"
          />
        </label>

        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border-0 border-b border-white/18 bg-transparent px-0 pb-[16px] text-[15px] text-white outline-none transition-colors duration-500 placeholder:text-white/48 focus:border-[#d7ff2f]"
          />
        </label>

        <label className="block">
          <span className="sr-only">Project message</span>
          <textarea
            rows="4"
            placeholder="Speciality and social media handle"
            className="w-full resize-none border-0 border-b border-white/18 bg-transparent px-0 pb-[16px] text-[15px] text-white outline-none transition-colors duration-500 placeholder:text-white/48 focus:border-[#d7ff2f]"
          ></textarea>
        </label>
      </div>

      <label className="mt-[28px] flex items-center gap-[12px] text-[15px] text-white/70">
        <input
          type="checkbox"
          className="h-[18px] w-[18px] rounded border border-white/28 bg-transparent accent-[#d7ff2f]"
        />
        Send me the 30-day content plan
      </label>

      <button
        type="button"
        className="mt-[34px] inline-flex h-[58px] items-center gap-[18px] rounded-full bg-white/12 px-[8px] pr-[28px] text-[15px] font-[700] text-white transition duration-300 hover:bg-[#d7ff2f] hover:text-[#101112]"
      >
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#d7ff2f] text-[#101112]">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Get free audit
      </button>
    </form>
  )
}

export default LeadForm
