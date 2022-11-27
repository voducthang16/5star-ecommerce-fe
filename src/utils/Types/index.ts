export type LoginType = {
    username: string;
    password: string;
};

export type RegisterType = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
};

export type AddToCart = {
    id_product: number;
    quantity: number;
};
