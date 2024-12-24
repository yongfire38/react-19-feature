'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { incrementCounter } from './actions'
import styles from './page.module.css'

// 카운터 표시 컴포넌트
const CountDisplay = ({ count }: { count: number }) => {
    return <div className={styles.counter}>Count: {count}</div>
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
export default function Example4() {
    const [count, dispatch] = useActionState(incrementCounter, 0, 'counter-state')

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>useFormStatus Example</h1>

            <p>useFormStatus는 마지막 폼 제출의 상태 정보를 제공하는 Hook</p>
            <p>다음과 같이 사용된다</p>
            <br/>
            <p>const &#123; pending, data, method, action &#125; = useFormStatus();</p>
            <br/>
            <p>해당 훅은 form의 자식요소로 사용되어야 하며, 상위 form에 대한 정보를 반환한다</p>
            <p>pending: 폼 제출 중인지 나타내는 불리언 값</p>
            <p>data: 폼 제출된 데이터. formData 인터페이스를 구현한 객체</p>
            <p>method: 폼 제출 메소드. get 또는 post 중 하나의 문자열</p>
            <p>action: 폼 제출 함수. 상위 form의 action prop에 전달한 함수</p>

            <br/>

            <form
                action={async () => {
                    await dispatch()
                }}
            >
                <CountDisplay count={count} />
                <IncrementButton />
            </form>
        </div>
    )
}