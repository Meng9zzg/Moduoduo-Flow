import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'

// 全局样式组件
const GlobalStyles = styled('div')`
  @keyframes star-twinkle-once {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes star-twinkle-continuous {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes moon-rise {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes sun-rise-and-rotate {
    0% { transform: translateY(10px) rotate(0deg); opacity: 0; }
    20% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(0) rotate(360deg); opacity: 1; }
  }

  @keyframes sun-rotate-continuous {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

// 主容器
const BtnContainer = styled('div')(({ isDarkMode, sunAnimated, moonAnimated, sunIntroDone, moonIntroDone }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& svg': {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '23px',
    height: '23px'
  },
  // 浅色模式 - 左侧太阳图标
  '& .sun-icon': {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    '& path': {
      fill: isDarkMode ? '#6375FF' : '#B1BFFF',
      transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    // 太阳入场动画 - 升起并旋转1圈（仅入场时播放）
    ...(sunAnimated && !isDarkMode && !sunIntroDone && {
      animation: 'sun-rise-and-rotate 4s ease-in-out forwards'
    }),
    // 太阳入场完成后，默认无动画
    ...(sunAnimated && sunIntroDone && !isDarkMode && {
      animation: 'none'
    }),
    // 太阳hover效果 - 持续旋转（仅入场完成后生效）
    ...(sunAnimated && sunIntroDone && !isDarkMode && {
      '&:hover': {
        animation: 'sun-rotate-continuous 4s linear infinite'
      }
    })
  },
  // 浅色模式 - 右侧月亮图标
  '& .moon-icon': {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    '& .moon-body': {
      fill: isDarkMode ? '#F8FD41' : '#22339A',
      transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    '& .moon-stars': {
      fill: isDarkMode ? '#96A9FF' : '#3342FF',
      transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
    },
    // 深色模式 - 右侧月亮图标动画
    ...(isDarkMode && moonAnimated && {
      animation: 'moon-rise 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
    }),
    // 星星入场动画 - 闪烁1次（仅入场时播放）
    ...(isDarkMode && moonAnimated && !moonIntroDone && {
      '& .moon-stars': {
        fill: '#96A9FF',
        animation: 'star-twinkle-once 2s ease-in-out forwards'
      }
    }),
    // 星星入场完成后，默认无动画
    ...(isDarkMode && moonAnimated && moonIntroDone && {
      '& .moon-stars': {
        fill: '#96A9FF',
        animation: 'none'
      }
    }),
    // 月亮hover效果 - 星星持续闪烁（仅入场完成后生效）
    ...(isDarkMode && moonAnimated && moonIntroDone && {
      '&:hover .moon-stars': {
        animation: 'star-twinkle-continuous 3s ease-in-out infinite'
      }
    })
  }
}))

// 开关容器
const SwitchContainer = styled('label')({
  display: 'inline-block',
  margin: '0px',
  position: 'relative',
  '& input[type="checkbox"]': {
    cursor: 'pointer',
    width: '140px',
    height: '30px',
    opacity: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    margin: '0px',
    left: 0
  }
})

// 开关内部样式
const SwitchInner = styled('label')(({ isDarkMode, theme }) => ({
  margin: '0px',
  width: '140px',
  height: '30px',
  background: isDarkMode ? '#242b69' : '#6375FF',
  borderRadius: '26px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s ease',
  display: 'block',
  cursor: 'pointer',
  '&:before': {
    content: `"${isDarkMode ? '九章青' : '光芒黄'}"`,
    position: 'absolute',
    fontSize: isDarkMode ? '13px' : '13px',
    fontWeight: 650,
    top: '8px',
    right: isDarkMode ? 'auto' : '2px',
    left: isDarkMode ? '2px' : 'auto',
    textAlign: 'center',
    width: '68px',
    height: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isDarkMode ? '#96A9FF' : '#FEFFD2',
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
    lineHeight: '1'
  },
  '&:after': {
    content: `"${isDarkMode ? '光芒黄' : '九章青'}"`,
    width: '68px',
    height: '26px',
    background: isDarkMode ? '#F8FD41' : theme.palette.secondary.light,
    borderRadius: '26px',
    position: 'absolute',
    left: isDarkMode ? '70px' : '2px',
    top: '2px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0px 0px 6px -2px #191b1f',
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 650,
    fontSize: isDarkMode ? '14px' : '14px',
    color: isDarkMode ? '#191b1f' : theme.palette.secondary.dark,
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
    lineHeight: '1'
  }
}))

const ThemeSwitch = ({ onThemeChange, isDarkMode: propIsDarkMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(propIsDarkMode || false)
  const [sunAnimated, setSunAnimated] = useState(false)
  const [moonAnimated, setMoonAnimated] = useState(false)
  const [sunIntroDone, setSunIntroDone] = useState(false)
  const [moonIntroDone, setMoonIntroDone] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedIsDarkMode = localStorage.getItem('isDarkMode') === 'true'
    if (savedTheme === 'dark' || savedIsDarkMode) {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (propIsDarkMode !== undefined) {
      setIsDarkMode(propIsDarkMode)
    }
  }, [propIsDarkMode])

  const handleThemeChange = (event) => {
    const newIsDarkMode = event.target.checked
    setIsDarkMode(newIsDarkMode)
    const theme = newIsDarkMode ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
    localStorage.setItem('isDarkMode', newIsDarkMode)
    onThemeChange(theme)

    if (newIsDarkMode) {
      setMoonAnimated(true)
      setSunAnimated(false)
      setMoonIntroDone(false)
      setTimeout(() => {
        setMoonIntroDone(true)
      }, 2000)
    } else {
      setSunAnimated(true)
      setMoonAnimated(false)
      setSunIntroDone(false)
      setTimeout(() => {
        setSunIntroDone(true)
      }, 4000)
    }
  }

  return (
    <GlobalStyles>
      <BtnContainer 
        className={`${isDarkMode ? 'dark-mode' : ''} ${sunAnimated ? 'sun-animated' : ''} ${moonAnimated ? 'moon-animated' : ''} ${sunIntroDone ? 'sun-intro-done' : ''} ${moonIntroDone ? 'moon-intro-done' : ''}`}
        isDarkMode={isDarkMode} 
        sunAnimated={sunAnimated} 
        moonAnimated={moonAnimated} 
        sunIntroDone={sunIntroDone} 
        moonIntroDone={moonIntroDone}
      >
        {/* 太阳图标 */}
        <svg
          viewBox="0 0 16 16"
          className="bi bi-sun-fill sun-icon"
          fill="currentColor"
          width="23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
          />
        </svg>
        
        {/* 开关按钮 */}
        <SwitchContainer className="switch btn-color-mode-switch">
          <input
            checked={isDarkMode}
            type="checkbox"
            onChange={handleThemeChange}
          />
          <SwitchInner
            className="btn-color-mode-switch-inner"
            isDarkMode={isDarkMode}
            data-off="九章青"
            data-on="光芒黄"
          />
        </SwitchContainer>
        
        {/* 月亮图标 */}
        <svg
          viewBox="0 0 16 16"
          className="bi bi-moon-stars-fill moon-icon"
          fill="currentColor"
          width="23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="moon-body"
            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"
          />
          <path
            className="moon-stars"
            d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"
          />
        </svg>
      </BtnContainer>
    </GlobalStyles>
  )
}

export default ThemeSwitch