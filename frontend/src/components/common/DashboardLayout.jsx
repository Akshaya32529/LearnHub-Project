import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white">
            <div className="flex flex-col min-h-screen">
                <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main
                    className="flex-1 transition-all duration-300 lg:ml-[var(--sidebar-width)]"
                    style={{ paddingTop: 'var(--navbar-height)' }}
                >
                    <div className="p-4 lg:p-6 animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
