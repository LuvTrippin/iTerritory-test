export interface MockUser {
    email: string;
    password: string;
    name: string;
}

export const MOCK_USERS:MockUser[] = [
    {email: 'user@test.ru', password: 'password', name: 'User'},
    {email: 'admin@test.ru', password: 'admin321', name: 'Admin'},
    {email: 'mock@test.ru', password: 'mock123', name: 'Mock'},
];
