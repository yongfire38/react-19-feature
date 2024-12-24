'use server'

// 실제 API 호출 대신 딜레이를 주는 함수
export async function incrementCounter(state: number) {
    // 1초 딜레이로 API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    return state + 1;
}
