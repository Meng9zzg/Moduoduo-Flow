import PropTypes from 'prop-types'

const GridIcon = ({ size = 22 }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
            }}
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
                {/* Top-left square */}
                <rect x='3' y='3' width='8' height='8' rx='1' />
                {/* Top-right square */}
                <rect x='13' y='3' width='8' height='8' rx='1' />
                {/* Bottom-left square */}
                <rect x='3' y='13' width='8' height='8' rx='1' />
                {/* Bottom-right square */}
                <rect x='13' y='13' width='8' height='8' rx='1' />
            </svg>
        </div>
    )
}

GridIcon.propTypes = {
    size: PropTypes.number
}

export { GridIcon }
