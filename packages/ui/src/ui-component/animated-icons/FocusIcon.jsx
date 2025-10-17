import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const FocusIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <div
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
            }}
            {...props}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                {/* 圆形 */}
                <motion.circle
                    cx='12'
                    cy='12'
                    r='10'
                    variants={{
                        normal: { scale: 1 },
                        animate: {
                            scale: [1, 0.85, 1],
                            transition: {
                                duration: 0.6,
                                ease: 'easeInOut'
                            }
                        }
                    }}
                    animate={controls}
                />
                {/* 垂直线 */}
                <motion.line
                    x1='12'
                    y1='2'
                    x2='12'
                    y2='22'
                    variants={{
                        normal: { scaleY: 1 },
                        animate: {
                            scaleY: [1, 0.8, 1],
                            transition: {
                                duration: 0.6,
                                ease: 'easeInOut'
                            }
                        }
                    }}
                    animate={controls}
                />
                {/* 水平线 */}
                <motion.line
                    x1='2'
                    y1='12'
                    x2='22'
                    y2='12'
                    variants={{
                        normal: { scaleX: 1 },
                        animate: {
                            scaleX: [1, 0.8, 1],
                            transition: {
                                duration: 0.6,
                                ease: 'easeInOut'
                            }
                        }
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

FocusIcon.displayName = 'FocusIcon'

FocusIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.number
}

export { FocusIcon }
