'use client'

import { useActionState } from 'react'
import { submitForm } from './actions'
import styles from './page.module.css'

export default function Example3() {

    const [state, dispatch, isPending] = useActionState(submitForm, '', 'form-state')

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>useActionState Example</h1>

            <p>useActionState는 폼 액션의 결과를 기반으로 state를 업데이트할 수 있도록 제공하는 Hook</p>
            <p>form과의 병용은 필수는 아니지만, 권장된다</p>

            <br/>

            <p>사용법은 다음과 같다</p>
            <p>1. useActionState(action, initialState, stateName)</p>
            <p>2. action: 페칭 함수</p>
            <p>3. initialState: 페칭 함수가 리턴하는 state의 기본값</p>
            <p>4. stateName: state의 이름</p>

            <br/>

            <p>반환값은 다음과 같다</p>
            <p>state: 현재 상태 값 (서버 액션의 반환값)</p>
            <p>dispatch: 서버 액션을 실행하는 함수</p>
            <p>isPending: 서버 액션이 실행 중인지 나타내는 불리언 값</p>

            <br/>

            <p>name 란에 입력된 값을 form의 action 속성을 통해 서버에 전달</p>
            <p>서버 액션에서는 input 요소의 name 속성이 FormData의 키가 되며(19에서 추가되었으며 event.target.value 등의 코드가 필요 없다)</p>
            <p>서버 액션을 실행하여 state를 업데이트, 화면에 반영하는 예시이다</p>
            <p>useActionState로 인해 더 이상 pending 상태를 관리할 useState도 필요없고, onSubmit 함수도 필요없이 한 줄로 가능해졌다</p>
            
            <br/>

            <form
                action={async (formData) => {
                    try {
                        await dispatch(formData)
                        // React 19에서는 form 요소가 자동으로 리셋됨
                    } catch (error) {
                        console.error(error)
                    }
                }}
                className={styles.form}
            >
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.input}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={styles.button}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {state && (
                <div className={styles.message}>
                    {state}
                </div>
            )}
        </div>
    )
}
