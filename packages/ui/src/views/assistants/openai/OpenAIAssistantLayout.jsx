import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// material-ui
import { Box, Stack, Skeleton } from '@mui/material'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import ItemCard from '@/ui-component/cards/ItemCard'
import AssistantDialog from './AssistantDialog'
import LoadAssistantDialog from './LoadAssistantDialog'
import ViewHeader from '@/layout/MainLayout/ViewHeader'
import ErrorBoundary from '@/ErrorBoundary'
import { PermissionButton, StyledPermissionButton } from '@/ui-component/button/RBACButtons'

// API
import assistantsApi from '@/api/assistants'

// Hooks
import useApi from '@/hooks/useApi'

// icons
import { IconPlus, IconFileUpload } from '@tabler/icons-react'
import AssistantEmptySVG from '@/assets/images/assistant_empty.svg'
import { gridSpacing } from '@/store/constant'

// ==============================|| OpenAIAssistantLayout ||============================== //

const OpenAIAssistantLayout = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('assistants')

    const getAllAssistantsApi = useApi(assistantsApi.getAllAssistants)

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState({})
    const [showLoadDialog, setShowLoadDialog] = useState(false)
    const [loadDialogProps, setLoadDialogProps] = useState({})

    const loadExisting = () => {
        const dialogProp = {
            title: t('loadExistingAssistant')
        }
        setLoadDialogProps(dialogProp)
        setShowLoadDialog(true)
    }

    const [search, setSearch] = useState('')
    const onSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const onAssistantSelected = (selectedOpenAIAssistantId, credential) => {
        setShowLoadDialog(false)
        addNew(selectedOpenAIAssistantId, credential)
    }

    const addNew = (selectedOpenAIAssistantId, credential) => {
        const dialogProp = {
            title: t('addNewAssistant'),
            type: 'ADD',
            cancelButtonName: t('cancel'),
            confirmButtonName: t('add'),
            selectedOpenAIAssistantId,
            credential
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const edit = (selectedAssistant) => {
        const dialogProp = {
            title: t('editAssistant'),
            type: 'EDIT',
            cancelButtonName: t('cancel'),
            confirmButtonName: t('save'),
            data: selectedAssistant
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const onConfirm = () => {
        setShowDialog(false)
        getAllAssistantsApi.request('OPENAI')
    }

    function filterAssistants(data) {
        const parsedData = JSON.parse(data.details)
        return parsedData && parsedData.name && parsedData.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    }

    useEffect(() => {
        getAllAssistantsApi.request('OPENAI')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(getAllAssistantsApi.loading)
    }, [getAllAssistantsApi.loading])

    useEffect(() => {
        if (getAllAssistantsApi.error) {
            setError(getAllAssistantsApi.error)
        }
    }, [getAllAssistantsApi.error])

    return (
        <>
            <MainCard>
                {error ? (
                    <ErrorBoundary error={error} />
                ) : (
                    <Stack flexDirection='column' sx={{ gap: 3 }}>
                        <ViewHeader
                            isBackButton={true}
                            onSearchChange={onSearchChange}
                            search={true}
                            searchPlaceholder={t('searchAssistants')}
                            title={t('openAIAssistant')}
                            description={t('openAIAssistantDescription')}
                            onBack={() => navigate(-1)}
                        >
                            <PermissionButton
                                permissionId={'assistants:create'}
                                variant='outlined'
                                onClick={loadExisting}
                                startIcon={<IconFileUpload />}
                                sx={{ borderRadius: 2, height: 40 }}
                            >
                                {t('load')}
                            </PermissionButton>
                            <StyledPermissionButton
                                permissionId={'assistants:create'}
                                variant='contained'
                                sx={{ borderRadius: 2, height: 40 }}
                                onClick={addNew}
                                startIcon={<IconPlus />}
                            >
                                {t('add')}
                            </StyledPermissionButton>
                        </ViewHeader>
                        {isLoading ? (
                            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={gridSpacing}>
                                <Skeleton variant='rounded' height={160} />
                                <Skeleton variant='rounded' height={160} />
                                <Skeleton variant='rounded' height={160} />
                            </Box>
                        ) : (
                            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={gridSpacing}>
                                {getAllAssistantsApi.data &&
                                    getAllAssistantsApi.data?.filter(filterAssistants).map((data, index) => (
                                        <ItemCard
                                            data={{
                                                name: JSON.parse(data.details)?.name,
                                                description: JSON.parse(data.details)?.instructions,
                                                iconSrc: data.iconSrc
                                            }}
                                            key={index}
                                            onClick={() => edit(data)}
                                        />
                                    ))}
                            </Box>
                        )}
                        {!isLoading && (!getAllAssistantsApi.data || getAllAssistantsApi.data.length === 0) && (
                            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                                <Box sx={{ p: 2, height: 'auto' }}>
                                    <img
                                        style={{ objectFit: 'cover', height: '20vh', width: 'auto' }}
                                        src={AssistantEmptySVG}
                                        alt='AssistantEmptySVG'
                                    />
                                </Box>
                                <div>{t('noOpenAIAssistantsAddedYet')}</div>
                            </Stack>
                        )}
                    </Stack>
                )}
            </MainCard>
            <LoadAssistantDialog
                show={showLoadDialog}
                dialogProps={loadDialogProps}
                onCancel={() => setShowLoadDialog(false)}
                onAssistantSelected={onAssistantSelected}
                setError={setError}
            ></LoadAssistantDialog>
            <AssistantDialog
                show={showDialog}
                dialogProps={dialogProps}
                onCancel={() => setShowDialog(false)}
                onConfirm={onConfirm}
                setError={setError}
            ></AssistantDialog>
        </>
    )
}

export default OpenAIAssistantLayout
