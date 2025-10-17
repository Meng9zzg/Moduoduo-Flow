import { useState, useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { PlusIcon } from '@/ui-component/animated-icons/PlusIcon'
import { MinusIcon } from '@/ui-component/animated-icons/MinusIcon'
import { FocusIcon } from '@/ui-component/animated-icons/FocusIcon'
import { MaximizeIcon } from '@/ui-component/animated-icons/MaximizeIcon'
import { BlocksIcon } from '@/ui-component/animated-icons/BlocksIcon'
import { GridIcon } from '@/ui-component/animated-icons/GridIcon'
import { GripIcon } from '@/ui-component/animated-icons/GripIcon'
import './CustomControls.css'

const CustomControls = ({ isDarkMode, isSnappingEnabled, setIsSnappingEnabled, isBackgroundEnabled, setIsBackgroundEnabled }) => {
    const { t } = useTranslation('canvas')
    const { zoomIn, zoomOut, fitView } = useReactFlow()
    const [isFullScreen, setIsFullScreen] = useState(false)

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullScreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }, [])

    const handleFullScreen = () => {
        const elem = document.querySelector('.reactflow-parent-wrapper')
        if (!document.fullscreenElement) {
            elem?.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    return (
        <div className={`custom-controls-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className='btn-group'>
                <Tooltip title={t('controls.zoomIn')} arrow>
                    <button className='btn left' type='button' onClick={() => zoomIn()} aria-label={t('controls.zoomIn')}>
                        <PlusIcon size={22} />
                    </button>
                </Tooltip>
                <Tooltip title={t('controls.zoomOut')} arrow>
                    <button className='btn middle' type='button' onClick={() => zoomOut()} aria-label={t('controls.zoomOut')}>
                        <MinusIcon size={22} />
                    </button>
                </Tooltip>
                <Tooltip title={t('controls.fitView')} arrow>
                    <button className='btn middle' type='button' onClick={() => fitView()} aria-label={t('controls.fitView')}>
                        <FocusIcon size={20} />
                    </button>
                </Tooltip>
                <Tooltip title={t('controls.fullScreen')} arrow>
                    <button
                        className={`btn middle ${isFullScreen ? 'active' : ''}`}
                        type='button'
                        onClick={handleFullScreen}
                        aria-label={t('controls.fullScreen')}
                    >
                        <MaximizeIcon size={20} />
                    </button>
                </Tooltip>
                <Tooltip title={t('controls.toggleSnapping')} arrow>
                    <button
                        className={`btn middle ${isSnappingEnabled ? 'active' : ''}`}
                        type='button'
                        onClick={() => setIsSnappingEnabled(!isSnappingEnabled)}
                        aria-label={t('controls.toggleSnapping')}
                    >
                        {isSnappingEnabled ? <GridIcon size={22} /> : <BlocksIcon size={22} />}
                    </button>
                </Tooltip>
                <Tooltip title={t('controls.toggleBackground')} arrow>
                    <button
                        className={`btn right ${isBackgroundEnabled ? 'active' : ''}`}
                        type='button'
                        onClick={() => setIsBackgroundEnabled(!isBackgroundEnabled)}
                        aria-label={t('controls.toggleBackground')}
                    >
                        <GripIcon size={22} />
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

CustomControls.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    isSnappingEnabled: PropTypes.bool.isRequired,
    setIsSnappingEnabled: PropTypes.func.isRequired,
    isBackgroundEnabled: PropTypes.bool.isRequired,
    setIsBackgroundEnabled: PropTypes.func.isRequired
}

export default CustomControls
