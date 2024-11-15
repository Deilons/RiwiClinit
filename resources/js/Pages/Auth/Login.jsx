import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Stethoscope, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in to Patient Portal" />

            <div className="min-h-screen min-w-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
                <div className="w-full  sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="flex justify-center mb-6">
                        <Stethoscope className="w-12 h-12 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                        Log in to Your Patient Portal
                    </h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <div className="relative">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full pl-10"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <Mail className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full pl-10 pr-10"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <Lock className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-blue-500" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href="#"
                                    className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <Link
                                        href={route('register')}
                                        className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
