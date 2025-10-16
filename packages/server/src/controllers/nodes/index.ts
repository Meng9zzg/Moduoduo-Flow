import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import nodesService from '../../services/nodes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { StatusCodes } from 'http-status-codes'
import { getWorkspaceSearchOptionsFromReq } from '../../enterprise/utils/ControllerServiceUtils'
import { translationService } from '../../../components/locales'

/**
 * Extract language preference from request
 * Priority: query param > header > default (en)
 */
const getLanguageFromRequest = (req: Request): string => {
    // Check query parameter first
    if (req.query.lang && typeof req.query.lang === 'string') {
        return req.query.lang
    }

    // Check Accept-Language header
    const acceptLanguage = req.headers['accept-language']
    if (acceptLanguage) {
        // Parse Accept-Language header (e.g., "zh-CN,zh;q=0.9,en;q=0.8")
        const languages = acceptLanguage.split(',').map((lang) => {
            const parts = lang.trim().split(';')
            return parts[0].split('-')[0] // Get primary language tag (zh from zh-CN)
        })

        // Return first supported language
        for (const lang of languages) {
            if (translationService.isLanguageSupported(lang)) {
                return lang
            }
        }
    }

    // Default to English
    return 'en'
}

const getAllNodes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = getLanguageFromRequest(req)
        const nodes = await nodesService.getAllNodes()

        // Translate nodes if language is not English
        const translatedNodes = lang === 'en' ? nodes : nodes.map((node: any) => translationService.translateNode(node, lang))

        return res.json(translatedNodes)
    } catch (error) {
        next(error)
    }
}

const getNodeByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getNodeByName - name not provided!`)
        }
        const lang = getLanguageFromRequest(req)
        const node = await nodesService.getNodeByName(req.params.name)

        // Translate node if language is not English
        const translatedNode = lang === 'en' ? node : translationService.translateNode(node, lang)

        return res.json(translatedNode)
    } catch (error) {
        next(error)
    }
}

const getNodesByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params.name === 'undefined' || req.params.name === '') {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: nodesController.getNodesByCategory - name not provided!`
            )
        }
        const lang = getLanguageFromRequest(req)
        const name = _.unescape(req.params.name)
        const nodes = await nodesService.getAllNodesForCategory(name)

        // Translate nodes if language is not English
        const translatedNodes = lang === 'en' ? nodes : nodes.map((node: any) => translationService.translateNode(node, lang))

        return res.json(translatedNodes)
    } catch (error) {
        next(error)
    }
}

const getSingleNodeIcon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: nodesController.getSingleNodeIcon - name not provided!`)
        }
        const apiResponse = await nodesService.getSingleNodeIcon(req.params.name)
        return res.sendFile(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getSingleNodeAsyncOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: nodesController.getSingleNodeAsyncOptions - body not provided!`
            )
        }
        if (typeof req.params === 'undefined' || !req.params.name) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: nodesController.getSingleNodeAsyncOptions - name not provided!`
            )
        }
        const body = req.body
        body.searchOptions = getWorkspaceSearchOptionsFromReq(req)
        const apiResponse = await nodesService.getSingleNodeAsyncOptions(req.params.name, body)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const executeCustomFunction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: nodesController.executeCustomFunction - body not provided!`
            )
        }
        const orgId = req.user?.activeOrganizationId
        const workspaceId = req.user?.activeWorkspaceId
        const apiResponse = await nodesService.executeCustomFunction(req.body, workspaceId, orgId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    getAllNodes,
    getNodeByName,
    getSingleNodeIcon,
    getSingleNodeAsyncOptions,
    executeCustomFunction,
    getNodesByCategory
}
