'use client'

import createGlobe from 'cobe'
import { MapPinIcon } from 'lucide-react'
import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export function LocationPlaceholder() {
  const t = useTranslations('homepage.about-me')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragOriginXRef = useRef<number | null>(null)
  const dragDeltaRef = useRef(0)
  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 60%, rgba(255, 255, 255, 0) 70%)'

  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, {
    stiffness: 280,
    damping: 40,
    mass: 1,
  })

  useEffect(() => {
    let width = 0

    function onResize() {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 0, // Light mode globe
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 3, // Brighter for light theme
      baseColor: [0.95, 0.95, 0.95], // Light grey water/base
      markerColor: [0.2, 0.2, 0.2], // Dark markers (carbon/soot color)
      glowColor: [1, 1, 1], // White/light glow
      markers: [
        { location: [22.5431, 114.0579], size: 0.1 }, // Shenzhen
        { location: [32.0162, 120.8753], size: 0.1 }  // Nantong
      ],
      scale: 1.05,
      onRender: (state: Record<string, any>) => {
        state.phi = 2.75 + springRotation.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, []) // Removed springRotation from dependencies

  return (
    <div className='relative flex aspect-square w-full flex-col gap-6 overflow-visible rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2 relative z-10'>
        <MapPinIcon className='size-4.5' />
        <h2 className='text-sm'>{t('location')}</h2>
      </div>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-x-0 -bottom-[40%] mx-auto aspect-square w-[160%] -left-[30%]'>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              placeItems: 'center',
              placeContent: 'center',
              pointerEvents: 'auto'
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                maxWidth: 1000,
                WebkitMaskImage: fadeMask,
                maskImage: fadeMask,
              }}
            >
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                  dragOriginXRef.current = e.clientX - dragDeltaRef.current
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
                }}
                onPointerUp={() => {
                  dragOriginXRef.current = null
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
                }}
                onPointerOut={() => {
                  dragOriginXRef.current = null
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
                }}
                onMouseMove={(e) => {
                  if (dragOriginXRef.current !== null) {
                    const delta = e.clientX - dragOriginXRef.current
                    dragDeltaRef.current = delta
                    rotation.set(delta / 200)
                  }
                }}
                onTouchMove={(e) => {
                  if (dragOriginXRef.current !== null && e.touches[0]) {
                    const delta = e.touches[0].clientX - dragOriginXRef.current
                    dragDeltaRef.current = delta
                    rotation.set(delta / 100)
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  contain: 'layout paint size',
                  cursor: 'auto',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}