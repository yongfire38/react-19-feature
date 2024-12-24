'use server'

export async function incrementCounter(state: number) {
    // 의도적으로 긴 지연 시간을 주어 최적화 효과를 확인
    await new Promise(resolve => setTimeout(resolve, 2000));
    return state + 1;
}
