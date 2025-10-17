import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const DURATION = 0.3

const calculateDelay = (i) => {
    if (i === 0) return 0.1

    return i * DURATION + 0.1
}

const GitPullRequestIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, stroke = 1.5, size = '1.3rem', ...props }, ref) => {
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
                <motion.circle
                    cx='18'
                    cy='18'
                    r='3'
                    transition={{
                        duration: DURATION,
                        delay: calculateDelay(0),
                        opacity: { delay: calculateDelay(0) }
                    }}
                    variants={{
                        normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
                        animate: {
                            pathLength: [0, 1],
                            opacity: [0, 1]
                        }
                    }}
                    animate={controls}
                />
                <motion.circle
                    cx='6'
                    cy='6'
                    r='3'
                    transition={{
                        duration: DURATION,
                        delay: calculateDelay(2),
                        opacity: { delay: calculateDelay(2) }
                    }}
                    variants={{
                        normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
                        animate: {
                            pathLength: [0, 1],
                            opacity: [0, 1]
                        }
                    }}
                    animate={controls}
                />
                <motion.path
                    d='M13 6h3a2 2 0 0 1 2 2v7'
                    transition={{
                        duration: DURATION,
                        delay: calculateDelay(1),
                        opacity: { delay: calculateDelay(1) }
                    }}
                    variants={{
                        normal: {
                            pathLength: 1,
                            pathOffset: 0,
                            opacity: 1,
                            transition: { delay: 0 }
                        },
                        animate: {
                            pathLength: [0, 1],
                            opacity: [0, 1],
                            pathOffset: [1, 0]
                        }
                    }}
                    animate={controls}
                />
                <motion.line
                    x1='6'
                    x2='6'
                    y1='9'
                    y2='21'
                    transition={{
                        duration: DURATION,
                        delay: calculateDelay(3),
                        opacity: { delay: calculateDelay(3) }
                    }}
                    variants={{
                        normal: { opacity: 1, pathLength: 1, transition: { delay: 0 } },
                        animate: {
                            opacity: [0, 1],
                            pathLength: [0, 1]
                        }
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

GitPullRequestIcon.displayName = 'GitPullRequestIcon'

GitPullRequestIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    stroke: PropTypes.number,
    size: PropTypes.string
}

export default GitPullRequestIcon
