import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const dotVariants = {
    visible: (i) => ({
        opacity: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.3
        }
    }),
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
    default: { opacity: 1 }
}

const ChartScatterIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
        isControlledRef.current = true

        return {
            startAnimation: async () => {
                await controls.start('hidden')
                await controls.start('visible')
            },
            stopAnimation: async () => controls.start('default')
        }
    })

    const handleMouseEnter = useCallback(
        async (e) => {
            if (!isControlledRef.current) {
                await controls.start('hidden')
                await controls.start('visible')
            } else {
                onMouseEnter?.(e)
            }
        },
        [controls, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
        async (e) => {
            if (!isControlledRef.current) {
                await controls.start('default')
            } else {
                onMouseLeave?.(e)
            }
        },
        [controls, onMouseLeave]
    )

    return (
        <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
            <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={stroke}
                strokeLinecap='round'
                strokeLinejoin='round'
                initial='default'
                animate={controls}
            >
                <motion.circle cx='7.5' cy='7.5' r='.5' variants={dotVariants} custom={0} fill='currentColor' />
                <motion.circle cx='18.5' cy='5.5' r='.5' variants={dotVariants} custom={1} fill='currentColor' />
                <motion.circle cx='11.5' cy='11.5' r='.5' variants={dotVariants} custom={2} fill='currentColor' />
                <motion.circle cx='7.5' cy='16.5' r='.5' variants={dotVariants} custom={3} fill='currentColor' />
                <motion.circle cx='17.5' cy='14.5' r='.5' variants={dotVariants} custom={4} fill='currentColor' />
                <path d='M3 3v16a2 2 0 0 0 2 2h16' strokeWidth='2' />
            </motion.svg>
        </div>
    )
})

ChartScatterIcon.displayName = 'ChartScatterIcon'

ChartScatterIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default ChartScatterIcon
