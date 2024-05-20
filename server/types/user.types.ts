
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    type: 'seller' | "buyer";
}