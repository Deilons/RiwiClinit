import { Head, Link } from '@inertiajs/react';
import { Stethoscope, Calendar, Clipboard, Users, ChevronRight } from 'lucide-react';

export default function Welcome({ auth, hospitalName = "City General Hospital" }) {
    return (
        <>
            <Head title="Welcome to Patient Portal" />
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-800">
                <header className="bg-white shadow-sm">
                    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Stethoscope className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-semibold text-blue-800">{hospitalName}</span>
                        </div>
                        <div className="space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Welcome to Your Patient Portal</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <FeatureCard
                            icon={<Calendar className="h-8 w-8 text-blue-600" />}
                            title="Schedule Appointments"
                            description="Easily book and manage your medical appointments online."
                        />
                        <FeatureCard
                            icon={<Clipboard className="h-8 w-8 text-blue-600" />}
                            title="View Medical Records"
                            description="Access your medical history, test results, and prescriptions securely."
                        />
                        <FeatureCard
                            icon={<Users className="h-8 w-8 text-blue-600" />}
                            title="Communicate with Doctors"
                            description="Message your healthcare providers and get quick responses."
                        />
                        <FeatureCard
                            icon={<Stethoscope className="h-8 w-8 text-blue-600" />}
                            title="Health Resources"
                            description="Access educational materials and health tips tailored for you."
                        />
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition duration-300"
                        >
                            Get Started
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </main>

                <footer className="bg-gray-100 py-8 mt-12">
                    <div className="container mx-auto px-6 text-center text-gray-600">
                        <p>&copy; 2024 {hospitalName}. All rights reserved.</p>
                        <p className="mt-2">Providing compassionate care for our community.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
                {icon}
                <h2 className="text-xl font-semibold ml-3">{title}</h2>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
