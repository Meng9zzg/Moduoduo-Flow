import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const FilesIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
        isControlledRef.current = true

        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal')
        }
    })

    const handleMouseEnter = useCallback(
        (e) => {
            if (!isControlledRef.current) {
                controls.start('animate')
            } else {
                onMouseEnter?.(e)
            }
        },
        [controls, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
        (e) => {
            if (!isControlledRef.current) {
                controls.start('normal')
            } else {
                onMouseLeave?.(e)
            }
        },
        [controls, onMouseLeave]
    )

    return (
        <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={stroke}
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d='M15 3v4a1 1 0 0 0 1 1h4' />
                <motion.path
                    d='M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z'
                    variants={{
                        normal: { x: 0, y: 0 },
                        animate: { x: [0, 2, 0], y: [0, -2, 0] }
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                    }}
                    animate={controls}
                />
                <motion.path
                    d='M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2'
                    variants={{
                        normal: { x: 0, y: 0 },
                        animate: { x: [0, -2, 0], y: [0, 2, 0] }
                    }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

FilesIcon.displayName = 'FilesIcon'

FilesIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default FilesIcon
