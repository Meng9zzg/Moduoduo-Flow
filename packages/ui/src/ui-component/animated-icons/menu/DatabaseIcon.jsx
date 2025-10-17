import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const DatabaseIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
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
                <motion.ellipse
                    cx='12'
                    cy='6'
                    rx='8'
                    ry='3'
                    variants={{
                        normal: { scaleX: 1, scaleY: 1 },
                        animate: { scaleX: [1, 1.1, 1], scaleY: [1, 1.2, 1] }
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut'
                    }}
                    animate={controls}
                />
                <path d='M4 6v6a8 3 0 0 0 16 0v-6' />
                <motion.path
                    d='M4 12v6a8 3 0 0 0 16 0v-6'
                    variants={{
                        normal: { opacity: 1 },
                        animate: { opacity: [1, 0.5, 1] }
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                        delay: 0.2
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

DatabaseIcon.displayName = 'DatabaseIcon'

DatabaseIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default DatabaseIcon
