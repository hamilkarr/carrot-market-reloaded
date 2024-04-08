'use server';
import { z } from 'zod';

function checkUserName(username: string) {
    return !username.includes('potato');
}
const checkPasswords = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => password === confirm_password;

const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: 'Username must be a string',
                required_error: 'Username is required',
            })
            .min(3, 'Way too short!!!')
            .max(10, "That's too loooooong!!")
            .refine(checkUserName, 'No potatoes allowed!'),
        email: z.string().email(),
        password: z.string().min(10),
        confirm_password: z.string().min(10),
    })
    .refine(checkPasswords, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    }
}
