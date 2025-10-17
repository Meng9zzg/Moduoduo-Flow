import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const VariableIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
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
                <motion.path
                    d='M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1'
                    variants={{
                        normal: { opacity: 1 },
                        animate: { opacity: [1, 0.4, 1] }
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeInOut'
                    }}
                    animate={controls}
                />
                <motion.path
                    d='M8 16c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5'
                    variants={{
                        normal: { pathLength: 1, pathOffset: 0 },
                        animate: { pathLength: [0, 1], pathOffset: [1, 0] }
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut'
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

VariableIcon.displayName = 'VariableIcon'

VariableIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default VariableIcon
