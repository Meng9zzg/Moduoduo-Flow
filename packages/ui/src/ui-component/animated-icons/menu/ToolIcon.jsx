import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const ToolIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
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
                <motion.g
                    variants={{
                        normal: { rotate: 0 },
                        animate: { rotate: -15 }
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        repeat: 1,
                        repeatType: 'reverse'
                    }}
                    style={{ originX: '10px', originY: '10px' }}
                    animate={controls}
                >
                    <path d='M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5' />
                </motion.g>
            </svg>
        </div>
    )
})

ToolIcon.displayName = 'ToolIcon'

ToolIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default ToolIcon
