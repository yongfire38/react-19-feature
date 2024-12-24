'use server'

export async function submitForm(state: string, payload: FormData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const name = payload.get('name');
    if (!name || typeof name !== 'string') {
        throw new Error('Name is required');
    }
    
    if (name.length < 3) {
        throw new Error('Name must be at least 3 characters long');
    }
    
    return `Hello, ${name}!`;
}
