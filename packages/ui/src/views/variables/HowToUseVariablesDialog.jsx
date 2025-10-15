import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { CodeEditor } from '@/ui-component/editor/CodeEditor'
import { useTranslation } from 'react-i18next'

const overrideConfig = `{
    overrideConfig: {
        vars: {
            var1: 'abc'
        }
    }
}`

const HowToUseVariablesDialog = ({ show, onCancel }) => {
    const portalElement = document.getElementById('portal')
    const { t } = useTranslation('dialog')

    const component = show ? (
        <Dialog
            onClose={onCancel}
            open={show}
            fullWidth
            maxWidth='sm'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {t('howToUseVariables.title')}
            </DialogTitle>
            <DialogContent>
                <p style={{ marginBottom: '10px' }}>{t('howToUseVariables.description1')}</p>
                <CodeEditor
                    disabled={true}
                    value={`$vars.<variable-name>`}
                    height={'50px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p style={{ marginBottom: '10px' }}>{t('howToUseVariables.description2')}</p>
                <CodeEditor
                    disabled={true}
                    value={`You are a {{$vars.personality}} AI assistant`}
                    height={'50px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p style={{ marginBottom: '10px' }}>{t('howToUseVariables.description3')}</p>
                <p style={{ marginBottom: '10px' }}>{t('howToUseVariables.description4')}</p>
                <CodeEditor
                    disabled={true}
                    value={overrideConfig}
                    height={'170px'}
                    theme={'dark'}
                    lang={'js'}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                />
                <p>
                    {t('howToUseVariables.readMore')}{' '}
                    <a target='_blank' rel='noreferrer' href='https://doc.9zzg.com/using-flowise/variables'>
                        {t('howToUseVariables.docs')}
                    </a>
                </p>
            </DialogContent>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

HowToUseVariablesDialog.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func
}

export default HowToUseVariablesDialog
