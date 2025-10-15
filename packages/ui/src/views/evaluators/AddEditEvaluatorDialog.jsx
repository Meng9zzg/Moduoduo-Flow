import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'
import { cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'

// Material
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput, Button, Stack } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'

// Project imports
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'
import ExpandTextDialog from '@/ui-component/dialog/ExpandTextDialog'
import { StyledPermissionButton } from '@/ui-component/button/RBACButtons'
import { Dropdown } from '@/ui-component/dropdown/Dropdown'
import { TooltipWithParser } from '@/ui-component/tooltip/TooltipWithParser'
import { Grid } from '@/ui-component/grid/Grid'
import SamplePromptDialog from '@/views/evaluators/SamplePromptDialog'

// Icons
import { IconBulb, IconArrowsMaximize, IconPlus, IconPuzzle, IconX, IconNotes } from '@tabler/icons-react'
import DeleteIcon from '@mui/icons-material/Delete'

// API
import evaluatorsApi from '@/api/evaluators'

// utils
import useNotifier from '@/utils/useNotifier'

// const
import { HIDE_CANVAS_DIALOG, SHOW_CANVAS_DIALOG } from '@/store/actions'
import { evaluators, evaluatorTypes, numericOperators } from './evaluatorConstant'

const AddEditEvaluatorDialog = ({ show, dialogProps, onCancel, onConfirm }) => {
    const portalElement = document.getElementById('portal')

    const dispatch = useDispatch()
    const { t } = useTranslation('dialog')

    // ==============================|| Snackbar ||============================== //

    useNotifier()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const [name, setName] = useState('')
    const [evaluatorType, setEvaluatorType] = useState('')
    const [availableEvaluators, setAvailableEvaluators] = useState([])
    const [selectedEvaluator, setSelectedEvaluator] = useState()
    const [selectedValue, setSelectedValue] = useState('')
    const [selectedMetricValue, setSelectedMetricValue] = useState('0')
    const [selectedMetricOperator, setSelectedMetricOperator] = useState('equals')

    const [showExpandDialog, setShowExpandDialog] = useState(false)
    const [expandDialogProps, setExpandDialogProps] = useState({})

    const [showSamplePromptDialog, setShowSamplePromptDialog] = useState(false)
    const [samplePromptDialogProps, setSamplePromptDialogProps] = useState({})

    const [outputSchema, setOutputSchema] = useState([])
    const [prompt, setPrompt] = useState('')

    const deleteItem = useCallback(
        (id) => () => {
            setTimeout(() => {
                setOutputSchema((prevRows) => prevRows.filter((row) => row.id !== id))
            })
        },
        []
    )

    const onSamplePromptSelected = (data) => {
        setPrompt(data.prompt)
        setOutputSchema(data.json)
        setShowSamplePromptDialog(false)
    }

    const onShowPromptDialogClicked = (inputParam) => {
        const dialogProps = {
            value: prompt,
            inputParam,
            confirmButtonName: 'Save',
            cancelButtonName: 'Cancel'
        }
        setSamplePromptDialogProps(dialogProps)
        setShowSamplePromptDialog(true)
    }
    const onExpandDialogClicked = (inputParam) => {
        const dialogProps = {
            value: prompt,
            inputParam,
            confirmButtonName: 'Save',
            cancelButtonName: 'Cancel'
        }
        setExpandDialogProps(dialogProps)
        setShowExpandDialog(true)
    }

    const onExpandDialogSave = (newValue) => {
        setShowExpandDialog(false)
        setPrompt(newValue)
    }

    const addNewRow = () => {
        setTimeout(() => {
            setOutputSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const lastRowId = allRows.length ? allRows[allRows.length - 1].id + 1 : 1
                allRows.push({
                    id: lastRowId,
                    property: '',
                    description: '',
                    type: '',
                    required: false
                })
                return allRows
            })
        })
    }

    const onRowUpdate = (newRow) => {
        setTimeout(() => {
            setOutputSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const indexToUpdate = allRows.findIndex((row) => row.id === newRow.id)
                if (indexToUpdate >= 0) {
                    allRows[indexToUpdate] = { ...newRow }
                }
                return allRows
            })
        })
    }

    const columns = useMemo(
        () => [
            { field: 'property', headerName: t('addEvaluator.columns.property'), editable: true, flex: 1 },
            {
                field: 'type',
                headerName: t('addEvaluator.columns.type'),
                type: 'singleSelect',
                valueOptions: ['string', 'number', 'boolean'],
                editable: true,
                width: 120
            },
            { field: 'description', headerName: t('addEvaluator.columns.description'), editable: true, flex: 1 },
            { field: 'required', headerName: t('addEvaluator.columns.required'), type: 'boolean', editable: true, width: 80 },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        key={'Delete'}
                        icon={<DeleteIcon />}
                        label={t('addEvaluator.columns.delete')}
                        onClick={deleteItem(params.id)}
                    />
                ]
            }
        ],
        [deleteItem, t]
    )

    const onEvaluatorTypeChange = (type) => {
        setEvaluatorType(type)
        setAvailableEvaluators(evaluators.filter((item) => item.type === type))
        setSelectedEvaluator('')
        setSelectedValue('')
    }

    const getCaption = () => {
        if (selectedEvaluator) {
            // return the description of the selected evaluator
            const e = availableEvaluators.find((item) => item.name === selectedEvaluator)
            if (e) {
                return e.description
            }
        }
        return ''
    }

    const disableButton = () => {
        if (!name || !evaluatorType) {
            return true
        }
        if (evaluatorType === 'text') {
            return !selectedEvaluator || !selectedValue
        } else if (evaluatorType === 'numeric') {
            return !selectedEvaluator || !selectedMetricOperator || !selectedMetricValue
        } else if (evaluatorType === 'llm') {
            return !prompt || outputSchema.length === 0
        }
    }

    const updateEvaluator = async () => {
        try {
            const data = prepareData()

            const updateResp = await evaluatorsApi.updateEvaluator(dialogProps.data.id, data)
            if (updateResp.data) {
                enqueueSnackbar({
                    message: t('addEvaluator.updateSuccess', { name }),
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
                onConfirm(updateResp.data.id)
            }
        } catch (error) {
            enqueueSnackbar({
                message: t('addEvaluator.updateError', {
                    name,
                    error: typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                }),
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
            onCancel()
        }
    }

    const prepareData = () => {
        const data = {
            name: name,
            type: evaluatorType
        }
        if (evaluatorType === 'numeric') {
            data.operator = selectedMetricOperator
            data.value = selectedMetricValue
            data.measure = selectedEvaluator
        } else if (evaluatorType === 'text' || evaluatorType === 'json') {
            data.operator = selectedEvaluator
            data.value = selectedValue
        } else if (evaluatorType === 'llm') {
            data.outputSchema = outputSchema
            data.prompt = prompt
        }
        return data
    }

    const addEvaluator = async () => {
        try {
            const data = prepareData()

            const createResp = await evaluatorsApi.createEvaluator(data)
            if (createResp.data) {
                enqueueSnackbar({
                    message: t('addEvaluator.addSuccess'),
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
                onConfirm(createResp.data.id)
            }
        } catch (error) {
            enqueueSnackbar({
                message: t('addEvaluator.addError', {
                    error: typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                }),
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
            onCancel()
        }
    }

    useEffect(() => {
        if (dialogProps.data && dialogProps.type === 'EDIT') {
            const data = dialogProps.data
            onEvaluatorTypeChange(data.type)
            setName(data.name)

            if ('text' === data.type || 'json' === data.type) {
                setSelectedEvaluator(data.operator)
                setSelectedValue(data.value)
            } else if ('numeric' === data.type) {
                setSelectedValue(data.measure)
                setSelectedMetricValue(data.value)
                setSelectedMetricOperator(data.operator)
                setSelectedEvaluator(data.measure)
            } else if ('llm' === data.type) {
                setPrompt(data.prompt)
                setOutputSchema(data.outputSchema)
            }
        } else if (dialogProps.data && dialogProps.type === 'ADD') {
            const data = dialogProps.data
            onEvaluatorTypeChange(data.type)
            setName(data.name)
            setOutputSchema([])
        }

        return () => {
            // reset all values
            setName('')
            setEvaluatorType('')
            setAvailableEvaluators([])
            setSelectedEvaluator('')
            setSelectedValue('')
            setSelectedMetricValue('0')
            setSelectedMetricOperator('equals')
            setOutputSchema([])
        }
    }, [dialogProps])

    useEffect(() => {
        if (show) dispatch({ type: SHOW_CANVAS_DIALOG })
        else dispatch({ type: HIDE_CANVAS_DIALOG })
        return () => dispatch({ type: HIDE_CANVAS_DIALOG })
    }, [show, dispatch])

    const component = show ? (
        <Dialog
            fullWidth
            maxWidth='md'
            open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconPuzzle style={{ marginRight: '10px' }} />
                    {dialogProps.type === 'ADD' ? t('addEvaluator.titleAdd') : t('addEvaluator.titleEdit')}
                </div>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pb: 2 }}>
                    <Typography variant='overline'>{t('addEvaluator.nameLabel')}</Typography>
                    <OutlinedInput
                        size='small'
                        multiline={false}
                        type='string'
                        fullWidth
                        key='name'
                        onChange={(e) => setName(e.target.value)}
                        value={name ?? ''}
                    />
                </Box>
                <Box sx={{ pb: 2 }}>
                    <Typography variant='overline'>{t('addEvaluator.typeLabel')}</Typography>
                    <Dropdown
                        key={evaluatorType}
                        name='evaluatorType'
                        defaultOption={t('addEvaluator.typeSelect')}
                        options={evaluatorTypes}
                        onSelect={(newValue) => onEvaluatorTypeChange(newValue)}
                        value={evaluatorType}
                    />
                </Box>
                {evaluatorType && evaluatorType !== 'llm' && (
                    <Box sx={{ pb: 2 }}>
                        <Typography variant='overline'>{t('addEvaluator.availableEvaluators')}</Typography>
                        <Dropdown
                            key={selectedEvaluator}
                            name='availableEvaluators'
                            defaultOption={t('addEvaluator.selectDataset')}
                            options={availableEvaluators}
                            onSelect={(e) => setSelectedEvaluator(e)}
                            value={selectedEvaluator}
                        />
                    </Box>
                )}
                {evaluatorType === 'numeric' && selectedEvaluator && (
                    <>
                        <Box sx={{ pb: 2 }}>
                            <Typography variant='overline'>{t('addEvaluator.selectOperator')}</Typography>
                            <Dropdown
                                key={selectedMetricOperator}
                                name='metric'
                                defaultOption='equals'
                                options={numericOperators}
                                onSelect={(e) => setSelectedMetricOperator(e)}
                                value={selectedMetricOperator}
                            />
                        </Box>
                        <Box sx={{ pb: 2 }}>
                            <Typography variant='overline'>{t('addEvaluator.valueLabel')}</Typography>
                            <OutlinedInput
                                size='small'
                                type='number'
                                fullWidth
                                key='selectedValue'
                                onChange={(e) => setSelectedMetricValue(e.target.value)}
                                value={selectedMetricValue ?? '0'}
                            />
                            <Typography variant='caption' style={{ fontStyle: 'italic' }}>
                                {getCaption()}
                            </Typography>
                        </Box>
                    </>
                )}
                {evaluatorType === 'text' && selectedEvaluator && (
                    <>
                        <Box sx={{ pb: 2 }}>
                            <Typography variant='overline'>{t('addEvaluator.valueLabel')}</Typography>
                            <OutlinedInput
                                size='small'
                                multiline={true}
                                type='string'
                                rows={4}
                                fullWidth
                                key='selectedValue'
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value={selectedValue}
                                sx={{ mb: 2 }}
                            />
                            <Typography variant='caption' style={{ opacity: 0.9, fontStyle: 'italic' }}>
                                {getCaption()}
                            </Typography>
                        </Box>
                    </>
                )}
                {evaluatorType === 'llm' && (
                    <>
                        <Box sx={{ pb: 2 }}>
                            <Stack style={{ position: 'relative', justifyContent: 'space-between' }} direction='row'>
                                <Stack style={{ position: 'relative', alignItems: 'center' }} direction='row'>
                                    <Typography variant='overline'>{t('addEvaluator.outputSchema')}</Typography>
                                    <TooltipWithParser title={t('addEvaluator.outputSchemaTooltip')} />
                                </Stack>
                                <Stack style={{ position: 'relative', alignItems: 'right' }} direction='row'>
                                    <Button variant='outlined' onClick={onShowPromptDialogClicked} startIcon={<IconNotes />} sx={{ mr: 1 }}>
                                        {t('addEvaluator.loadSamples')}
                                    </Button>
                                    <Button variant='outlined' onClick={addNewRow} startIcon={<IconPlus />}>
                                        {t('addEvaluator.addItem')}
                                    </Button>
                                </Stack>
                            </Stack>
                            <Grid columns={columns} rows={outputSchema} onRowUpdate={onRowUpdate} />
                        </Box>
                        <Box sx={{ pb: 2 }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography variant='overline'>{t('addEvaluator.promptLabel')}</Typography>
                                <div style={{ flexGrow: 1 }}></div>
                                {prompt && (
                                    <IconButton
                                        size='small'
                                        sx={{
                                            height: 25,
                                            width: 25
                                        }}
                                        title={t('addEvaluator.expand')}
                                        color='primary'
                                        onClick={() =>
                                            onExpandDialogClicked({
                                                label: t('addEvaluator.evaluationPrompt'),
                                                name: 'evaluationPrompt',
                                                type: 'string'
                                            })
                                        }
                                    >
                                        <IconArrowsMaximize />
                                    </IconButton>
                                )}
                            </div>
                            <OutlinedInput
                                size='small'
                                multiline={true}
                                type='string'
                                rows={6}
                                fullWidth
                                key='prompt'
                                onChange={(e) => setPrompt(e.target.value)}
                                value={prompt}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 10,
                                    background: '#d8f3dc',
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <IconBulb size={25} color='#2d6a4f' />
                                    <span style={{ color: '#2d6a4f', marginLeft: 10, fontWeight: 400 }}>
                                        {t('addEvaluator.promptHint')}
                                    </span>
                                </div>
                            </div>
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>{dialogProps.cancelButtonName}</Button>
                <StyledPermissionButton
                    permissionId={'evaluators:create,evaluators:update'}
                    disabled={disableButton()}
                    variant='contained'
                    onClick={() => (dialogProps.type === 'ADD' ? addEvaluator() : updateEvaluator())}
                >
                    {dialogProps.confirmButtonName}
                </StyledPermissionButton>
            </DialogActions>
            <ConfirmDialog />
            <ExpandTextDialog
                show={showExpandDialog}
                dialogProps={expandDialogProps}
                onCancel={() => setShowExpandDialog(false)}
                onConfirm={(newValue) => onExpandDialogSave(newValue)}
            ></ExpandTextDialog>
            <SamplePromptDialog
                show={showSamplePromptDialog}
                dialogProps={samplePromptDialogProps}
                onCancel={() => setShowSamplePromptDialog(false)}
                onConfirm={(newValue) => onSamplePromptSelected(newValue)}
            ></SamplePromptDialog>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

AddEditEvaluatorDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
}

export default AddEditEvaluatorDialog
