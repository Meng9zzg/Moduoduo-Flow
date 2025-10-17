export default function componentStyleOverrides(theme) {
    const bgColor = theme.colors?.grey50
    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: theme?.customization?.isDarkMode
                        ? `${theme.colors?.grey500} ${theme.colors?.darkPrimaryMain}`
                        : `${theme.colors?.grey300} ${theme.paper}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 12,
                        height: 12,
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.grey500 : theme.colors?.grey300,
                        minHeight: 24,
                        border: `3px solid ${theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper}`
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimary200 : theme.colors?.grey500
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimary200 : theme.colors?.grey500
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimary200 : theme.colors?.grey500
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    borderRadius: '4px',
                    // 为所有 contained 按钮添加样式
                    '&.MuiButton-contained': {
                        color: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : 'white',
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.highlightYellow : theme.colors?.primaryMain,
                        '&:hover': {
                            backgroundColor: theme?.customization?.isDarkMode
                                ? `${theme.colors?.highlightYellow}E6` // 90% 透明度
                                : theme.colors?.primaryDark,
                            backgroundImage: theme?.customization?.isDarkMode ? 'none' : undefined
                        }
                    }
                },
                containedPrimary: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : 'white',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.highlightYellow : theme.colors?.primaryMain,
                    '&:hover': {
                        backgroundColor: theme?.customization?.isDarkMode
                            ? `${theme.colors?.highlightYellow}E6` // 90% 透明度
                            : theme.colors?.primaryDark,
                        backgroundImage: theme?.customization?.isDarkMode ? 'none' : undefined
                    }
                },
                contained: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : 'white',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.highlightYellow : theme.colors?.primaryMain,
                    '&:hover': {
                        backgroundColor: theme?.customization?.isDarkMode
                            ? `${theme.colors?.highlightYellow}E6` // 90% 透明度
                            : theme.colors?.primaryDark,
                        backgroundImage: theme?.customization?.isDarkMode ? 'none' : undefined
                    }
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.paper : 'inherit',
                    background: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryLight : 'inherit'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: `${theme?.customization?.borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.textDark,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.grey50 : theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme?.customization?.isDarkMode
                            ? `${theme.colors?.grey700}73` // 45% opacity (73 in hex)
                            : theme.menuSelectedBack,
                        '&:hover': {
                            backgroundColor: theme?.customization?.isDarkMode
                                ? `${theme.colors?.grey700}73` // Keep 45% opacity on hover when selected
                                : theme.menuSelectedBack
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected
                        }
                    },
                    '&:hover': {
                        backgroundColor: theme?.customization?.isDarkMode
                            ? `${theme.colors?.grey700}40` // 25% opacity (40 in hex)
                            : theme.menuSelectedBack,
                        color: theme?.customization?.isDarkMode
                            ? theme.colors?.grey50 // Keep regular sidebar text color
                            : theme.menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: theme?.customization?.isDarkMode
                                ? theme.colors?.grey50 // Keep regular sidebar icon color
                                : theme.menuSelected
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.grey50 : theme.darkTextPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.grey50 : theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.9375rem'
                    },
                    '&.Mui-disabled': {
                        WebkitTextFillColor: theme?.customization?.isDarkMode ? theme.colors?.grey500 : theme.darkTextSecondary
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.9375rem'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: theme?.customization?.isDarkMode ? theme.colors?.darkLevel2 : bgColor,
                    borderRadius: `${theme?.customization?.borderRadius}px`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.grey400
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors?.primaryLight
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    padding: '15.5px 14px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: `${theme?.customization?.borderRadius}px`
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors?.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme?.colors?.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.colors?.primaryDark,
                    background: theme.colors?.primary200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme?.customization?.isDarkMode ? 'rgba(150, 169, 255, 0.25)' : 'rgba(177, 191, 255, 0.25)',
                    color: theme?.customization?.isDarkMode ? '#fafafa' : theme.colors?.grey700,
                    fontSize: '0.875rem',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                },
                arrow: {
                    color: theme?.customization?.isDarkMode ? 'rgba(150, 169, 255, 0.25)' : 'rgba(177, 191, 255, 0.25)'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: {
                    '&:hover': {
                        background: theme?.customization?.isDarkMode ? '#233345 !important' : ''
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '0.9375rem',
                    '&.Mui-selected': {
                        color: theme?.customization?.isDarkMode ? '#ffffff !important' : undefined
                    }
                }
            }
        }
    }
}
