'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useOptimistic } from 'react'
import { incrementCounter } from './actions'
import styles from './page.module.css'

// 카운터 표시 컴포넌트
const CountDisplay = ({ 
    count, 
    optimisticCount 
}: { 
    count: number;
    optimisticCount: number;
}) => {
    const isOptimistic = optimisticCount !== count;

    return (
        <div>
            <div className={styles.counter}>
                Actual Count: {count}
            </div>
            {isOptimistic && (
                <div className={`${styles.counter} ${styles.optimisticCounter}`}>
                    Optimistic Count: {optimisticCount}
                    <span className="ml-2">(updating...)</span>
                </div>
            )}
        </div>
    );
}

// 증가 버튼 컴포넌트
const IncrementButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={styles.button}
        >
            {pending ? 'Incrementing...' : 'Increment'}
        </button>
    )
}

// 메인 카운터 컴포넌트
export default function Example6() {
    const [count, dispatch] = useActionState(incrementCounter, 0, 'counter-state')
    const [optimisticCount, addOptimistic] = useOptimistic(
        count,
        (state: number) => state + 1
    )

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>useOptimistic Example</h1>
            <p>useOptimistic은  UI를 낙관적으로 업데이트할 수 있는 Hook이다</p>
            <p>비동기 작업으로 인하여 실제 완료되는 데 시간이 걸리더라도 사용자에게 수행 결과를 즉시 제공 가능하다</p>

            <br/>
            
            <p>인수는 다음과 같다</p>
            <p>1. state: 작업이 대기 중이지 않을 때 초기에 반환될 값</p>
            <p>2. updateFn(currentState, optimisticValue): 현재(current) state와 addOptimistic에 전달된 값을 가져와 낙관적 상태를 반환하는 함수
                <br/>
                함수의 반환 값은 currentState와 optimisticValue의 병합된 값이 된다
            </p>

            <br/>

            <p>반환 값은 다음과 같다</p>
            <p>1. optimisticState: 결과적인 낙관적인 상태. 작업이 대기 중이지 않을 때는 state와 동일하며, 그렇지 않은 경우 updateFn에서 반환된 값과 동일</p>
            <p>2. addOptimistic: 낙관적인 업데이트가 있을 때 호출하는 dispatch 함수. optimisticValue를 인수로 가지며, state와 optimisticValue로 updateFn을 호출
            optimisticValue를 전달하고 싶지 않을 땐 undefined를 전달하면 된다  <br/>
            </p>

            <br/>

            <p>Increment 버튼을 누르면 addOptimistic(undefined)로 낙관적 업데이트가 이루어져 우선 Optimistic Count가 보이고</p>
            <p>실제 비동기 함수를 사용한 업데이트가 완료되면 Optimistic Count를 없애고 실제 카운트로 보여주는 예시이다</p>

            <br/>
            
            <form
                action={async () => {
                    addOptimistic(undefined);  // 낙관적 업데이트 트리거
                    await dispatch();          // 실제 서버 액션 실행
                }}
            >
                <CountDisplay 
                    count={count} 
                    optimisticCount={optimisticCount} 
                />
                <IncrementButton />
            </form>
        </div>
    )
}
