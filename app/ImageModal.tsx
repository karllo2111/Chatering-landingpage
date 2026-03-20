"use client";

import Image from "next/image";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    altText: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, altText }: ImageModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md modal-backdrop" />

            {/* Modal content */}
            <div
                className="relative max-w-5xl w-full h-full flex items-center justify-center modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-11 md:top-0 -right-2 md:-right-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                >
                    <span className="material-symbols-outlined text-3xl">close</span>
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={imageSrc}
                        alt={altText}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Caption / Alt info */}
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/80 font-label text-sm md:text-base text-center w-full px-4">
                    {altText}
                </div>
            </div>
        </div>
    );
}
