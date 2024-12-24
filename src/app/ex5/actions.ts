'use server'

type Command = 'increment' | 'decrement'

export async function updateCounter(state: number, formData: FormData) {
    // 1초 딜레이로 API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const command = formData.get('command') as Command
    
    switch (command) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        default:
            return state
    }
}
