import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// material-ui
import { Alert, Box, Stack, Typography, useTheme } from '@mui/material'

// project imports
import { StyledButton } from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'
import { Input } from '@/ui-component/input/Input'
import { BackdropLoader } from '@/ui-component/loading/BackdropLoader'

// API
import accountApi from '@/api/account.api'

// Hooks
import useApi from '@/hooks/useApi'
import { useConfig } from '@/store/context/ConfigContext'

// utils
import useNotifier from '@/utils/useNotifier'

// Icons
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'

// ==============================|| ForgotPasswordPage ||============================== //

const ForgotPasswordPage = () => {
    const theme = useTheme()
    const { t } = useTranslation('auth')
    useNotifier()

    const usernameInput = {
        label: t('email'),
        name: 'username',
        type: 'email',
        placeholder: t('placeholders.emailAddress')
    }
    const [usernameVal, setUsernameVal] = useState('')
    const { isEnterpriseLicensed } = useConfig()

    const [isLoading, setLoading] = useState(false)
    const [responseMsg, setResponseMsg] = useState(undefined)

    const forgotPasswordApi = useApi(accountApi.forgotPassword)

    const sendResetRequest = async (event) => {
        event.preventDefault()
        const body = {
            user: {
                email: usernameVal
            }
        }
        setLoading(true)
        await forgotPasswordApi.request(body)
    }

    useEffect(() => {
        if (forgotPasswordApi.error) {
            const errMessage =
                typeof forgotPasswordApi.error.response.data === 'object'
                    ? forgotPasswordApi.error.response.data.message
                    : forgotPasswordApi.error.response.data
            setResponseMsg({
                type: 'error',
                msg: errMessage ?? t('errors.sendInstructionsFailed')
            })
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forgotPasswordApi.error])

    useEffect(() => {
        if (forgotPasswordApi.data) {
            setResponseMsg({
                type: 'success',
                msg: t('success.resetInstructionsSent')
            })
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forgotPasswordApi.data])

    return (
        <>
            <MainCard>
                <Stack flexDirection='column' sx={{ width: '480px', gap: 3 }}>
                    {responseMsg && responseMsg?.type === 'error' && (
                        <Alert icon={<IconExclamationCircle />} variant='filled' severity='error'>
                            {responseMsg.msg}
                        </Alert>
                    )}
                    {responseMsg && responseMsg?.type !== 'error' && (
                        <Alert icon={<IconCircleCheck />} variant='filled' severity='success'>
                            {responseMsg.msg}
                        </Alert>
                    )}
                    <Stack sx={{ gap: 1 }}>
                        <Typography variant='h1'>{t('forgotPasswordTitle')}</Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.grey[600] }}>
                            {t('haveResetCode')}{' '}
                            <Link style={{ color: theme.palette.primary.main }} to='/reset-password'>
                                {t('changePasswordHere')}
                            </Link>
                            .
                        </Typography>
                    </Stack>
                    <form onSubmit={sendResetRequest}>
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
                                    inputParam={usernameInput}
                                    onChange={(newValue) => setUsernameVal(newValue)}
                                    value={usernameVal}
                                    showDialog={false}
                                />
                                {isEnterpriseLicensed && (
                                    <Typography variant='caption'>
                                        <i>{t('hints.forgotEmailContact')}</i>
                                    </Typography>
                                )}
                            </Box>
                            <StyledButton
                                variant='contained'
                                style={{ borderRadius: 12, height: 40, marginRight: 5 }}
                                disabled={!usernameVal}
                                type='submit'
                            >
                                {t('sendResetInstructions')}
                            </StyledButton>
                        </Stack>
                    </form>
                    <BackdropLoader open={isLoading} />
                </Stack>
            </MainCard>
        </>
    )
}

export default ForgotPasswordPage
