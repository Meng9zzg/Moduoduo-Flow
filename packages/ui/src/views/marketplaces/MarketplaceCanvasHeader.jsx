import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Avatar, Box, ButtonBase, Typography, Stack } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'

// icons
import { IconCopy, IconChevronLeft } from '@tabler/icons-react'
import { Available } from '@/ui-component/rbac/available'
import ThemeSwitch from '@/ui-component/switch/ThemeSwitch'
import LanguageSwitch from '@/ui-component/switch/LanguageSwitch'

// logo
import logoDark from '@/assets/images/moduoduo_dark.svg'
import logoLight from '@/assets/images/moduoduo_white1.svg'

// store
import { SET_DARKMODE } from '@/store/actions'

// ==============================|| CANVAS HEADER ||============================== //

const MarketplaceCanvasHeader = ({ flowName, flowData, onChatflowCopy }) => {
    const { t } = useTranslation('marketplaces')
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customization = useSelector((state) => state.customization)
    const [isDark, setIsDark] = useState(false)

    const handleThemeChange = (theme) => {
        const isDarkMode = theme === 'dark'
        dispatch({ type: SET_DARKMODE, isDarkMode })
        setIsDark(isDarkMode)
        localStorage.setItem('isDarkMode', isDarkMode)
    }

    useEffect(() => {
        setIsDark(customization.isDarkMode)
    }, [customization.isDarkMode])

    return (
        <>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Stack flexDirection='row' alignItems='center' sx={{ flex: 1, maxWidth: '40%' }}>
                    <Box>
                        <ButtonBase title={t('actions.back')} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <Avatar
                                variant='rounded'
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                color='inherit'
                                onClick={() => navigate(-1)}
                            >
                                <IconChevronLeft stroke={1.5} size='1.3rem' />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Stack flexDirection='row' sx={{ width: '100%' }}>
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    ml: 2,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {flowName}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
                {/* Center Logo */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={customization.isDarkMode ? logoDark : logoLight}
                        alt='Moduoduo Logo'
                        style={{
                            height: '48px',
                            width: 'auto'
                        }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', transform: 'translateY(1px)' }}>
                        <ThemeSwitch onThemeChange={handleThemeChange} isDarkMode={isDark} />
                    </Box>
                    <Box sx={{ ml: 3 }}></Box>
                    <LanguageSwitch />
                    <Box sx={{ ml: 1.25 }}></Box>
                    <Available permission={'chatflows:create,agentflows.create'}>
                        <Box>
                            <StyledButton
                                color='secondary'
                                variant='contained'
                                title={t('actions.useChatflow')}
                                onClick={() => onChatflowCopy(flowData)}
                                startIcon={<IconCopy />}
                            >
                                {t('actions.useTemplate')}
                            </StyledButton>
                        </Box>
                    </Available>
                </Box>
            </Stack>
        </>
    )
}

MarketplaceCanvasHeader.propTypes = {
    flowName: PropTypes.string,
    flowData: PropTypes.object,
    onChatflowCopy: PropTypes.func
}

export default MarketplaceCanvasHeader
