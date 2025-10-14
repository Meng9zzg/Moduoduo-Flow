import logo from '@/assets/images/moduoduo_white.svg'
import logoDark from '@/assets/images/moduoduo_dark.svg'

import { useSelector } from 'react-redux'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
            <img
                style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
                src={customization.isDarkMode ? logoDark : logo}
                alt='Moduoduo Agent FLOW'
            />
        </div>
    )
}

export default Logo
