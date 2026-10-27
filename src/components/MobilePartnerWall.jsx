function MobilePartnerWall({ partners }) {
  const columns = [
    partners.filter((_, index) => index % 2 === 0),
    partners.filter((_, index) => index % 2 === 1),
  ]

  return (
    <div className="md:hidden">
      <div className="mobile-partner-wall" role="list" aria-label="Trusted partners">
        {columns.map((column, columnIndex) => (
          <div className="min-w-0" key={columnIndex}>
            <div
              className={`mobile-partner-track ${columnIndex === 1 ? 'mobile-partner-track--reverse' : ''}`}
              style={{
                '--partner-duration': `${column.length * 3}s`,
                '--partner-delay': columnIndex === 1 ? '-1.5s' : '0s',
              }}
            >
              {[0, 1].map((copy) => (
                <div
                  className={`mobile-partner-set ${copy === 1 ? 'mobile-partner-set--copy' : ''}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  key={copy}
                >
                  {column.map((partner) => (
                    <div className="mobile-partner-item" key={partner.name}>
                      <div
                        role="listitem"
                        aria-label={partner.name}
                        tabIndex={copy === 0 ? 0 : undefined}
                        className="partner-logo-card mobile-partner-card group flex h-[76px] w-full max-w-[160px] shrink-0 items-center justify-center rounded-[10px] border border-transparent bg-transparent px-[12px] transition-colors duration-300 focus:outline-none"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          loading="lazy"
                          decoding="async"
                          className="mobile-partner-logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobilePartnerWall
