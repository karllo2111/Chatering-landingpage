"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";
import ImageModal from "./ImageModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: "", alt: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger cards within the element
            const cards = entry.target.querySelectorAll(".animate-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animated");
              }, index * 100);
            });
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { label: "Home", target: "hero" },
    { label: "Menu", target: "menu" },
    { label: "Aqiqah", target: "aqiqah" },
    { label: "Lokasi", target: "lokasi" },
  ];

  const openImagePreview = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setIsImageModalOpen(true);
  };

  const activeLink = useRef("hero");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "menu", "aqiqah", "lokasi"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          activeLink.current = section;
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isNavScrolled
          ? "bg-[#faf9f5]/95 backdrop-blur-md shadow-md py-2"
          : "bg-[#faf9f5]/80 backdrop-blur-md shadow-sm py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 shrink-0">
            <Image
              src="/Logo langseng ibu.jpeg"
              alt="Langseng Ibu Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-xl md:text-2xl font-headline font-bold text-primary">
              Langseng Ibu
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-stone-600 hover:text-primary transition-colors font-label tracking-wide cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {/* <button
              onClick={() => setIsContactOpen(true)}
              className="text-stone-600 hover:text-primary transition-colors font-label tracking-wide cursor-pointer"
            >
              Contact
            </button> */}
          </div>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden md:block bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-full font-label font-semibold transition-all active:scale-95 duration-150 cursor-pointer"
            >
              Order Now
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-6 pb-4 pt-2 space-y-1 border-t border-outline-variant/20 mt-2">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="block w-full text-left py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container transition-colors font-label"
              >
                {link.label}
              </button>
            ))}
            {/* <button
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container transition-colors font-label"
            >
              Contact
            </button> */}
            <button
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 bg-primary text-on-primary py-3 rounded-full font-label font-semibold"
            >
              Order Now
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Nasi Kebuli"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRSPvps1n9CncTYFZG9KjtvVo3fCwWZlMkFoJJExTIagfF5ZNwTS1X5s4BPNDMKrYtGzWahi-Y8LOJ72eq7za6qwAa1je5TL6nT76ENJ1YbQQac3GEdy38AfAmBQsI1qWAjFyd_r6lhKNAtfYR1fdjeuv6BCXq_0EiUM6FghC4pMVLWbzCH7Z19jIaVQSfgc1Z4yBERxXOXqkqCejzTRYieGrJXqceV9Irevy87tjCx4cgl17sfZ5-p4HTQGmDYWeQVEE7F9kixASA"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="animate-hero animate-hero-delay-1 inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-sm font-bold font-label uppercase tracking-widest">
                Chatering Makanan
              </span>
              <h1 className="animate-hero animate-hero-delay-2 text-5xl sm:text-6xl md:text-7xl font-headline font-bold text-primary leading-[1.1] tracking-tight">
                Menyediakan Nasi Kebuli &amp; Katering Rumahan
              </h1>
              <p className="animate-hero animate-hero-delay-3 text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
                Membawa kehangatan dapur ibu ke setiap hidangan. Menggunakan
                rempah pilihan untuk pengalaman kuliner Nusantara yang tak
                terlupakan.
              </p>
              <div className="animate-hero animate-hero-delay-4 flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollTo("menu")}
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
                >
                  Lihat Menu
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="border-2 border-outline-variant text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-low transition-all cursor-pointer"
                >
                  Hubungi Kami
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-24 bg-surface-container-low" id="menu">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="animate-on-scroll text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary italic">
                Signature Collection
              </h2>
              <p className="text-on-surface-variant font-label tracking-[0.2em] uppercase text-sm">
                Pilihan Terbaik Untuk Setiap Momen
              </p>
            </div>

            {/* Nasi Kebuli Section */}
            <div className="mb-24 animate-on-scroll">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-headline font-bold text-secondary">
                  Nasi Kebuli
                </h3>
                <div className="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Nasi Kebuli Basmati Lengkap */}
                <div
                  onClick={() => openImagePreview("/Nasi kebuli basmati lengkap.jpeg", "Nasi Kebuli Basmati Lengkap")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Nasi Kebuli Basmati"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Nasi kebuli basmati lengkap.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Nasi Kebuli Basmati Lengkap
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">45Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2 italic">
                      Nasi basmati premium, rempah aromatik, pilihan daging, acar, dan sambal spesial.
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold uppercase">
                      Most Popular
                    </span>
                  </div>
                </div>

                {/* Nasi Kebuli Kambing Komplit */}
                <div
                  onClick={() => openImagePreview("/Kebuli kambing komplit.jpeg", "Nasi Kebuli Lengkap")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Nasi Kebuli Kambing Komplit"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Kebuli kambing komplit.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Nasi Kebuli Lengkap
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">40Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2">
                      Resep nasi lokal autentik dengan rempah tradisional dan daging kambing empuk.
                    </p>
                  </div>
                </div>

                {/* Nasi Kebuli Ayam Komplit */}
                <div
                  onClick={() => openImagePreview("/Nasi kebuli ayam komplit.jpeg", "Nasi Kebuli Ayam Lengkap")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Nasi Kebuli Ayam"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Nasi kebuli ayam komplit.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Nasi Kebuli Ayam Lengkap
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">35Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2">
                      Nasi kebuli berbumbu disajikan dengan ayam panggang gurih sempurna.
                    </p>
                  </div>
                </div>

                {/* Nasi Kebuli Basmati Ayam */}
                <div
                  onClick={() => openImagePreview("/Kebuli basmati ayam komplit.jpeg", "Nasi Kebuli Basmati Ayam")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Nasi Kebuli Basmati Ayam"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Kebuli basmati ayam komplit.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Nasi Kebuli Basmati Ayam
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">40Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2">
                      Nasi basmati premium dipadukan dengan ayam bumbu rempah khas kami.
                    </p>
                  </div>
                </div>

                {/* Kebuli Ati Sapi + Telor */}
                <div
                  onClick={() => openImagePreview("/Kebuli sambel goreng ati sapi+telor balado.jpeg", "Kebuli Ati Sapi + Telor")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Kebuli Sambal Goreng Ati"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Kebuli sambel goreng ati sapi+telor balado.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Kebuli Ati Sapi + Telor
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">30Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2">
                      Perpaduan unik nasi kebuli dengan sambal goreng ati sapi dan telor balado.
                    </p>
                  </div>
                </div>

                {/* Kebuli Kambing Tambahan */}
                <div
                  onClick={() => openImagePreview("/Kebuli kambing tampahan.jpeg", "Kebuli Kambing Tambahan")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Kebuli Kambing Tambahan"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Kebuli kambing tampahan.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Kebuli Kambing Tambahan
                      </h4>
                      <span className="text-xl font-bold text-primary whitespace-nowrap ml-2">45Rb</span>
                    </div>
                    <p className="text-on-surface-variant text-sm line-clamp-2">
                      Porsi ekstra nasi kebuli kambing dengan lauk tambahan pilihan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paket Prasmanan Section */}
            <div className="mb-24 animate-on-scroll">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-headline font-bold text-secondary">
                  Paket Prasmanan
                </h3>
                <div className="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paket Prasmanan Kebuli */}
                <div
                  onClick={() => openImagePreview("/nasi kebuli tampanan.jpeg", "Prasmanan Kebuli")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[16/9] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Paket Prasmanan Kebuli"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/nasi kebuli tampanan.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Prasmanan Kebuli
                      </h4>
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold uppercase">
                        Harga Nego
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm">
                      Paket prasmanan nasi kebuli lengkap untuk acara besar. Cocok untuk hajatan, syukuran, dan pernikahan.
                    </p>
                  </div>
                </div>

                {/* Paket Prasmanan Kebuli Rendang */}
                <div
                  onClick={() => openImagePreview("/Paket prasmanan Kebuli rendang.jpeg", "Prasmanan Kebuli Rendang")}
                  className="animate-card bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-surface-variant/50 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="aspect-[16/9] overflow-hidden relative bg-surface-container">
                    <Image
                      alt="Paket Prasmanan Kebuli Rendang"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      src="/Paket prasmanan Kebuli rendang.jpeg"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-xl leading-tight">
                        Prasmanan Kebuli Rendang
                      </h4>
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold uppercase">
                        Harga Nego
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm">
                      Kombinasi spesial nasi kebuli dengan rendang daging sapi empuk. Favorit untuk acara kantor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nasi Kuning & Kotak Section */}
            <div className="mb-12 animate-on-scroll">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-3xl font-headline font-bold text-secondary">
                  Nasi Kuning &amp; Kotak
                </h3>
                <div className="h-[1px] flex-grow bg-outline-variant opacity-30"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Paket Nasi Liwet */}
                <div
                  onClick={() => openImagePreview("/Paket nasi liwet.jpeg", "Paket Nasi Liwet")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Nasi Liwet"
                      className="object-contain"
                      src="/Paket nasi liwet.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Paket Nasi Liwet</h4>
                    <p className="text-xs text-on-surface-variant italic">
                      Sambal Goreng, Perkedel, Tempe, Lalapan.
                    </p>
                    <p className="text-lg font-bold text-primary">35Rb</p>
                  </div>
                </div>

                {/* Nasi Kuning Paket Ulta */}
                <div
                  onClick={() => openImagePreview("/Nasi kuning paket ultah.jpeg", "Paket Ulta Anak")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Nasi Kuning Ulta"
                      className="object-contain"
                      src="/Nasi kuning paket ultah.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Paket Ulta Anak</h4>
                    <p className="text-xs text-on-surface-variant">
                      Higienis &amp; ceria untuk perayaan spesial.
                    </p>
                    <p className="text-lg font-bold text-primary">20Rb</p>
                  </div>
                </div>

                {/* Nasi Kuning Box */}
                <div
                  onClick={() => openImagePreview("/Nasi kuning box.jpeg", "Nasi Kuning Box")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Nasi Kuning Box"
                      className="object-contain"
                      src="/Nasi kuning box.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Nasi Kuning Box</h4>
                    <p className="text-xs text-on-surface-variant">
                      Lauk pauk lengkap standar katering.
                    </p>
                    <p className="text-lg font-bold text-primary">17Rb</p>
                  </div>
                </div>

                {/* Paket Ayam Katsu */}
                <div
                  onClick={() => openImagePreview("/Paket ayam kastu.jpeg", "Paket Ayam Katsu")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Ayam Katsu"
                      className="object-contain"
                      src="/Paket ayam kastu.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Paket Ayam Katsu</h4>
                    <p className="text-xs text-on-surface-variant">
                      Ayam crispy dengan saus gurih.
                    </p>
                    <p className="text-lg font-bold text-primary">15Rb</p>
                  </div>
                </div>

                {/* Nasi Kuning Mika */}
                <div
                  onClick={() => openImagePreview("/Nasi kuning mika.jpeg", "Nasi Kuning Mika")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Nasi Kuning Mika"
                      className="object-contain"
                      src="/Nasi kuning mika.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Nasi Kuning Mika</h4>
                    <p className="text-xs text-on-surface-variant">
                      Porsi personal praktis &amp; ekonomis.
                    </p>
                    <p className="text-lg font-bold text-primary">7Rb</p>
                  </div>
                </div>

                {/* Nasi Uduk Lengkap */}
                <div
                  onClick={() => openImagePreview("/nasi uduk.jpeg", "Nasi Uduk Lengkap")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Nasi Uduk"
                      className="object-contain"
                      src="/nasi uduk.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Nasi Uduk Lengkap</h4>
                    <p className="text-xs text-on-surface-variant">
                      Gurih santan dengan lauk pilihan.
                    </p>
                    <p className="text-lg font-bold text-primary">12Rb</p>
                  </div>
                </div>

                {/* Nasi Ayam Teriyaki */}
                <div
                  onClick={() => openImagePreview("/Nasi ayam teriyaki.jpeg", "Nasi Ayam Teriyaki")}
                  className="animate-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-surface-variant/30 hover:-translate-y-1 cursor-zoom-in"
                >
                  <div className="relative h-32 w-full bg-surface-container">
                    <Image
                      alt="Ayam Teriyaki"
                      className="object-contain"
                      src="/Nasi ayam teriyaki.jpeg"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-headline font-bold text-lg">Nasi Ayam Teriyaki</h4>
                    <p className="text-xs text-on-surface-variant">
                      Sajian modern bumbu teriyaki manis gurih.
                    </p>
                    <p className="text-lg font-bold text-primary">15Rb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aqiqah Section */}
        <section className="py-24 bg-surface" id="aqiqah">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 animate-on-scroll">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-container rounded-full -z-10 animate-float"></div>
                <div
                  onClick={() => openImagePreview("/paket aqiqah.jpeg", "Paket Aqiqah Amanah")}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-zoom-in group"
                >
                  <Image
                    alt="Paket Aqiqah"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    src="/paket aqiqah.jpeg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span className="font-bold text-secondary">
                      Sertifikat Resmi
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Kami menyediakan dokumentasi video pemotongan sesuai syariat.
                  </p>
                </div>
              </div>
              {/* Additional Aqiqah detail photo */}
              <div
                onClick={() => openImagePreview("/Paket aqiqah detail makanan.jpeg", "Detail Makanan Aqiqah")}
                className="mt-12 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg cursor-zoom-in group"
              >
                <Image
                  alt="Detail Makanan Aqiqah"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/Paket aqiqah detail makanan.jpeg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-8 animate-on-scroll">
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold text-primary">
                  Paket Aqiqah Amanah
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Rayakan kehadiran sang buah hati dengan layanan Aqiqah yang
                  syari, praktis, dan berkualitas tinggi. Kami mengelola
                  segalanya dari pemilihan hewan hingga packing hantaran.
                </p>
              </div>
              <div className="space-y-4">
                {/* Package 1 */}
                <div className="group bg-surface-container-low p-6 rounded-2xl border border-transparent hover:border-secondary transition-all cursor-default">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-xl mb-1">
                        Kambing 1 (Anak Perempuan)
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Estimasi: 50-60 Box Premium
                      </p>
                    </div>
                    <span className="text-2xl font-headline font-bold text-primary">
                      Rp 3.5jt
                    </span>
                  </div>
                </div>
                {/* Package 2 */}
                <div className="group bg-surface-container-low p-6 rounded-2xl border border-transparent hover:border-secondary transition-all cursor-default">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-xl mb-1">
                        Kambing 2 (Anak Laki-laki)
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        Estimasi: 100-120 Box Premium
                      </p>
                    </div>
                    <span className="text-2xl font-headline font-bold text-primary">
                      Rp 6.5jt
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs">
                      featured_seasonal_and_gifts
                    </span>
                  </span>
                  <span className="text-sm font-medium">Free Souvenir</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs">
                      card_giftcard
                    </span>
                  </span>
                  <span className="text-sm font-medium">Kartu Ucapan</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs">
                      video_camera_front
                    </span>
                  </span>
                  <span className="text-sm font-medium">Video Pemotongan</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs">
                      workspace_premium
                    </span>
                  </span>
                  <span className="text-sm font-medium">Sertifikat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location / About Section */}
        <section className="py-24 bg-surface-container-low" id="lokasi">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="animate-on-scroll text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary">
                Temukan Kami
              </h2>
              <p className="text-on-surface-variant font-label tracking-[0.2em] uppercase text-sm">
                Lokasi Dapur &amp; Informasi Kontak
              </p>
            </div>
            <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-surface-variant/30 aspect-[4/3]">
                <iframe
                  src="https://maps.google.com/maps?q=-6.259934820691971,106.86024454338497&z=17&output=embed&hl=id"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Dapur Langseng Ibu - Cililitan"
                ></iframe>
              </div>

              {/* Contact info */}
              <div className="space-y-8">
                <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-variant/30 space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1">Alamat Dapur</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        Jl. Cililitan Kecil III No.24, RT.14/RW.7, Cililitan,
                        <br />
                        Kec. Kramat Jati, Kota Jakarta Timur,
                        <br />
                        Daerah Khusus Ibukota Jakarta 13640
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30"></div>

                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">schedule</span>
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1">Jam Operasional</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        Senin - Sabtu: 07.00 - 20.00 WIB
                        <br />
                        Minggu: 08.00 - 17.00 WIB
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30"></div>

                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">call</span>
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1">WhatsApp</h4>
                      <a href="https://wa.me/6289537325353" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
                        +62 895-3732-53535
                      </a>
                    </div>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30"></div>

                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">mail</span>
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1">Email</h4>
                      <a href="mailto:langsengibu@gmail.com" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
                        langsengibu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="h-[1px] bg-outline-variant/30"></div>

                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">photo_camera</span>
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1">Instagram</h4>
                      <a href="https://instagram.com/langseng_ibu" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
                        @langseng_ibu
                      </a>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-container text-on-primary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <span className="material-symbols-outlined text-[30rem] animate-float">
              lunch_dining
            </span>
          </div>
          <div className="animate-on-scroll max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
              Siap Menghidangkan Kelezatan?
            </h2>
            <p className="text-xl opacity-90 font-body">
              Pesan katering favorit Anda sekarang untuk acara keluarga, kantor,
              atau syukuran.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-secondary-container text-on-secondary-fixed px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 cursor-pointer"
              >
                <span className="material-symbols-outlined">chat</span>
                Pesan Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Simple Copyright */}
      <footer className="bg-inverse-surface">
        <div className="max-w-7xl mx-auto py-6 px-6 md:px-8">
          <p className="text-center text-inverse-on-surface text-sm font-body tracking-wide">
            © 2026 — {new Date().getFullYear()} <span className="font-semibold">Langseng Ibu</span>. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6289537325353"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Chat via WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-3 bg-inverse-surface text-inverse-on-surface text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat WhatsApp
        </span>
      </a>

      {/* Image Preview Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={selectedImage.src}
        altText={selectedImage.alt}
      />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
