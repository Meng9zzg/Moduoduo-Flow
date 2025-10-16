// constant
import {
    IconLibrary,
    IconTools,
    IconFunctionFilled,
    IconMessageCircleFilled,
    IconRobot,
    IconArrowsSplit,
    IconPlayerPlayFilled,
    IconSparkles,
    IconReplaceUser,
    IconRepeat,
    IconSubtask,
    IconNote,
    IconWorld,
    IconRelationOneToManyFilled,
    IconVectorBezier2
} from '@tabler/icons-react'

// Lucide Icons (for animated icons) - import more as needed
import {
    Bot,
    Sparkles as LucideSparkles,
    Play,
    GitBranch,
    Repeat as LucideRepeat,
    BookMarked,
    Wrench,
    MessageSquare,
    FunctionSquare,
    UserRoundSearch,
    StickyNote as LucideStickyNote,
    Globe,
    Workflow,
    Network
} from 'lucide-react'

export const gridSpacing = 3
export const drawerWidth = 260
export const appDrawerWidth = 320
export const headerHeight = 80
export const maxScroll = 100000
export const baseURL = import.meta.env.VITE_API_BASE_URL || window.location.origin
export const uiBaseURL = import.meta.env.VITE_UI_BASE_URL || window.location.origin
export const FLOWISE_CREDENTIAL_ID = 'FLOWISE_CREDENTIAL_ID'
export const REDACTED_CREDENTIAL_VALUE = '_FLOWISE_BLANK_07167752-1a71-43b1-bf8f-4f32252165db'
export const ErrorMessage = {
    INVALID_MISSING_TOKEN: 'Invalid or Missing token',
    TOKEN_EXPIRED: 'Token Expired',
    REFRESH_TOKEN_EXPIRED: 'Refresh Token Expired',
    FORBIDDEN: 'Forbidden',
    UNKNOWN_USER: 'Unknown Username or Password',
    INCORRECT_PASSWORD: 'Incorrect Password',
    INACTIVE_USER: 'Inactive User',
    INVALID_WORKSPACE: 'No Workspace Assigned',
    UNKNOWN_ERROR: 'Unknown Error'
}
// Agent Flow Icons Configuration
// Set 'animated: true' to use Lucide icons with animation
// Set 'animated: false' or omit it to use static Tabler icons
export const AGENTFLOW_ICONS = [
    {
        name: 'conditionAgentflow',
        icon: IconArrowsSplit,
        color: '#FFB938'
        // To enable animation: icon: GitBranch, animated: true
    },
    {
        name: 'startAgentflow',
        icon: IconPlayerPlayFilled,
        color: '#7EE787'
        // To enable animation: icon: Play, animated: true
    },
    {
        name: 'llmAgentflow',
        icon: IconSparkles,
        color: '#64B5F6'
        // To enable animation: icon: LucideSparkles, animated: true
    },
    {
        name: 'agentAgentflow',
        icon: IconRobot,
        color: '#4DD0E1'
        // To enable animation: icon: Bot, animated: true
    },
    {
        name: 'humanInputAgentflow',
        icon: IconReplaceUser,
        color: '#6E6EFD'
        // To enable animation: icon: UserRoundSearch, animated: true
    },
    {
        name: 'loopAgentflow',
        icon: IconRepeat,
        color: '#FFA07A'
        // To enable animation: icon: LucideRepeat, animated: true
    },
    {
        name: 'directReplyAgentflow',
        icon: IconMessageCircleFilled,
        color: '#4DDBBB'
        // To enable animation: icon: MessageSquare, animated: true
    },
    {
        name: 'customFunctionAgentflow',
        icon: IconFunctionFilled,
        color: '#E4B7FF'
        // To enable animation: icon: FunctionSquare, animated: true
    },
    {
        name: 'toolAgentflow',
        icon: IconTools,
        color: '#d4a373'
        // To enable animation: icon: Wrench, animated: true
    },
    {
        name: 'retrieverAgentflow',
        icon: IconLibrary,
        color: '#b8bedd'
        // To enable animation: icon: BookMarked, animated: true
    },
    {
        name: 'conditionAgentAgentflow',
        icon: IconSubtask,
        color: '#ff8fab'
        // To enable animation: icon: Network, animated: true
    },
    {
        name: 'stickyNoteAgentflow',
        icon: IconNote,
        color: '#fee440'
        // To enable animation: icon: LucideStickyNote, animated: true
    },
    {
        name: 'httpAgentflow',
        icon: IconWorld,
        color: '#FF7F7F'
        // To enable animation: icon: Globe, animated: true
    },
    {
        name: 'iterationAgentflow',
        icon: IconRelationOneToManyFilled,
        color: '#9C89B8'
        // To enable animation: icon: Workflow, animated: true
    },
    {
        name: 'executeFlowAgentflow',
        icon: IconVectorBezier2,
        color: '#a3b18a'
        // To enable animation: icon: Workflow, animated: true
    }
]

// Export Lucide icons for easy access when customizing
export const LucideIcons = {
    Bot,
    LucideSparkles,
    Play,
    GitBranch,
    LucideRepeat,
    BookMarked,
    Wrench,
    MessageSquare,
    FunctionSquare,
    UserRoundSearch,
    LucideStickyNote,
    Globe,
    Workflow,
    Network
}
