import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Stethoscope, User, LogOut, Menu, X, ChevronDown, Home, Calendar, FileText, MessageSquare } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    return (
        <div className="min-h-screen bg-blue-50">
            <nav className="bg-white border-b border-blue-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    ClinitRiwi
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href="#" active={false}>
                                    <Home className="w-5 h-5 mr-1" />
                                    Dashboard
                                </NavLink>
                                <NavLink href="#" active={false}>
                                    <Calendar className="w-5 h-5 mr-1" />
                                    Appointments
                                </NavLink>
                                <NavLink href="#" active={false}>
                                    <FileText className="w-5 h-5 mr-1" />
                                    Medical Records
                                </NavLink>
                                <NavLink href="#" active={false}>
                                    <MessageSquare className="w-5 h-5 mr-1" />
                                    Messages
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <User className="w-5 h-5 mr-1" />
                                                {user.name}

                                                <ChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-blue-500 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:text-blue-500 transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="#" active={false}>
                            <Home className="w-5 h-5 mr-1" />
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="#" active={false}>
                            <Calendar className="w-5 h-5 mr-1" />
                            Appointments
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="#" active={false}>
                            <FileText className="w-5 h-5 mr-1" />
                            Medical Records
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="#" active={false}>
                            <MessageSquare className="w-5 h-5 mr-1" />
                            Messages
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-blue-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-blue-800">{user.name}</div>
                            <div className="font-medium text-sm text-blue-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href="#">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href="#" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            <footer className="bg-white border-t border-blue-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Stethoscope className="h-6 w-6 text-blue-600" />
                            <span className="text-blue-800 font-semibold">City General Hospital</span>
                        </div>
                        <p className="text-blue-600 text-sm">
                            &copy; 2024 City General Hospital. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
