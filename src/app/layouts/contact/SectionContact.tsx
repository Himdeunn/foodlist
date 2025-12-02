"use client";

import React from "react";
import Link from "next/link";

const SectionContact: React.FC = () => {
  return (
    <section
      className="relative w-full px-6 py-32 transition-colors duration-500 font-montserrat
      bg-[#EAE8E1] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#EAE8E1]"
      id="contact"
      data-scroll-section
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- Header Big Typography --- */}
        <div className="mb-20">
            <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-4">
                Lets <span className="text-neutral-400 dark:text-neutral-600">Cook</span><br/>
                Something <span className="italic font-serif font-normal">Epic.</span>
            </h2>
            <p className="text-lg md:text-xl max-w-xl mt-8 opacity-80 leading-relaxed">
                Have a project in mind or just want to share your favorite recipe? Were all ears.
                Drop us a line and lets create something delicious together.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* --- Left: Contact Form --- */}
            <form className="flex flex-col gap-10">
                <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                        Whats your name?
                    </label>
                    <input
                        type="text"
                        placeholder="Chef Gordon Ramsay"
                        className="w-full bg-transparent border-b border-[#1a1a1a]/20 dark:border-[#EAE8E1]/20 py-4 text-xl md:text-3xl font-medium focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#EAE8E1] transition-colors placeholder:opacity-20 placeholder:text-current"
                    />
                </div>
                <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                        Your email address
                    </label>
                    <input
                        type="email"
                        placeholder="chef@hellskitchen.com"
                        className="w-full bg-transparent border-b border-[#1a1a1a]/20 dark:border-[#EAE8E1]/20 py-4 text-xl md:text-3xl font-medium focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#EAE8E1] transition-colors placeholder:opacity-20 placeholder:text-current"
                    />
                </div>
                <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                        Tell us everything
                    </label>
                    <textarea
                        rows={4}
                        placeholder="I have an idea about..."
                        className="w-full bg-transparent border-b border-[#1a1a1a]/20 dark:border-[#EAE8E1]/20 py-4 text-xl md:text-3xl font-medium focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#EAE8E1] transition-colors placeholder:opacity-20 placeholder:text-current resize-none"
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="group relative inline-flex items-center px-10 py-5 text-lg font-bold border rounded-full overflow-hidden transition-all
                        border-[#1a1a1a] text-[#1a1a1a]
                        dark:border-[#EAE8E1] dark:text-[#EAE8E1]"
                    >
                        <span className="absolute inset-0 w-full h-full bg-[#1a1a1a] dark:bg-[#EAE8E1] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        <span className="relative group-hover:text-[#EAE8E1] dark:group-hover:text-[#1a1a1a] transition-colors duration-300 flex items-center gap-3">
                            Send Message
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </span>
                    </button>
                </div>
            </form>

            {/* --- Right: Info & Socials --- */}
            <div className="flex flex-col justify-between h-full py-4 lg:pl-20">
                <div className="flex flex-col gap-12">
                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-6">Contact Details</h4>
                        <Link href="mailto:hello@foodlist.com" className="text-3xl md:text-5xl font-bold hover:underline decoration-2 underline-offset-8 decoration-neutral-400 transition-all block mb-3">
                            hello@foodlist.com
                        </Link>
                         <Link href="tel:+62812345678" className="text-xl md:text-2xl font-medium opacity-60 hover:opacity-100 transition-opacity">
                            +62 812 3456 7890
                        </Link>
                    </div>

                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-6">Location</h4>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-sm">
                            Jl. Kuliner Nusantara No. 88,<br/>
                            Jakarta Selatan, 12345<br/>
                            Indonesia
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-16 lg:mt-32">
                    {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                        <Link
                            key={social}
                            href="#"
                            className="px-6 py-2 rounded-full border border-[#1a1a1a]/20 dark:border-[#EAE8E1]/20 text-sm font-bold uppercase tracking-wider 
                            hover:bg-[#1a1a1a] hover:text-[#EAE8E1] hover:border-[#1a1a1a]
                            dark:hover:bg-[#EAE8E1] dark:hover:text-[#1a1a1a] dark:hover:border-[#EAE8E1]
                            transition-all duration-300"
                        >
                            {social}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;