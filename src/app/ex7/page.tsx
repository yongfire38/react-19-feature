'use client'

import React, { useState, useTransition, use } from 'react'
import styles from './page.module.css'

// 비동기 데이터를 시뮬레이션하는 함수
function fetchData(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 0) {
                reject(new Error('ID는 0보다 작을 수 없습니다.'))
            } else {
                resolve(`데이터 ${id}번의 내용입니다.`)
            }
        }, 1000)
    })
}

// 데이터를 표시하는 컴포넌트
const DataDisplay = ({ promise }: { promise: Promise<string> }) => {
    // use 훅으로 Promise를 직접 처리
    const data = use(promise)
    return <div className={styles.dataDisplay}>{data}</div>
}

export default function Example7() {
    const [id, setId] = useState(1)
    const [isPending, startTransition] = useTransition()
    const [currentPromise, setCurrentPromise] = useState<Promise<string> | null>(null)

    // 에러 바운더리 대신 try-catch를 사용한 예시
    const [error, setError] = useState<string | null>(null)

    const handleFetch = () => {
        setError(null)
        // useTransition을 사용하여 로딩 상태 관리
        startTransition(() => {
            setCurrentPromise(fetchData(id))
        })
    }

    const handleIncrement = () => {
        setId(prev => prev + 1)
        setCurrentPromise(null)
        setError(null)
    }

    const handleDecrement = () => {
        setId(prev => prev - 1)
        setCurrentPromise(null)
        setError(null)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>use Hook with useTransition Example</h1>
            <p>React 19에서 추가된 use Hook을 사용한 예제이다</p>
            <p>use를 컴포넌트 내에서 사용하여 Promise의 value를 직접적으로 가져올 수 있다</p>
            <p>다른 Hook 과 달리, use는 반복문, 조건문, 중첩된 함수 내에서도 사용 가능하므로 더 유연한 방식으로 리소스에 접근 가능하다</p>
            
            <br/>

            <div className={styles.content}>
                <p>현재 ID: {id}</p>
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={handleIncrement}
                        className={styles.button}
                        disabled={isPending}
                    >
                        ID 증가
                    </button>
                    <button 
                        onClick={handleDecrement}
                        className={styles.button}
                        disabled={isPending}
                    >
                        ID 감소
                    </button>
                    <button 
                        onClick={handleFetch}
                        className={styles.button}
                        disabled={isPending}
                    >
                        {isPending ? '데이터 가져오는 중...' : '데이터 가져오기'}
                    </button>
                </div>
            </div>

            {error && (
                <div className={styles.error}>
                    에러: {error}
                </div>
            )}

            {isPending && (
                <div className={styles.loading}>로딩 중...</div>
            )}

            {currentPromise && !isPending && (
                <DataDisplay promise={currentPromise} />
            )}
        </div>
    )
}
