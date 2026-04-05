import Image from 'next/image'

export function EditorialBanner() {
  return (
    <section
      className="relative py-24 bg-black overflow-hidden"
      id="editorial-banner"
    >
      <div className="absolute inset-0 opacity-30 z-0">
        <Image
          src="/images/placeholder.png"
          alt="Editorial background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2
          className="text-3xl md:text-5xl text-white font-serif mb-6 leading-tight italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.&rdquo;
        </h2>
        <p
          className="text-[#C5A059] uppercase tracking-[0.2em] text-sm font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          — Lorem Ipsum
        </p>
      </div>
    </section>
  )
}
