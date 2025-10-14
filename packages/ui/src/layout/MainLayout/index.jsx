import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'

// project imports
import Header from './Header'
import Sidebar from './Sidebar'
import { drawerWidth, headerHeight } from '@/store/constant'
import { SET_MENU } from '@/store/actions'

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: 0,
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        backgroundColor: 'transparent',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        marginRight: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`
    })
}))

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened)
    const dispatch = useDispatch()
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened })
    }

    useEffect(() => {
        setTimeout(() => dispatch({ type: SET_MENU, opened: !matchDownMd }), 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar sx={{ height: `${headerHeight}px`, borderBottom: '1px solid', borderColor: theme.palette.grey[900] + 25 }}>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* sidebar toggle button */}
            <Box
                sx={{
                    position: 'fixed',
                    left: leftDrawerOpened ? `${drawerWidth - 20}px` : '10px',
                    top: `${headerHeight + 40}px`,
                    transform: 'translateY(-50%)',
                    zIndex: 1300,
                    transition: theme.transitions.create('left', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                    })
                }}
            >
                <div 
                    style={{ 
                        width: '32px', 
                        height: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.2s ease',
                        color: theme.palette.text.primary
                    }} 
                    onClick={handleLeftDrawerToggle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.palette.action.hover;
                        e.currentTarget.style.transform = 'scale(1.1)';
                        const paths = e.currentTarget.querySelectorAll('path');
                        paths.forEach(path => {
                            path.style.animation = 'arrowAnimate 0.4s ease-in-out';
                        });
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.palette.background.paper;
                        e.currentTarget.style.transform = 'scale(1)';
                        const paths = e.currentTarget.querySelectorAll('path');
                        paths.forEach(path => {
                            path.style.animation = '';
                        });
                    }}
                >
                    <style>{`
                        @keyframes arrowAnimate {
                            0% { transform: translateX(0px); }
                            50% { transform: translateX(${leftDrawerOpened ? '3px' : '-3px'}); }
                            100% { transform: translateX(0px); }
                        }
                    `}</style>
                    {leftDrawerOpened ? (
                        // 左箭头 - 侧边栏打开时显示
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    ) : (
                        // 右箭头 - 侧边栏关闭时显示
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    )}
                </div>
            </Box>

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                <Outlet />
            </Main>
        </Box>
    )
}

export default MainLayout
