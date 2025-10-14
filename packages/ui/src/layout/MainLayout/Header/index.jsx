import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import { Button, Avatar, Box, ButtonBase, Typography, Link } from '@mui/material'
import { useTheme, styled, darken } from '@mui/material/styles'

// project imports
import LogoSection from '../LogoSection'
import ProfileSection from './ProfileSection'
import WorkspaceSwitcher from '@/layout/MainLayout/Header/WorkspaceSwitcher'
import OrgWorkspaceBreadcrumbs from '@/layout/MainLayout/Header/OrgWorkspaceBreadcrumbs'
import PricingDialog from '@/ui-component/subscription/PricingDialog'
import ThemeSwitch from '@/ui-component/switch/ThemeSwitch'
import LanguageSwitch from '@/ui-component/switch/LanguageSwitch'

// assets
import { IconMenu2, IconX, IconSparkles } from '@tabler/icons-react'

// store
import { store } from '@/store'
import { SET_DARKMODE } from '@/store/actions'
import { useConfig } from '@/store/context/ConfigContext'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'
import { logoutSuccess } from '@/store/reducers/authSlice'

// API
import accountApi from '@/api/account.api'

// Hooks
import useApi from '@/hooks/useApi'
import useNotifier from '@/utils/useNotifier'

// ==============================|| MAIN NAVBAR / HEADER ||============================== //



const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const customization = useSelector((state) => state.customization)
    const leftDrawerOpened = useSelector((state) => state.customization.opened)
    const logoutApi = useApi(accountApi.logout)

    const [isDark, setIsDark] = useState(customization.isDarkMode)
    const dispatch = useDispatch()
    const { isEnterpriseLicensed, isCloud, isOpenSource } = useConfig()
    const currentUser = useSelector((state) => state.auth.user)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [isPricingOpen, setIsPricingOpen] = useState(false)

    useNotifier()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const handleThemeChange = (theme) => {
        const isDarkMode = theme === 'dark'
        dispatch({ type: SET_DARKMODE, isDarkMode })
        setIsDark(isDarkMode)
        localStorage.setItem('isDarkMode', isDarkMode)
    }

    const signOutClicked = () => {
        logoutApi.request()
        enqueueSnackbar({
            message: 'Logging out...',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                action: (key) => (
                    <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                        <IconX />
                    </Button>
                )
            }
        })
    }

    useEffect(() => {
        try {
            if (logoutApi.data && logoutApi.data.message === 'logged_out') {
                store.dispatch(logoutSuccess())
                window.location.href = logoutApi.data.redirectTo
            }
        } catch (e) {
            console.error(e)
        }
    }, [logoutApi.data])


    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    alignItems: 'center',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component='span' sx={{ display: 'flex', flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {isEnterpriseLicensed && <WorkspaceSwitcher />}
            {isCloud && <OrgWorkspaceBreadcrumbs />}
            {isCloud && currentUser?.isOrganizationAdmin && (
                <Button
                    variant='contained'
                    sx={{
                        mr: 1,
                        ml: 2,
                        borderRadius: 15,
                        background: (theme) =>
                            `linear-gradient(90deg, ${theme.palette.primary.main} 10%, ${theme.palette.secondary.main} 100%)`,
                        color: (theme) => theme.palette.secondary.contrastText,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: (theme) =>
                                `linear-gradient(90deg, ${darken(theme.palette.primary.main, 0.1)} 10%, ${darken(
                                    theme.palette.secondary.main,
                                    0.1
                                )} 100%)`,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                        }
                    }}
                    onClick={() => setIsPricingOpen(true)}
                    startIcon={<IconSparkles size={20} />}
                >
                    Upgrade
                </Button>
            )}
            {isPricingOpen && isCloud && (
                <PricingDialog
                    open={isPricingOpen}
                    onClose={(planUpdated) => {
                        setIsPricingOpen(false)
                        if (planUpdated) {
                            navigate('/')
                            navigate(0)
                        }
                    }}
                />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', transform: 'translateY(1px)' }}>
                <ThemeSwitch onThemeChange={handleThemeChange} isDarkMode={isDark} />
            </Box>
            <Box sx={{ ml: 3 }}></Box>
            <LanguageSwitch />
            <Box sx={{ ml: 1.25 }}></Box>
            <ProfileSection handleLogout={signOutClicked} />
        </>
    )
}

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
}

export default Header
