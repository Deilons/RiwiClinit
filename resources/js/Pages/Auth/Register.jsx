import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Stethoscope, User, Mail, Phone, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phoneNumber: '',
        birthDate: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post('#', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register for Patient Portal" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="flex justify-center mb-6">
                        <Stethoscope className="w-12 h-12 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                        Register for Patient Portal
                    </h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <div className="relative">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full pl-10"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <User className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <div className="relative">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full pl-10"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <Mail className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                            <div className="relative">
                                <TextInput
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={data.phoneNumber}
                                    className="mt-1 block w-full pl-10"
                                    onChange={(e) => setData('phoneNumber', e.target.value)}
                                    required
                                />
                                <Phone className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.phoneNumber} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="birthDate" value="Birth Date" />
                            <div className="relative">
                                <TextInput
                                    id="birthDate"
                                    type="date"
                                    name="birthDate"
                                    value={data.birthDate}
                                    className="mt-1 block w-full pl-10"
                                    onChange={(e) => setData('birthDate', e.target.value)}
                                    required
                                />
                                <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.birthDate} className="mt-2" />
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
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
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

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full pl-10 pr-10"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <Lock className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-blue-500" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="#"
                                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Already have an account? Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
