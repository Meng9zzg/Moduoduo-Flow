import { motion, useAnimation } from 'framer-motion'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'

const DEFAULT_TRANSITION = {
    type: 'spring',
    stiffness: 250,
    damping: 25
}

const MaximizeIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
            >
                <motion.path
                    d='M8 3H5a2 2 0 0 0-2 2v3'
                    transition={DEFAULT_TRANSITION}
                    variants={{
                        normal: { translateX: '0%', translateY: '0%' },
                        animate: { translateX: '-2px', translateY: '-2px' } // top-left corner → outwards
                    }}
                    animate={controls}
                />

                <motion.path
                    d='M21 8V5a2 2 0 0 0-2-2h-3'
                    transition={DEFAULT_TRANSITION}
                    variants={{
                        normal: { translateX: '0%', translateY: '0%' },
                        animate: { translateX: '2px', translateY: '-2px' } // top-right corner → outwards
                    }}
                    animate={controls}
                />

                <motion.path
                    d='M3 16v3a2 2 0 0 0 2 2h3'
                    transition={DEFAULT_TRANSITION}
                    variants={{
                        normal: { translateX: '0%', translateY: '0%' },
                        animate: { translateX: '-2px', translateY: '2px' } // bottom-left corner → outwards
                    }}
                    animate={controls}
                />

                <motion.path
                    d='M16 21h3a2 2 0 0 0 2-2v-3'
                    transition={DEFAULT_TRANSITION}
                    variants={{
                        normal: { translateX: '0%', translateY: '0%' },
                        animate: { translateX: '2px', translateY: '2px' } // bottom-right corner → outwards
                    }}
                    animate={controls}
                />
            </svg>
        </div>
    )
})

MaximizeIcon.displayName = 'MaximizeIcon'

MaximizeIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.number
}

export { MaximizeIcon }
