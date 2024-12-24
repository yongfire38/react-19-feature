'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { updateCounter } from './actions'
import styles from './page.module.css'

// 카운터 표시 컴포넌트
const CountDisplay = ({ count }: { count: number }) => {
    return <div className={styles.counter}>Count: {count}</div>
}

// 버튼 컴포넌트
const CounterButton = ({ value }: { value: 'increment' | 'decrement' }) => {
    //const { pending } = useFormStatus()

    const status = useFormStatus();
    const pending = status.pending;
    const data = status.data;
    const method = status.method;
    const action = status.action;

    console.log('pending::', pending);
    console.log('data::', data);
    console.log('method::', method);
    console.log('action::', action);

    if(data !== null) {
        for (const [key, value] of data.entries()) {
            console.log('::[key, value]', key, value);
        };
    }

    return (
        <button
            type="submit"
            name="command"
            value={value}
            disabled={pending}
            className={styles.button}
        >
            {pending ? `${value}ing...` : value}
        </button>
    )
}

// 메인 카운터 컴포넌트
export default function Example5() {
    const [count, dispatch] = useActionState(updateCounter, 0, 'counter-state')

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>useFormStatus with FormData Example</h1>
            <p>useFormStatus를 사용하여 얻은 FormData를 확인하는 예시</p>
            <p>const status = useFormStatus(); 로 값을 받아서 콘솔에 출력하였다</p>
            <p>data의 경우는 formData 인터페이스를 구현한 객체이므로 data.entries() 로 순회하여 확인하면 된다</p>

            <br/>

            <form
                action={async (formData) => {
                    await dispatch(formData)
                }}
            >
                <CountDisplay count={count} />
                <div className={styles.buttonContainer}>
                    <CounterButton value="increment" />
                    <CounterButton value="decrement" />
                </div>
            </form>
        </div>
    )
}