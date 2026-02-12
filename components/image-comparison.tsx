"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { GripVertical } from "lucide-react"

interface ImageComparisonProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
    alt: string
}

export default function ImageComparison({
    beforeImage,
    afterImage,
    beforeLabel = "Antes",
    afterLabel = "Después",
    alt,
}: ImageComparisonProps) {
    const [isResizing, setIsResizing] = useState(false)
    const [position, setPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleResize = useCallback(
        (clientX: number) => {
            if (containerRef.current) {
                const { left, width } = containerRef.current.getBoundingClientRect()
                const newPosition = ((clientX - left) / width) * 100
                setPosition(Math.min(100, Math.max(0, newPosition)))
            }
        },
        [],
    )

    const handleMouseDown = () => setIsResizing(true)
    const handleTouchStart = () => setIsResizing(true)

    const handleMouseUp = useCallback(() => setIsResizing(false), [])
    const handleTouchEnd = useCallback(() => setIsResizing(false), [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                handleResize(e.clientX)
            }
        },
        [isResizing, handleResize],
    )

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (isResizing) {
                handleResize(e.touches[0].clientX)
            }
        },
        [isResizing, handleResize],
    )

    // Add event listeners for global mouse/touch release
    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
            window.addEventListener("touchmove", handleTouchMove)
            window.addEventListener("touchend", handleTouchEnd)
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none shadow-xl border border-border group"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* After Image (Background) - The 'New' state */}
            <div className="absolute inset-0">
                <Image
                    src={afterImage || "/placeholder.svg"}
                    alt={`After ${alt}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Foreground) - The 'Old' state */}
            {/* We use clip-path to crop this image based on the slider position */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
                <Image
                    src={beforeImage || "/placeholder.svg"}
                    alt={`Before ${alt}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute top-4 left-4 bg-[#1a4d3a]/80 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${position}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                    <GripVertical className="w-5 h-5 text-[#1a4d3a]" />
                </div>
            </div>

            {/* Hover Overlay Hint (Optional) */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    )
}
