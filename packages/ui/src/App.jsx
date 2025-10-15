import { Suspense } from 'react'
import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider, CircularProgress, Box } from '@mui/material'

// i18n
import '@/i18n/config'

// routing
import Routes from '@/routes'

// defaultTheme
import themes from '@/themes'

// project imports
import NavigationScroll from '@/layout/NavigationScroll'

// ==============================|| APP ||============================== //

const LoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}
    >
        <CircularProgress />
    </Box>
)

const App = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <Suspense fallback={<LoadingFallback />}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </Suspense>
    )
}

export default App
