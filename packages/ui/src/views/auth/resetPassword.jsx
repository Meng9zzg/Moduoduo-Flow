import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// material-ui
import { Alert, Box, Button, OutlinedInput, Stack, Typography, useTheme } from '@mui/material'

// project imports
import { closeSnackbar as closeSnackbarAction, enqueueSnackbar as enqueueSnackbarAction } from '@/store/actions'
import { StyledButton } from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'
import { Input } from '@/ui-component/input/Input'
import { BackdropLoader } from '@/ui-component/loading/BackdropLoader'

// API
import accountApi from '@/api/account.api'

// utils
import useNotifier from '@/utils/useNotifier'
import { validatePassword } from '@/utils/validation'

// Icons
import { IconExclamationCircle, IconX } from '@tabler/icons-react'

// ==============================|| ResetPasswordPage ||============================== //

const ResetPasswordPage = () => {
    const theme = useTheme()
    const { t } = useTranslation('auth')
    useNotifier()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const emailInput = {
        label: t('email'),
        name: 'email',
        type: 'email',
        placeholder: t('placeholders.emailAddress')
    }

    const passwordInput = {
        label: t('password'),
        name: 'password',
        type: 'password',
        placeholder: t('placeholders.password')
    }

    const confirmPasswordInput = {
        label: t('confirmPassword'),
        name: 'confirmPassword',
        type: 'password',
        placeholder: t('placeholders.password')
    }

    const resetPasswordInput = {
        label: t('resetToken'),
        name: 'resetToken',
        type: 'text'
    }

    const [params] = useSearchParams()
    const token = params.get('token')

    const [emailVal, setEmailVal] = useState('')
    const [newPasswordVal, setNewPasswordVal] = useState('')
    const [confirmPasswordVal, setConfirmPasswordVal] = useState('')
    const [tokenVal, setTokenVal] = useState(token ?? '')

    const [loading, setLoading] = useState(false)
    const [authErrors, setAuthErrors] = useState([])

    const goLogin = () => {
        navigate('/signin', { replace: true })
    }

    const validateAndSubmit = async (event) => {
        event.preventDefault()
        const validationErrors = []
        setAuthErrors([])
        if (!tokenVal) {
            validationErrors.push(t('validation.tokenRequired'))
        }
        if (newPasswordVal !== confirmPasswordVal) {
            validationErrors.push(t('validation.passwordsDoNotMatch'))
        }
        const passwordErrors = validatePassword(newPasswordVal)
        if (passwordErrors.length > 0) {
            validationErrors.push(...passwordErrors)
        }
        if (validationErrors.length > 0) {
            setAuthErrors(validationErrors)
            return
        }
        const body = {
            user: {
                email: emailVal,
                tempToken: tokenVal,
                password: newPasswordVal
            }
        }
        setLoading(true)
        try {
            const updateResponse = await accountApi.resetPassword(body)
            setAuthErrors([])
            setLoading(false)
            if (updateResponse.data) {
                enqueueSnackbar({
                    message: t('success.passwordResetSuccessful'),
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
                setEmailVal('')
                setTokenVal('')
                setNewPasswordVal('')
                setConfirmPasswordVal('')
                goLogin()
            }
        } catch (error) {
            setLoading(false)
            setAuthErrors([typeof error.response.data === 'object' ? error.response.data.message : error.response.data])
            enqueueSnackbar({
                message: t('errors.resetPasswordFailed'),
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
        }
    }

    return (
        <>
            <MainCard>
                <Stack flexDirection='column' sx={{ maxWidth: '480px', gap: 3 }}>
                    {authErrors && authErrors.length > 0 && (
                        <Alert icon={<IconExclamationCircle />} variant='filled' severity='error'>
                            <ul style={{ margin: 0 }}>
                                {authErrors.map((msg, key) => (
                                    <li key={key}>{msg}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    <Stack sx={{ gap: 1 }}>
                        <Typography variant='h1'>{t('resetPasswordTitle')}</Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.grey[600] }}>
                            <Link style={{ color: theme.palette.primary.main }} to='/signin'>
                                {t('backToLogin')}
                            </Link>
                            .
                        </Typography>
                    </Stack>
                    <form onSubmit={validateAndSubmit}>
                        <Stack sx={{ width: '100%', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 2 }}>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('email')}
                                        <span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <Typography align='left'></Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={emailInput}
                                    onChange={(newValue) => setEmailVal(newValue)}
                                    value={emailVal}
                                    showDialog={false}
                                />
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('resetToken')}
                                        <span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <OutlinedInput
                                    fullWidth
                                    type='string'
                                    placeholder={t('placeholders.pasteResetToken')}
                                    multiline={true}
                                    rows={3}
                                    inputParam={resetPasswordInput}
                                    onChange={(e) => setTokenVal(e.target.value)}
                                    value={tokenVal}
                                    sx={{ mt: '8px' }}
                                />
                                <Typography variant='caption'>
                                    <i>{t('hints.copyTokenFromEmail')}</i>
                                </Typography>
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('newPassword')}
                                        <span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <Typography align='left'></Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={passwordInput}
                                    onChange={(newValue) => setNewPasswordVal(newValue)}
                                    value={newPasswordVal}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>{t('hints.passwordRequirements')}</i>
                                </Typography>
                            </Box>
                            <Box>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Typography>
                                        {t('confirmPassword')}
                                        <span style={{ color: 'red' }}>&nbsp;*</span>
                                    </Typography>
                                    <div style={{ flexGrow: 1 }}></div>
                                </div>
                                <Input
                                    inputParam={confirmPasswordInput}
                                    onChange={(newValue) => setConfirmPasswordVal(newValue)}
                                    value={confirmPasswordVal}
                                    showDialog={false}
                                />
                                <Typography variant='caption'>
                                    <i>{t('hints.confirmNewPassword')}</i>
                                </Typography>
                            </Box>

                            <StyledButton variant='contained' style={{ borderRadius: 12, height: 40, marginRight: 5 }} type='submit'>
                                {t('updatePassword')}
                            </StyledButton>
                        </Stack>
                    </form>
                </Stack>
            </MainCard>
            {loading && <BackdropLoader open={loading} />}
        </>
    )
}

export default ResetPasswordPage
