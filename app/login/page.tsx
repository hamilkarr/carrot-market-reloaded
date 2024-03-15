import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function LogIn() {
    async function handleForm(data: FormData) {
        'use server';
        console.log('I run in the server only!');
        console.log(data.get("email"), data.get("password"));
    }
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>
            <form action={handleForm} className="flex flex-col gap-3">
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    errors={[]}
                />
                <FormButton loading={false} text="Log in" />
            </form>
            <SocialLogin />
        </div>
    );
}
