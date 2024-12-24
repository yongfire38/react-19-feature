'use client'

import React, { use } from 'react'
import { Color, ColorContext } from './ColorContext'
import styles from './page.module.css'

// 색상 선택 버튼 컴포넌트
const ColorButton = ({ color, active, onClick }: { color: Color; active: boolean; onClick: () => void }) => (
    <button
        className={styles.colorButton}
        style={{
            backgroundColor: color,
            opacity: active ? 1 : 0.6,
            color: color === 'blue' || color === 'purple' ? 'white' : 'black'
        }}
        onClick={onClick}
    >
        {color}
    </button>
)

// 조건부로 스타일이 적용되는 버튼 컴포넌트
function StyledButton({
    show,
    children,
}: {
    show: boolean
    children: React.ReactNode
}) {
    // 기본 스타일
    const baseStyle = {
        backgroundColor: '#e5e5e5',
        color: 'black'
    }

    // show가 true일 때만 컨텍스트의 색상을 사용
    if (show) {
        const color = use(ColorContext)
        return (
            <button 
                className={styles.styledButton}
                style={{ 
                    backgroundColor: color,
                    color: color === 'blue' || color === 'purple' ? 'white' : 'black'
                }}
            >
                {children}
            </button>
        )
    }

    // false일 때는 기본 스타일 적용
    return (
        <button 
            className={styles.styledButton}
            style={baseStyle}
        >
            {children}
        </button>
    )
}

// 버튼 그룹 컴포넌트
function ButtonGroup() {
    return (
        <div className={styles.buttonContainer}>
            <div className={styles.buttonRow}>
                <div className={styles.buttonWithLabel}>
                    <p className={styles.buttonLabel}>조건 True</p>
                    <StyledButton show={true}>스타일 적용됨</StyledButton>
                </div>
                <div className={styles.buttonWithLabel}>
                    <p className={styles.buttonLabel}>조건 False</p>
                    <StyledButton show={false}>스타일 미적용</StyledButton>
                </div>
            </div>
        </div>
    )
}

// 메인 컴포넌트
export default function Example9() {
    const [selectedColor, setSelectedColor] = React.useState<Color>('blue')
    const colors: Color[] = ['blue', 'red', 'green', 'purple']

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>use Hook with Context - 조건부 스타일링 예제</h1>
            
            <div className={styles.description}>
                <p>현재 선택된 색상: {selectedColor}</p>
                <p>조건이 true인 버튼만 선택된 색상으로 스타일이 적용됩니다.</p>
            </div>

            <p>React 19에서 추가된 use Hook을 사용한 예제이다</p>
            <p>use를 컴포넌트 내에서 사용하여 Context를 직접적으로 가져올 수 있다</p>
            <p>기존의 useContext와 유사하지만 use는 반복문, 조건문, 중첩된 함수 내에서도 사용 가능하므로 더 유연한 방식으로 리소스에 접근 가능하다</p>

            <br/>

            <div className={styles.buttonGroup}>
                {colors.map(color => (
                    <ColorButton
                        key={color}
                        color={color}
                        active={selectedColor === color}
                        onClick={() => setSelectedColor(color)}
                    />
                ))}
            </div>

            {/* 임시로 Provider 사용, React 19 정식 출시 후 Context 직접 사용으로 변경 예정 */}
            <ColorContext.Provider value={selectedColor}>
                <ButtonGroup />
            </ColorContext.Provider>
        </div>
    )
}
