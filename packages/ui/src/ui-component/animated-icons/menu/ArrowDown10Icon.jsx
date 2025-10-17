import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const swapTransition = {
    type: 'spring',
    stiffness: 240,
    damping: 24
}

const swapVariants = {
    normal: {
        translateY: 0
    },
    animate: (custom) => ({
        translateY: custom * 10
    })
}

const ArrowDown10Icon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
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
                <path d='m3 16 4 4 4-4' />
                <path d='M7 20V4' />
                <motion.g variants={swapVariants} initial='normal' animate={controls} custom={1} transition={swapTransition}>
                    <path d='M17 10V4h-2' />
                    <path d='M15 10h4' />
                </motion.g>
                <motion.rect
                    x='15'
                    y='14'
                    width='4'
                    height='6'
                    ry='2'
                    variants={swapVariants}
                    initial='normal'
                    animate={controls}
                    custom={-1}
                    transition={swapTransition}
                />
            </svg>
        </div>
    )
})

ArrowDown10Icon.displayName = 'ArrowDown10Icon'

ArrowDown10Icon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default ArrowDown10Icon
